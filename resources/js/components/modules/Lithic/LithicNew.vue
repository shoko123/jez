<template>
  <template v-if="props.isCreate">
    <Registrar />
  </template>

  <v-row class="ga-1">
    <date-picker v-model:date="nf.date_retrieved" fieldName="date_retrieved" label="Date Retrieved"
      :errorMsg="props.errors.date_retrieved" />
    <v-text-field v-model="nf.field_description" label="Field Description"
      :error-messages="props.errors.field_description" filled />
    <v-text-field v-model="nf.registration_notes" label="Field Notes" :error-messages="props.errors.registration_notes"
      filled />
  </v-row>

  <v-row class="ga-1">
    <v-text-field v-model="nf.weight" label="Weight" :error-messages="props.errors.weight" filled />
    <v-text-field v-model="nf.specialist_notes" label="Specialist Notes" :error-messages="props.errors.specialist_notes"
      filled />
  </v-row>

  <slot name="buttons" />
</template>

<script lang="ts" setup>
import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import Registrar from '../../registrar/Registrar.vue'
import DatePicker from '../../form-elements/DatePicker.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Lithic'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Lithic')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
