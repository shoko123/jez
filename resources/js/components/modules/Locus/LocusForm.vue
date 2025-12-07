<template>
  <v-container v-if="item" fluid class="pa-0 ma-0">
    <v-row>
      <v-text-field v-model="item.square" label="Square" class="mr-1" readonly filled />
      <v-text-field v-model="item.date_opened" label="Date Opened" class="mr-1" readonly filled />
      <v-text-field v-model="item.date_closed" label="Date Closed" class="mr-1" readonly filled />
      <v-text-field v-model="item.level_opened" label="Level Above" class="mr-1" readonly filled />
      <v-text-field v-model="item.level_closed" label="Level Below" class="mr-1" readonly filled />
      <!-- <v-text-field v-model="item.clean" label="clean" class="mr-1" readonly filled /> -->
    </v-row>

    <v-row>
      <v-text-field v-model="item.locus_above" label="Locus Above" class="mr-1" readonly filled />
      <v-text-field v-model="item.locus_below" label="Locus Below" class="mr-1" readonly filled />
      <v-text-field v-model="item.locus_co_existing" label="Co-existing" class="mr-1" readonly filled />
    </v-row>

    <v-row>
      <v-textarea v-model="item.deposit" label="Deposit" rows="1" auto-grow readonly filled />
    </v-row>
    <v-row>
      <v-textarea v-model="item.description" label="Description" rows="1" auto-grow readonly filled />
    </v-row>
    <v-row>
      <v-textarea v-model="item.registration_notes" label="Notes" rows="1" auto-grow readonly filled />
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>

import { useItemStore } from '../../../scripts/stores/item'

let { typedFieldsDisplay } = useItemStore()

const item = typedFieldsDisplay('Locus')

</script>