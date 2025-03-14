<template>
  <v-data-table-virtual v-if="collectionIsNotEmpty" :headers="headers" :items="page" class="elevation-1" height="80vh"
    item-value="unique" fixed-header>
    <template #[`item.tag`]="{ item }">
      <v-btn @click="btnClicked(item)">
        <template v-if="isMain">
          {{ item.tag }}
        </template>
        <template v-else>
          {{ item.moduleAndTag }}
        </template>
      </v-btn>
    </template>
  </v-data-table-virtual>
</template>

<script lang="ts" setup>

import type { TCName, TPage } from '@/types/collectionTypes'

import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'
import { useCollectionRelatedStore } from '../../scripts/stores/collections/collectionRelated'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { useCollectionMainStore } from '@/scripts/stores/collections/collectionMain'

type THeader = { title: string, align: 'start' | 'end' | 'center', key: string }
const props = defineProps<{
  source: TCName
  pageNoB1: number
}>()

const { getCollectionStore } = useCollectionsStore()
const { relatedTableHeaders } = storeToRefs(useCollectionRelatedStore())
const { tabularHeaders } = storeToRefs(useCollectionMainStore())
const { routerPush, moveToRelatedItem } = useRoutesMainStore()

const isMain = computed(() => {
  return props.source === 'main'
})

const headers = computed(() => {
  if (isMain.value) {
    return tabularHeaders.value.map(x => {
      return { title: x[0], align: x[1], key: x[2] }
    }) as THeader[]
  } else {
    return relatedTableHeaders.value as THeader[]
  }
})

const c = computed(() => {
  return getCollectionStore(props.source)
})

const page = computed(() => {
  switch (props.source) {
    case 'main':
      return c.value.page as TPage<'main', 'Tabular'>[]
    case 'related':
      return c.value.page as unknown as TPage<'related', 'Tabular'>[]
    default:
      return []
  }
})

const collectionIsNotEmpty = computed(() => {
  return page.value === undefined ? 0 : page.value.length > 0
})

async function btnClicked(item: TPage<'main', 'Tabular'> | TPage<'related', 'Tabular'>) {
  console.log(`pageTable.btnClicked() item: ${JSON.stringify(item, null, 2)}`)
  if (props.source === 'main') {
    await routerPush('show', item.slug)
  } else {
    const related = item as TPage<'related', 'Tabular'>
    await moveToRelatedItem(related.module, related.id)
  }
}

</script>
