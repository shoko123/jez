<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card v-bind="props" variant="outlined" class="ml-1 mb-1">
      <v-img :src="data.urls?.tn" :lazy-src="data.urls?.tn" aspect-ratio="1" class="bg-grey-lighten-2">
        <v-overlay v-if="isHovering">
          <template #activator>
            <MediaOverlay :source="source" :item-index="itemIndex" :record="record" />
          </template>
        </v-overlay>
        <v-row no-gutters>
          <v-btn v-if="data.showTag && !isHovering" class="text-subtitle-1 font-weight-medium text-black" color="grey">
            {{ data.tagText }}
          </v-btn>
        </v-row>

        <v-row v-if="showShort && !isHovering" no-gutters class="text-body-1 align-center text-white">
          {{ shortToShow }}
        </v-row>
      </v-img>
    </v-card>
  </v-hover>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { TCollectionName, TPage } from '../../types/collectionTypes'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import MediaOverlay from './MediaOverlay.vue'

const { getCollectionInfo, getPage } = useCollectionsStore()

const prps = defineProps<{
  source: TCollectionName
  itemIndex: number
}>()

const record = computed(() => {
  const info = getCollectionInfo(prps.source)
  const page = getPage(prps.source)
  let indexInPage = prps.itemIndex % info.itemsPerPage
  return page[indexInPage] as TPage<TCollectionName, 'Gallery'> &
    TPage<'media', 'Gallery'> &
    TPage<'related', 'Gallery'>
  //Note This can't be reduced to TPage<TCollectionName', 'Gallery'>
})

const showShort = computed(() => {
  return ['main', 'related'].includes(prps.source) && record.value.media?.mediaSource === 'Filler'
})

const shortToShow = computed(() => {
  return record.value.short
})

const data = computed(() => {
  // IMPORTANT *** the ? in urls: record.value.media?.urls is required on transition between collection views. ***
  // Two actions are performed:
  // 1. load new page
  // 2. set new viewIndex
  // Since there is a time gap between them (loadPage is async), we may have a situation where the records don't yet
  // have the media property loaded
  switch (prps.source) {
    case 'main':
      return {
        showTag: true,
        tagText: record.value.tag,
        urls: record.value.media?.urls,//IMPORTANT required on transition between collection views
      }
    case 'media':
      return {
        showTag: false,
        tagText: '',
        urls: record.value.media?.urls,
      }
    case 'related':
    default:
      return {
        showTag: true,
        tagText: `${record.value.module} ${record.value.tag}`,
        urls: record.value.media?.urls//IMPORTANT required on transition between collection views
      }
  }
})
</script>
