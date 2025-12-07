<template>
  <template v-if="props.isCreate">
    <Registrar />
  </template>

  <v-row class="ga-1">
    <date-picker v-model:date="nf.date_retrieved" fieldName="date_retrieved" label="Date Retrieved"
      :errorMsg="props.errors.date_retrieved" />
  </v-row>

  <v-row class="ga-1">
    <date-picker v-model:date="nf.date_retrieved" fieldName="date_retrieved" label="Date Retrieved"
      :errorMsg="props.errors.date_retrieved" />
    <v-text-field v-model="nf.weight" label="Weight" :error-messages="errors.weight" max-width="10%" filled />
  </v-row>

  <v-row class="ga-1">
    <v-textarea v-model="nf.field_description" label="Field Description" :error-messages="errors.field_description"
      filled />
  </v-row>
  <v-row class="ga-1">
    <v-text-field v-model="nf.taxa" label="Taxa" :error-messages="errors.taxa" filled />
    <v-text-field v-model="nf.bone" label="Bone/Tooth" :error-messages="errors.bone" filled />
    <GroupOptionSelector v-if="isCreate && isArtifact" groupName="Material" presentation="selectList" :openModal=false
      v-model:val="nf.material_id" />
    <GroupOptionSelector v-if="isCreate && isArtifact" groupName="Primary Taxa" presentation="selectList"
      :openModal=false v-model:val="nf.primary_taxon_id" />
  </v-row>

  <template v-if="isArtifact">
    <v-row class="ga-1">
      <v-text-field v-model="nf.d_and_r" label="D&R" :error-messages="errors.d_and_r" filled />
      <v-text-field v-model="nf.age" label="Age" :error-messages="errors.age" filled />
      <v-text-field v-model="nf.breakage" label="Breakage" :error-messages="errors.taxa" filled />
    </v-row>

    <v-row class="ga-1">
      <v-text-field v-model="nf.butchery" label="Butchery" :error-messages="errors.bone" filled />
      <v-text-field v-model="nf.burning" label="Burning" :error-messages="errors.d_and_r" filled />
      <v-text-field v-model="nf.other_bsm" label="Other BSM" :error-messages="errors.age" filled />
    </v-row>
  </template>

  <v-row class="ga-1">
    <v-text-field v-model="nf.specialist_notes" label="Specialist Notes" :error-messages="errors.specialist_notes"
      filled />
  </v-row>

  <slot name="buttons" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import Registrar from '../../registrar/Registrar.vue'
import GroupOptionSelector from '../../form-elements/GroupOptionSelector.vue'
import DatePicker from '../../form-elements/DatePicker.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Fauna'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Fauna')

const isArtifact = computed(() => {
  return nf.value.id.substring(9) !== '00'
})

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
