<template>
  <v-container v-if="item" class="pa-0 ma-0">
    <v-row>
      <v-text-field v-model="item.date_retrieved" label="Date Retrieved" readonly filled class="mr-1" />
      <v-text-field v-model="item.field_description" label="Field Description" readonly filled class="mr-1" />
      <v-text-field v-model="item.field_notes" label="Field Notes" readonly filled class="mr-1" />
    </v-row>

    <v-row>
      <v-textarea v-model="item.description" label="Description" readonly filled class="mr-1" />
      <v-textarea v-model="item.notes" label="Notes" readonly filled class="mr-1" />
    </v-row>

    <v-row>
      <v-text-field v-model="item.material_id" label="Material" readonly filled class="mr-1" />
      <v-text-field v-model="item.primary_classification_id" label="Primary Classification" readonly filled />
    </v-row>

    <v-row v-if="!isTagger">
      <v-text-field v-for="(group) in onps" v-model="group.groupValuesAsString" :label="group.groupLabel" readonly
        filled class="mr-1" />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '../../../scripts/stores/item'
import { useTrioStore } from '../../../scripts/stores/trio/trio'
import { useRoutesMainStore } from '../../../scripts/stores/routes/routesMain'
import { shiftedNumericLabel } from '@/scripts/utils/utils'
let { typedFieldsDisplay } = useItemStore()
const { itemOnps } = storeToRefs(useTrioStore())
const item = typedFieldsDisplay('Stone')
const { current } = storeToRefs(useRoutesMainStore())

const isTagger = computed(() => {
  return current.value.name === 'tag'
})

const onps = computed(() => {
  let formatted: { groupLabel: string, groupValuesAsString: string }[] = []
  itemOnps.value.forEach(x => {
    if (x.onps.length > 0) {
      const text = x.onps.reduce((accumulator, currentValue) => { return accumulator + currentValue.optionLabel + ': ' + shiftedNumericLabel(currentValue.optionValue!, currentValue.shift) + ` ${currentValue.unitLabel}, ` }, '');
      formatted.push({ groupLabel: x.groupLabel, groupValuesAsString: text.slice(0, -2) })
    }
  })
  return formatted
})
</script>