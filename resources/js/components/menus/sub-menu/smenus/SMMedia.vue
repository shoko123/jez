<template>
  <v-btn :disabled="disableShowSelectorButton" variant="outlined" @click="showilesSelector">
    Select Files
  </v-btn>
  <v-btn variant="outlined" @click="back">
    {{ backText }}
  </v-btn>
  <v-btn v-if="orderChanged" variant="outlined" @click="reorderAndBack"> Save Order & back </v-btn>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoutesMainStore } from '../../../../scripts/stores/routes/routesMain'
import { useMediaStore } from '../../../../scripts/stores/media'
import { useItemStore } from '../../../../scripts/stores/item'
import { useNotificationsStore } from '../../../../scripts/stores/notifications'

const { routerPush } = useRoutesMainStore()
const { derived } = storeToRefs(useItemStore())
const { showUploader, orderChanged } = storeToRefs(useMediaStore())
const { clearLocalImages, mediaReorder } = useMediaStore()
const { showSpinner, showSnackbar } = useNotificationsStore()

const disableShowSelectorButton = computed(() => {
  return showUploader.value
})

const backText = computed(() => {
  return orderChanged.value ? 'Back without saving order' : 'back'
})

function showilesSelector() {
  showUploader.value = true
}

async function reorderAndBack() {
  console.log('Reorder')
  showSpinner('Reordering media...')
  let res = await mediaReorder()
  showSpinner(false)
  showSnackbar(res.success ? `Reorder completed successfully` : `Reorder failed. ${res.message}`)

  if (res.success) {
    await back()
  }
}
async function back() {
  clearLocalImages()
  await routerPush('show', derived.value.id)
}
</script>
