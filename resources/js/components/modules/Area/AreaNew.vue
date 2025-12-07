<template>
  <template v-if="props.isCreate">
    <Registrar />
  </template>
  <v-row class="ga-1">
    <v-textarea v-model="nf.description" label="Description" :error-messages="props.errors.description" filled />
    <v-textarea v-model="nf.notes" label="Notes" :error-messages="props.errors.notes" filled />
  </v-row>
  <slot name="buttons" />
</template>

<script lang="ts" setup>
import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'
import Registrar from '../../registrar/Registrar.vue'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Area'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Area')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
