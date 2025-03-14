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
import { TCName, TPage } from '../../types/collectionTypes'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import MediaOverlay from './MediaOverlay.vue'

const { getCollectionStore } = useCollectionsStore()

const prps = defineProps<{
  source: TCName
  itemIndex: number
}>()

const record = computed(() => {
  const c = getCollectionStore(prps.source)
  let indexInPage = prps.itemIndex % c.info.itemsPerPage
  return c.page[indexInPage] as TPage<TCName, 'Gallery'> &
    TPage<'media', 'Gallery'> &
    TPage<'related', 'Gallery'>
  //Note This can't be reduced to TPage<TCName', 'Gallery'>
})

const showShort = computed(() => {
  return ['main', 'related'].includes(prps.source) && record.value.media?.mediaSource === 'Filler'
})

const shortToShow = computed(() => {
  return record.value.short
})

const data = computed(() => {
  //TODO fix
  // console.log(`MediaSquare.record: ${JSON.stringify(record.value, null, 2)}`)
  switch (prps.source) {
    case 'main':
      return {
        showTag: true,
        tagText: record.value.tag,
        urls: record.value.media?.urls,//IMPORTANT required on transition between collection view Gallery -> Tabular
      }
    case 'media':
      return {
        showTag: false,
        tagText: '',
        urls: record.value.media.urls,
      }
    case 'related':
    default:
      return {
        showTag: true,
        tagText: `${record.value.module} ${record.value.tag}`,
        urls: record.value.media.urls,
      }
  }
})
</script>
