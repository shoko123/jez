<template>
  <v-container fluid>
    <v-row class="ga-1">
      <template v-if="isCreate">
        <id-selector>
          <template #id-selector-activator>
            <v-btn v-model="nf.id" label="tag" class="bg-grey text-black my-1" @click="openIdSelectorModal = true">{{
              idSelectorTag }}</v-btn>
          </template>

          <template #id-selector-form>
            <SmallFindIdSelector :defaults="defaultsForIdSelector" />
          </template>

        </id-selector>
      </template>

      <date-picker v-model="nf.date_retrieved" label="Date Retrieved" color="primary" clearable max-width="368">
      </date-picker>

      <v-text-field v-model="nf.square" label="Square" :error-messages="errors.square" class="mx-1" filled />
      <v-text-field v-model="nf.level_top" label="Level Top" :error-messages="errors.level_top" class="mx-1" filled />
      <v-text-field v-model="nf.level_bottom" label="Level Bottom" :error-messages="errors.level_bottom" class="mx-1"
        filled />
    </v-row>

    <v-row class="ga-1">
      <v-text-field v-model="nf.field_description" label="Field Description" :error-messages="errors.field_description"
        filled />
    </v-row>

    <v-row class="ga-1">
      <v-textarea v-model="nf.specialist_description" label="Specialist Description"
        :error-messages="errors.specialist_description" filled />
    </v-row>

    <v-row class="ga-1">
      <v-select v-model="nf.specialist" label="Specialist" item-title="text" item-value="extra"
        :items="specialistInfo.options" max-width="10%"></v-select>

      <v-select v-if="isCreate" v-model="nf.primary_classification_id" label="Primary Classification" item-title="text"
        item-value="extra" :items="primaryClassificationInfo.options" max-width="10%"></v-select>
    </v-row>

    <slot :id="nf.id" name="newItem" :v="v$" :new-fields="nf" />

  </v-container>
</template>

<script lang="ts" setup>
import { TFields, TFieldsErrors, TFieldInfo, TFieldsDefaultsAndRules } from '@/types/moduleTypes'
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { required, between, minLength, maxLength } from '@vuelidate/validators'
import { useModuleStore } from '../../../scripts/stores/module'
import { useItemStore } from '../../../scripts/stores/item'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import IdSelector from '../../form-elements/IdSelector.vue'
import SmallFindIdSelector from '../../form-elements/SmallFindIdSelector.vue'
import DatePicker from '../../form-elements/DatePicker.vue'

const { tagAndSlugFromId, prepareNewFields } = useModuleStore()
const { fields, } = storeToRefs(useItemStore())
const { isCreate, dataNew, openIdSelectorModal, fieldsWithOptions } = storeToRefs(useItemNewStore())

const defaultsAndRules: TFieldsDefaultsAndRules<'Metal'> = {
  id: { d: null, r: { required, maxLength: maxLength(20) } },
  locus_id: { d: '3S001', r: { required, minValue: minLength(5), maxValue: maxLength(5) } },
  code: { d: 'AR', r: { required, maxLength: maxLength(2) } },
  basket_no: { d: 9, r: { between: between(0, 99) } },
  artifact_no: { d: 99, r: { required, between: between(0, 99) } },
  date_retrieved: { d: null, r: {} },
  field_description: { d: null, r: { maxLength: maxLength(400) } },
  square: { d: null, r: { maxLength: maxLength(20) } },
  level_top: { d: null, r: { maxLength: maxLength(20) } },
  level_bottom: { d: null, r: { maxLength: maxLength(20) } },
  //
  specialist_description: { d: null, r: { maxLength: maxLength(400) } },
  measurements: { d: null, r: { maxLength: maxLength(200) } },
  material_id: { d: 1, r: { between: between(1, 255) } },
  primary_classification_id: { d: 1, r: { between: between(1, 255) } },
  specialist: { d: 'Unassigned', r: {} },
}

const defaultsObj = computed(() => {
  return Object.fromEntries(Object.entries(defaultsAndRules).map(([k, v]) => [k, v.d]))
})

const rulesObj = computed(() => {
  return Object.fromEntries(Object.entries(defaultsAndRules).map(([k, v]) => [k, v.r]))
})

// setup
if (isCreate.value) {
  dataNew.value.fields = { ...defaultsObj.value }
  openIdSelectorModal.value = true
} else {
  dataNew.value.fields = prepareNewFields(fields.value)
}
console.log(
  `Metal(${isCreate.value ? 'Create' : 'Update'}) dataNew: ${JSON.stringify(dataNew.value, null, 2)}`,
)
// setup - end

// ID selector related
const defaultsForIdSelector = computed(() => {
  const ds = nf.value.id ? nf.value : fields.value as TFields<'Metal'>
  return {
    season: ds.id.substring(0, 1),
    area: ds.id.substring(1, 2),
    locusNo: Number(ds.id.substring(2, 5)),
    code: ds.code,
    basketNo: ds.basket_no,
    artifactNo: nf.value.id ? ds.artifact_no : null
  }
})

const idSelectorTag = computed(() => {
  if (nf.value.id === null) {
    return `[ID Not Selected]`
  }
  const tg = tagAndSlugFromId(nf.value.id)
  return tg.tag
})
// ID selector related - end

// Lookup/Enum fields
const MetalFieldsWithOptions = computed(() => {
  return fieldsWithOptions.value as Partial<Record<keyof TFields<'Metal'>, TFieldInfo>>
})

const primaryClassificationInfo = computed(() => {
  return MetalFieldsWithOptions.value['primary_classification_id']!
})

const specialistInfo = computed(() => {
  return MetalFieldsWithOptions.value['specialist']!
})

// Standard fields validations and errors
const nf = computed(() => {
  return dataNew.value.fields as TFields<'Metal'>
})

const v$ = useVuelidate(rulesObj.value, dataNew.value.fields, { $autoDirty: true })

const errors = computed(() => {
  let errorObj: Partial<TFieldsErrors<'Metal'>> = {}
  for (const key in dataNew.value.fields) {
    const message = v$.value[key].$errors.length > 0 ? v$.value[key].$errors[0].$message : undefined
    errorObj[key as keyof TFieldsErrors<'Metal'>] = message
  }
  return errorObj
})

// Module specific manipulations before upload
function beforeStore() {
  return dataNew.value.fields
}

defineExpose({
  beforeStore
})
</script>
