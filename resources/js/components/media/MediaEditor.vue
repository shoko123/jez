<template>
  <MediaUploader v-if="showUploader" />
  <v-container fluid class="pa-1">
    <CollectionForm v-bind="{ source: 'media' }" />
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import CollectionForm from '../collections/CollectionForm.vue'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import { useMediaStore } from '../../scripts/stores/media'
import MediaUploader from './MediaUploader.vue'

let { showUploader } = storeToRefs(useMediaStore())

const { getCollectionInfo } = useCollectionsStore()

if (getCollectionInfo('media').arrayLength === 0) {
  showUploader.value = true
}



</script>
