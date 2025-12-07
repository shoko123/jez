<template>
  <v-row class="ga-1">
    <v-select v-model="season" label="Season" :items="seasonsAndAreas[0]" @update:model-value="seasonChanged()">
    </v-select>

    <v-select v-model="area" label="Area" :items="seasonsAndAreas[1]" @update:model-value="areaChanged()" class="ml-2">
    </v-select>

    <v-select v-model="locusNo" label="Locus Nos" :items="existingLocusNos" @update:model-value="locusNoChanged()"
      class="ml-2">
    </v-select>
  </v-row>


  <v-row v-if="locusNo" class="ga-1">
    <v-select v-model="code" label="Code" :items="codes" @update:model-value="codeChanged()">
    </v-select>

    <v-select v-model="basketNo" label="Basket No." :items="basketNos" @update:model-value="basketNoChanged()">
    </v-select>

    <v-select v-model="artifactNo" label="Artifact No." :items="availableArtifactNos"
      @update:model-value="artifactNoChanged()">
    </v-select>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { TArray } from '../../types/collectionTypes'
import { useItemNewStore } from '../../scripts/stores/itemNew'
import { useXhrStore } from '../../scripts/stores/xhr'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { useTrioStore } from '../../scripts/stores/trio/trio'

const { pushHome } = useRoutesMainStore()
const { typedFieldsNew } = useItemNewStore()
const { openIdSelectorModal } = storeToRefs(useItemNewStore())
const { send } = useXhrStore()
const { getGroupFromKey, getOptionFromKey, getGroupFromLabel } = useTrioStore()

const specificLabel = defineModel<string | null>('specificLabel')
const findNew = ref(typedFieldsNew('Stone'))

// setup - start
const area = ref<string | null>(null)
const season = ref<string | null>(null)
const locusNo = ref<number | null>(null)
const code = ref<string | null>(null)
const basketNo = ref<number | null>(null)
const artifactNo = ref<number | null>(null)

const seasonsAndAreas = ref<[string[], string[]]>([[], []])
const existingLocusNos = ref<number[]>([])
const findsForLocus = ref<string[]>([])

await getSeasonsAndAreas()
// setup - end

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

const codes = computed(() => {
  if (locusNo.value === null) {
    return []
  }
  const group = getGroupFromLabel('Registration Code')
  return group?.optionKeys.map(k => {
    const option = getOptionFromKey(k)
    return { title: option.text, value: option.text }
  })
})

const basketNos = computed(() => {
  if (locusNo.value === null || code.value === null) {
    return []
  }
  return code.value === 'AR' ? [0] : Array.from(Array(99).keys()).map((v, i) => i + 1);
})

const existingArtifacts = computed(() => {
  if (locusNo.value === null) {
    return []
  }

  return findsForLocus.value.map((v) => {
    return {
      code: v.substring(5, 7),
      basketNo: Number(v.substring(7, 9)),
      artifactNo: Number(v.substring(9, 11)),
    }
  }).filter(x => x.code == code.value && x.basketNo == basketNo.value).map(x => x.artifactNo)
})

const availableArtifactNos = computed(() => {
  console.log(`availableArtifactNos() itemsForLocus: ${JSON.stringify(findsForLocus.value, null, 2)}`)
  console.log(`code: ${code.value}, basketNo: ${basketNo.value}\nexisting: ${JSON.stringify(existingArtifacts.value, null, 2)}`)
  const all = Array.from(Array(100).keys()).map((v, i) => i)
  if (code.value === 'AR') {
    all.shift()
  }
  return all.filter((v) => { return !existingArtifacts.value.includes(v) })
})

function formatLabel() {
  specificLabel.value = artifactNo.value !== null ? `${season.value}/${area.value}/${locusNo.value}.${code.value}.${basketNo.value}.${artifactNo.value}` : null
}

async function seasonChanged() {
  console.log(`seasonChanged(${season.value})`)
  area.value = null
  locusNo.value = null
  code.value = null
  basketNo.value = null
  artifactNo.value = null
  existingLocusNos.value = []
  formatLabel()
}

async function areaChanged() {
  console.log(`areaChanged(${area.value})`)
  locusNo.value = null
  code.value = null
  basketNo.value = null
  artifactNo.value = null
  existingLocusNos.value = []
  formatLabel()

  if (area.value !== null) {
    await getLocusNos()
  }
}

async function locusNoChanged() {
  console.log(`locusNoChanged(${area.value})`)
  artifactNo.value = null
  await getExistingItemsForLocus()
  formatLabel()
}

function codeChanged() {
  basketNo.value = basketNos.value[0]!
  artifactNo.value = null
  formatLabel()
}

function basketNoChanged() {
  console.log(`basketNo changed(${basketNo.value})`)
  artifactNo.value = null
  formatLabel()
}

function artifactNoChanged() {
  console.log(`artifactNo changed(${artifactNo.value})`)
  formatLabel()
}

async function getLocusNos() {
  console.log(`getLocusNos`)//; ${JSON.stringify(site_id.value, null, 2)}`)
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

async function getExistingItemsForLocus() {
  console.log(`getExistingItemsForLocus() season: ${season.value}, area; ${area.value}, locusNo: ${locusNo.value}`)

  const res = await send<string[]>('registration/locus_finds', 'post', {
    module: 'Stone',
    locus_id: `${season.value}${area.value}${String(locusNo.value).padStart(3, '0')}`
  })

  if (res.success) {
    findsForLocus.value = res.data
  } else {
    pushHome(`DB access problem!  Redirected to home page.`)
  }
}
function accept() {
  console.log(`FindsRegistrar.accept(): ${specificLabel.value}`)
  findNew.value.locus_id = `${season.value}${area.value}${String(locusNo.value).padStart(3, '0')}`
  findNew.value.id = `${findNew.value.locus_id}${code.value}${String(basketNo.value).padStart(2, '0')}${String(artifactNo.value).padStart(2, '0')}`
  openIdSelectorModal.value = false
}

defineExpose({
  accept
})
</script>
