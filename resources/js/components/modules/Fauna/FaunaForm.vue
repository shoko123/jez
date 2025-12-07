<template>
  <v-container v-if="item" class="pa-0 ma-0">
    <v-row class="ga-1">
      <v-text-field v-model="item.date_retrieved" label="Date Retrieved" readonly filled />
      <v-text-field v-model="item.weight" label="Weight (gm)" readonly filled />
    </v-row>

    <v-row class="ga-1">
      <v-text-field v-model="item.field_description" label="Field Description" readonly filled />
    </v-row>

    <template v-if="isArtifact">
      <v-row class="ga-1">
        <v-text-field v-model="item.taxa" label="Taxa" readonly filled />
        <v-text-field v-model="item.bone" label="Element/Material" readonly filled />
      </v-row>

      <v-row class="ga-1">
        <v-text-field v-model="item.d_and_r" label="Dobney & Rilley 1988" readonly filled />
        <v-text-field v-model="item.age" label="Age" readonly filled />
        <v-text-field v-model="item.breakage" label="Breakage" readonly filled />
        <!-- <v-text-field v-model="item.weathering" label="Weathering (Behrensmeyer 1978)" readonly filled /> -->
      </v-row>

      <v-row class="ga-1">
        <v-text-field v-model="item.butchery" label="Butchery" readonly filled />
        <v-text-field v-model="item.burning" label="Burning" readonly filled />
        <v-text-field v-model="item.other_bsm" label="Other Bone Surface Modifications" readonly filled />
      </v-row>

      <v-row class="ga-1">
        <v-text-field v-if="showMeasurements" v-for="(group) in onps" v-model="group.groupValuesAsString"
          :label="group.groupLabel" readonly filled />
      </v-row>

      <v-row class="ga-1">
        <v-text-field v-model="item.specialist_notes" label="Specialist Notes" readonly filled />
      </v-row>
    </template>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '../../../scripts/stores/item'
import { useTrioStore } from '../../../scripts/stores/trio/trio'
import { shiftedNumericLabel } from '@/scripts/utils/utils'
let { typedFieldsDisplay } = useItemStore()

const item = typedFieldsDisplay('Fauna')
const { itemOnps } = storeToRefs(useTrioStore())

const onps = computed(() => {
  let formatted: { groupLabel: string, groupValuesAsString: string }[] = []
  itemOnps.value.forEach(x => {
    if (x.onps.length > 0) {
      const text = x.onps.reduce((accumulator, currentValue) => { return accumulator + `${currentValue.optionLabel}: ${shiftedNumericLabel(currentValue.optionValue!, currentValue.shift)} ${currentValue.unitLabel}, ` }, '');
      formatted.push({ groupLabel: x.groupLabel, groupValuesAsString: text.slice(0, -2) })
    }
  })
  return formatted
})

const isArtifact = computed(() => {
  return item.value.id.slice(-2) !== '00'
})

const showMeasurements = computed(() => {
  return isArtifact.value && itemOnps.value.length > 0
})
</script>