<template>
  <template v-if="props.isCreate">
    <Registrar />
  </template>

  <v-row>
    <v-text-field v-model="nf.square" label="Square" :errorMsg="props.errors.square" filled class="mr-1" />
    <date-picker v-model:date="nf.date_opened" fieldName="date_opened" label="Date Opened"
      :errorMsg="props.errors.date_opened" class="mr-1">
    </date-picker>
    <date-picker v-model:date="nf.date_closed" fieldName="date_closed" label="Date Closed"
      :errorMsg="props.errors.date_closed" class="mr-1">
    </date-picker>
    <v-text-field v-model="nf.level_opened" label="Level Opened" :errorMsg="props.errors.level_opened" filled
      class="mr-1" />
    <v-text-field v-model="nf.level_closed" label="Level Closed" :errorMsg="props.errors.level_closed" filled
      class="mr-1" />
    <GroupOptionSelector groupName="Clean" presentation="selectList" :openModal=false v-model:val="nf.clean" />
  </v-row>

  <v-row>
    <v-text-field v-model="nf.locus_above" label="Locus Above" :errorMsg="props.errors.locus_above" filled />
    <v-text-field v-model="nf.locus_below" label="Locus Below" :errorMsg="props.errors.locus_below" filled />
    <v-text-field v-model="nf.locus_co_existing" label="Co-existing" :errorMsg="props.errors.locus_co_existing"
      filled />
  </v-row>

  <v-row>
    <v-textarea v-model="nf.deposit" label="Deposit" :errorMsg="props.errors.deposit" rows="2" auto-grow filled />
  </v-row>
  <v-row>
    <v-textarea v-model="nf.description" label="Description" :errorMsg="props.errors.description" rows="2" auto-grow
      filled />
  </v-row>
  <v-row>
    <v-textarea v-model="nf.registration_notes" label="Notes" :errorMsg="props.errors.registration_notes" rows="3"
      auto-grow filled />
  </v-row>
  <slot name="buttons" />
</template>

<script lang="ts" setup>

import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import Registrar from '../../registrar/Registrar.vue'
import GroupOptionSelector from '../../form-elements/GroupOptionSelector.vue'
import DatePicker from '../../form-elements/DatePicker.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Locus'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Locus')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
