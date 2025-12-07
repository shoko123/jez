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

import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import { useNotificationsStore } from '../../scripts/stores/notifications'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
const props = defineProps<{
  itemIndex: number
  record: TArray<'media'>
}>()

const { mediaDestroy, switchMediaElements } = useMediaStore()
const { orderChanged } = storeToRefs(useMediaStore())
const { getCollectionInfo } = useCollectionsStore()
const { showSpinner, showSnackbar } = useNotificationsStore()
const { pushHome } = useRoutesMainStore()

const mcInfo = computed(() => {
  return getCollectionInfo('media')
})
const disableLeft = computed(() => {
  return mcInfo.value.arrayLength === 1 || props.itemIndex === 0
})

const disableRight = computed(() => {
  return mcInfo.value.arrayLength === 1 || props.itemIndex === mcInfo.value.arrayLength - 1
})

async function switchMedia(withLeft: boolean) {
  orderChanged.value = true

  showSpinner('Reordering media...')
  const res = await switchMediaElements(props.itemIndex, withLeft ? props.itemIndex - 1 : props.itemIndex + 1)
  showSpinner(false)
  if (!res.success) {
    await pushHome(`${res.message}. Redirected to home page`)
  }
}

async function deleteMedia() {
  if (!confirm('Are you sure you want to delete this media item?')) {
    return
  }

  showSpinner('Deleting media...')
  const res = await mediaDestroy(props.itemIndex)
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
