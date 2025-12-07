<template>
  <v-row no-gutters>
    <v-select v-model="season" label="Season" :items="seasonsAndAreas[0]" @update:model-value="seasonChanged()">
    </v-select>
    <v-select v-model="area" label="Area" :items="seasonsAndAreas[1]" @update:model-value="areaChanged()" class="ml-2">
    </v-select>
  </v-row>

  <v-row no-gutters>
    <v-col cols=4>
      <v-select v-model="locusNo" label="Locus Nos" :items="availableLocusNos" @update:model-value="locusNoChanged()">
      </v-select>
    </v-col>
  </v-row>
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
const locusNew = ref(typedFieldsNew('Locus'))

// setup - start
const area = ref<string | null>(null)
const season = ref<string | null>(null)
const locusNo = ref<number | null>(null)
const seasonsAndAreas = ref<[string[], string[]]>([[], []])
const existingLocusNos = ref<number[] | null>(null)

await getSeasonsAndAreas()
// setup - end

function formatLabel() {
  specificLabel.value = locusNo.value !== null ? `${season.value}/${area.value}/${locusNo.value}` : null
}

async function seasonChanged() {
  console.log(`seasonChanged(${area.value})`)
  area.value = null
  locusNo.value = null
  existingLocusNos.value = null
  formatLabel()
}

async function areaChanged() {
  console.log(`areaChanged(${area.value})`)
  locusNo.value = null
  existingLocusNos.value = null
  formatLabel()

  if (area.value !== null) {
    await getExistingLocusNos()
  }
}

async function locusNoChanged() {
  console.log(`locusNoChanged(${area.value})`)
  formatLabel()
}

async function getSeasonsAndAreas() {
  console.log(`getSeasonsAndAreas`)//; ${JSON.stringify(site_id.value, null, 2)}`)

  const res = await Promise.all([send<TArray<'main'>[]>('module/index', 'post', {
    module: 'Season',
    query: {},
  }), send<TArray<'main'>[]>('module/index', 'post', {
    module: 'Area',
    query: {},
  })])


  for (const [index, val] of res.entries()) {
    if (!val.success) {
      pushHome(`DB access problem!  Redirected to home page.`)
    } else {
      seasonsAndAreas.value[index] = val.data
    }
  }
}

async function getExistingLocusNos() {
  console.log(`getExistingLocusNos`)//; ${JSON.stringify(site_id.value, null, 2)}`)
  const res = await send<TArray<'main'>[]>('module/index', 'post', {
    module: 'Locus',
    query: {
      "discrete_field_values": [
        {
          "group_name": "Area",
          "vals": [area.value]
        },
        {
          "group_name": "Season",
          "vals": [season.value]
        }
      ],
    },
  })

  if (res.success) {
    existingLocusNos.value = res.data.map(x => { return Number(x.substring(2)) })
    console.log(`existingLocusNos(): ${existingLocusNos.value}`)
  } else {
    pushHome(`DB access problem!  Redirected to home page.`)
  }
}

const availableLocusNos = computed(() => {
  if (existingLocusNos.value === null) {
    return []
  }
  return Array.from(Array(1000).keys()).map((v, i) => i + 1).filter(x => { return !existingLocusNos.value!.includes(x) })
})

function accept() {
  console.log(`LocusRegistrar.accept() Locus: ${specificLabel.value}`)
  locusNew.value.id = `${season.value}${area.value!}${String(locusNo.value).padStart(3, '0')}`
  locusNew.value.season_id = season.value!
  locusNew.value.area_id = area.value!
  locusNew.value.locus_no = locusNo.value!
  openIdSelectorModal.value = false
}

defineExpose({
  accept
})
</script>
