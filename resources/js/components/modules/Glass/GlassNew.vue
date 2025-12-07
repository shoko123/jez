<template>
  <template v-if="props.isCreate">
    <Registrar />
  </template>

  <v-row class="ga-1">
    <date-picker v-model:date="nf.date_retrieved" fieldName="date_retrieved" label="Date Retrieved"
      :errorMsg="props.errors.date_retrieved" />
    <v-text-field v-model="nf.square" label="Square" :error-messages="errors.square" class="mx-1" filled />
    <v-text-field v-model="nf.level_top" label="Level Top" :error-messages="errors.level_top" class="mx-1" filled />
    <v-text-field v-model="nf.level_bottom" label="Level Bottom" :error-messages="errors.level_bottom" class="mx-1"
      filled />
  </v-row>

  <v-row class="ga-1">
    <v-text-field v-model="nf.field_description" label="Field Description"
      :error-messages="props.errors.field_description" filled />
  </v-row>
  <v-row class="ga-1">
    <v-textarea v-model="nf.specialist_description" label="Specialist Description"
      :error-messages="props.errors.specialist_description" filled />
  </v-row>
  <v-row class="ga-1">
    <template v-if="props.isCreate">
      <GroupOptionSelector groupName="Primary Classification" presentation="selectList" :openModal=false
        v-model:val="nf.primary_classification_id" />
    </template>
  </v-row>

  <slot name="buttons" />
</template>

<script lang="ts" setup>
import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import Registrar from '../../registrar/Registrar.vue'
import DatePicker from '../../form-elements/DatePicker.vue'
import GroupOptionSelector from '../../form-elements/GroupOptionSelector.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Glass'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Glass')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
