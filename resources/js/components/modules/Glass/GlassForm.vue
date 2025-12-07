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
      <v-textarea v-model="item.specialist_description" label="Specialist Description" readonly filled />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>


import { useItemStore } from '../../../scripts/stores/item'

const { typedFieldsDisplay } = useItemStore()

const item = typedFieldsDisplay('Glass')


</script>