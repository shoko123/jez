<template>
  <v-col cols=4>
    <v-row class="ma-1">
      <v-select v-model="area" label="Area" :items="availableAreas" @update:model-value="areaChanged()"> </v-select>
    </v-row>
  </v-col>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { TArray } from '../../../types/collectionTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import { useXhrStore } from '../../../scripts/stores/xhr'
import { useRoutesMainStore } from '../../../scripts/stores/routes/routesMain'

const { pushHome } = useRoutesMainStore()
const { typedFieldsNew } = useItemNewStore()
const { openIdSelectorModal } = storeToRefs(useItemNewStore())
const { send } = useXhrStore()

const specificLabel = defineModel<string | null>('specificLabel')
const areaNew = ref(typedFieldsNew('Area'))

// setup - start
const area = ref<string | null>(null)
const existingAreas = ref<string[]>([])

await getExistingAreas()
// setup - end

function formatLabel() {
  specificLabel.value = area.value !== null ? area.value : null
}

function areaChanged() {
  console.log(`areaChanged(${area.value})`)
  formatLabel()
}

async function getExistingAreas() {
  console.log(`getExistingAreas`)//; ${JSON.stringify(site_id.value, null, 2)}`)
  const res = await send<TArray<'main'>[]>('module/index', 'post', {
    module: 'Area',
    query: {},
  })

  if (res.success) {
    existingAreas.value = res.data
    console.log(`Existing area(): ${existingAreas.value}`)
  } else {
    pushHome(`DB access problem!  Redirected to home page.`)
  }
}

const availableAreas = computed(() => {
  const all = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  return all.filter(x => { return !existingAreas.value.includes(x) })
})

function accept() {
  console.log(`AreaRegistrar.accept() feature: ${specificLabel.value}`)
  areaNew.value.id = area.value!
  openIdSelectorModal.value = false
}

defineExpose({
  accept
})
</script>
