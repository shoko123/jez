<template>
  <v-container v-if="item" class="pa-0 ma-0">
    <v-row class="ga-1">
      <v-text-field v-model="item.date_retrieved" label="Date Retrieved" readonly filled />
      <v-text-field v-model="item.field_description" label="Field Description" readonly filled />
      <v-text-field v-model="item.registration_notes" label="Registration Notes" readonly filled />
      <v-text-field v-model="item.weight" label="Weight" readonly filled />
    </v-row>

    <v-row class="ga-1" wrap>
      <v-textarea v-model="onpsText" label="Type(s)" rows="1" auto-grow readonly filled />
      <v-textarea v-model="item.specialist_notes" label="Specialist Notes" rows="1" auto-grow readonly filled />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '../../../scripts/stores/item'
import { useTrioStore } from '../../../scripts/stores/trio/trio'

let { typedFieldsDisplay } = useItemStore()

const item = typedFieldsDisplay('Lithic')

const { itemOnps } = storeToRefs(useTrioStore())

const onpsText = computed(() => {
  return itemOnps.value[0] ? itemOnps.value[0]!.onps.map(x => {
    return `${x.optionLabel}: ${x.optionValue}`
  }).join('\n') : ''
})
</script>