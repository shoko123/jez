<template>
  <div justify="center">
    <v-btn icon="mdi-arrow-left" color="white" variant="text" :disabled="disableLeft" @click="switchMedia(true)" />
    <v-btn class="bg-grey-lighten-1" @click="deleteMedia()"> Delete </v-btn>
    <v-btn icon="mdi-arrow-right" color="white" variant="text" :disabled="disableRight" @click="switchMedia(false)" />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import type { TArray } from '../../types/collectionTypes'
import { useMediaStore } from '../../scripts/stores/media'
import { useCollectionMediaStore } from '../../scripts/stores/collections/collectionMedia'
import { useNotificationsStore } from '../../scripts/stores/notifications'

const props = defineProps<{
  itemIndex: number
  record: TArray<'media'>
}>()

const { mediaDestroy } = useMediaStore()
const { orderChanged } = storeToRefs(useMediaStore())
const { switchArrayItems } = useCollectionMediaStore()
const { array } = storeToRefs(useCollectionMediaStore())
const { showSpinner, showSnackbar } = useNotificationsStore()

const disableLeft = computed(() => {
  return array.value.length === 1 || props.itemIndex === 0
})

const disableRight = computed(() => {
  return array.value.length === 1 || props.itemIndex === array.value.length - 1
})

function switchMedia(withLeft: boolean) {
  console.log(`switchMedia with ${withLeft === true ? 'Left' : 'Right'}`)
  orderChanged.value = true

  switchArrayItems(props.itemIndex, withLeft ? props.itemIndex - 1 : props.itemIndex + 1)
}

async function deleteMedia() {
  if (!confirm('Are you sure you want to delete this media item?')) {
    return
  }

  showSpinner('Deleting media...')
  const res = await mediaDestroy(props.record.id)
  showSpinner(false)

  if (res.success) {
    showSnackbar('Media deleted successfully.')
  } else {
    showSnackbar(`Media deletion failed. Error: ${res.message}`)
  }
}

// function edit() {
//   //TODO edit media text
// }
</script>
