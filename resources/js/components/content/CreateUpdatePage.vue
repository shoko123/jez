<template>
  <v-container fluid>
    <v-card class="elevation-12">
      <v-card-title class="bg-grey text-black py-0 mb-4">
        {{ title }}
      </v-card-title>

      <v-card-text>
        <Suspense>
          <v-container fluid>
            <component :is="formNew" ref="childRef" :isCreate="isCreate" :errors="errors">
              <template #buttons>
                <v-row>
                  <v-btn variant="outlined" @click="submit()"> Submit </v-btn>
                  <v-btn variant="outlined" class="ml-1" @click="cancel"> Cancel </v-btn>
                </v-row>
              </template>
            </component>
          </v-container>
        </Suspense>

      </v-card-text>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { computed, type Component, defineAsyncComponent, ref, markRaw } from 'vue'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import type { TModule, TFieldsErrors } from '@/types/moduleTypes'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { useItemNewStore } from '../../scripts/stores/itemNew'
import { useModuleStore } from '../../scripts/stores/module'
import { useNotificationsStore } from '../../scripts/stores/notifications'
import { dateToISO8601String } from '../../scripts/utils/utils'

const { module, moduleToUrlModuleName } = storeToRefs(useModuleStore())
let { routerPush } = useRoutesMainStore()
let { showSpinner, showSnackbar } = useNotificationsStore()
let { prepareFieldsNew, upload, } = useItemNewStore()
let { isCreate, fieldsNew, fieldsNewRules, openIdSelectorModal, } = storeToRefs(useItemNewStore())

// OLD DYNAMIC FORM LOADING
// const SeasonNew = defineAsyncComponent(() => import('../modules/Season/SeasonNew.vue'))
// const AreaNew = defineAsyncComponent(() => import('../modules/Area/AreaNew.vue'))

// const formNewA = computed<Component>(() => {
//   switch (module.value) {
//     case 'Area':
//       return AreaNew
//     case 'Season':
//       return SeasonNew
//   }
// })

// NEW DYNAMIC FORM LOADING
const ModuleFormNewObj = ref<Partial<Record<TModule, Component>>>({})

// The Vue compiler needs to statically know where the components are located.
for (let key in moduleToUrlModuleName.value) {
  ModuleFormNewObj.value[key as TModule] = markRaw(defineAsyncComponent(() => import(`../modules/${module.value}/${module.value}New.vue`))
  )
}

const formNew = computed<Component>(() => {
  return ModuleFormNewObj.value[module.value]!
})

prepareFieldsNew()

if (isCreate.value) {
  openIdSelectorModal.value = true
}
console.log(`CreateUpdate() setup(${module.value}.${isCreate.value ? 'Create' : 'Update'})\nrules: ${JSON.stringify(fieldsNew.value, null, 2)} `)
console.log(`CreateUpdate() fieldsNew: ${JSON.stringify(fieldsNew.value, null, 2)}`)

// Create module specific defaults and rules on component load.
// The rules were not done on module.init() as vuelidate (and rules) work only in the context of a component.
// If no create/update were ever asked for there is no need to create this component.
// This is also the reason why this function is here and not in the itemNewStore.

// Validation - link fields to rules and expose errors
const v$ = useVuelidate(fieldsNewRules.value, fieldsNew.value, { $autoDirty: true })

const errors = computed(() => {
  let errorObj: Partial<TFieldsErrors> = {}
  for (const key in fieldsNew.value) {
    const message = v$.value[key].$errors.length > 0 ? v$.value[key].$errors[0].$message : undefined
    errorObj[key as keyof TFieldsErrors] = message
  }
  return errorObj
})

// Submit: Simple validations, child module-specific manipulations,
// and conversion of dates -> ISO 8601, and shifted numericals -> integers.
///////////////////////////////////////////////////////////////////////////
const childRef = ref()

async function submit() {
  console.log(`CreateUpdate.submit() data: ${JSON.stringify(fieldsNew.value, null, 2)}`)
  await v$.value.$validate()
  if (v$.value.$error || v$.value.$silentErrors.length > 0) {
    showSnackbar('Please correct the marked errors!', 'orange')
    console.log(`NEW validation errors: ${JSON.stringify(v$.value.$errors, null, 2)}`)
    console.log(`NEW validation silent errors: ${JSON.stringify(v$.value.$silentErrors, null, 2)}`)
    return
  }

  // Call child
  childRef.value.beforeStore();

  // Convert Dates to strings 
  const fieldsToSend = Object.fromEntries(Object.entries(fieldsNew.value).map(([key, value]) => {
    if (value instanceof Date) {
      return [key, dateToISO8601String(value)]
    } else {
      return [key, value]
    }
  }))

  // Upload
  const creatOrUpdat = isCreate.value ? 'Creat' : 'Updat'

  showSpinner(`${creatOrUpdat}ing ${module.value} Item...`)
  const res = await upload(isCreate.value, fieldsToSend)
  showSpinner(false)

  if (!res.success) {
    showSnackbar(`Failed to ${creatOrUpdat}e Item. ${res.message}`, 'red')
    return
  }

  showSnackbar(
    `${module.value} Item ${creatOrUpdat}ed Successfully!`,
  )
  await routerPush('show', res.id)
}

const cancel = async () => {
  console.log(`CreateUpdateForm.cancel()`)
  await routerPush('back1')
}

const title = computed(() => {
  return isCreate.value ? `Create` : `Update`
})

</script>
