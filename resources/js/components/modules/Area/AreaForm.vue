<template>
  <v-container fluid class="pa-0 ma-0">
    <v-row>
      <v-textarea v-model="item.description" label="Description" class="mr-1" rows="1" auto-grow readonly
        filled></v-textarea>
      <v-textarea v-model="item.notes" label="Notes" class="mr-1" rows="1" auto-grow readonly filled></v-textarea>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { useItemStore } from '../../../scripts/stores/item'
const { typedFieldsDisplay } = useItemStore()
const item = typedFieldsDisplay('Area')
</script>
