<template>
  <v-row class="ga-1">
    <v-textarea v-model="nf.description" label="Description" :error-messages="props.errors.description" auto-grow />
    <v-textarea v-model="nf.staff" label="Notes" :error-messages="props.errors.staff" auto-grow />
  </v-row>
  <slot name="buttons" />
</template>

<script lang="ts" setup>
import type { TFieldsErrors } from '@/types/moduleTypes'
import { useItemNewStore } from '../../../scripts/stores/itemNew'

const props = defineProps<{ isCreate: boolean, errors: TFieldsErrors<'Season'> }>()

const { typedFieldsNew } = useItemNewStore()
const nf = typedFieldsNew('Season')

// Module specific manipulations before upload.
function beforeStore() {
  // do nothing
}

defineExpose({
  beforeStore,
})

</script>
