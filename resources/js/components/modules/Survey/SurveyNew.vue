<template>
  <v-row class="ga-1">
    <date-picker v-model:date="nf.surveyed_date" fieldName="surveyed_date" label="Survey Date"
      :errorMsg="props.errors.surveyed_date">
    </date-picker>
    <v-text-field v-model="nf.elevation" label="Elevtion" :error-messages="props.errors.elevation" filled>
    </v-text-field>
    <v-text-field v-model="nf.next_to" label="Next To" :error-messages="props.errors.next_to" filled>
    </v-text-field>
  </v-row>

  <v-row class="ga-1">
    <v-textarea v-model="nf.description" label="Description" :error-messages="props.errors.description" filled
      auto-grow />
    <v-textarea v-model="nf.notes" label="Notes" :error-messages="props.errors.notes" filled auto-grow />
  </v-row>

  <slot name="buttons" />
</template>

<script lang="ts" setup>

import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import DatePicker from '../../form-elements/DatePicker.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Survey'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Survey')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
