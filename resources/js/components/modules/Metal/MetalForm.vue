<template>
  <v-container v-if="item" class="pa-0 ma-0">
    <v-row class="ga-1">
      <v-text-field v-model="item.date_retrieved" label="Date Retrieved" readonly filled />
      <v-text-field v-model="item.square" label="Square" readonly filled />
      <v-text-field v-model="item.level_top" label="Level Top" readonly filled />
      <v-text-field v-model="item.level_bottom" label="Level Bottom" readonly filled />
    </v-row>

    <v-row class="ga-1">
      <v-text-field v-model="item.field_description" label="Field Description" readonly filled />
    </v-row>

    <v-row class="ga-1">
      <v-text-field v-model="item.specialist" label="Specialist" readonly filled />
      <v-text-field v-model="item.primary_classification_id" label="Primary Classification" readonly filled />
      <v-text-field v-model="item.material_id" label="Material" readonly filled />
    </v-row>

    <v-row class="ga-1">
      <v-textarea v-model="item.specialist_description" label="Specialist Description" readonly filled />
      <v-textarea v-model="item.measurements" label="Measurements" readonly filled />
    </v-row>

  </v-container>
</template>

<script lang="ts" setup>
import { useItemStore } from '../../../scripts/stores/item'

let { typedFieldsDisplay } = useItemStore()

const item = typedFieldsDisplay('Metal')
</script>