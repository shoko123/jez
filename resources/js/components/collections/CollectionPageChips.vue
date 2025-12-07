<template>
  <v-row wrap>
    <v-chip v-for="(item, index) in page" :key="index" :disabled="rms.inTransition"
      class="font-weight-normal ma-2 body-1" @click="goTo(item)">
      {{ item.tag }}
    </v-chip>
  </v-row>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import type { TCollectionName, TPage } from '../../types/collectionTypes'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'

const props = defineProps<{
  source: TCollectionName
  pageNoB1: number
}>()

const { getPage } = useCollectionsStore()
const rms = useRoutesMainStore()

const page = computed(() => {
  return getPage(props.source) as TPage<'main' | 'related', 'Chips'>[]
})

async function goTo(item: TPage<'main' | 'related', 'Chips'>) {
  if (props.source === 'main') {
    await rms.routerPush('show', item.id)
  } else {
    const related = <TPage<'related', 'Chips'>>item
    await rms.moveToRelatedItem(related.module, related.id)
  }
}
</script>
