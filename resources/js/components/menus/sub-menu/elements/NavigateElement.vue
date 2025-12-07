<template>
  <v-btn :disabled="inTransition" icon="mdi-arrow-left" color="blue-lighten-4" large rounded="0" variant="flat"
    @click="next(false)" />
  <v-btn color="blue-lighten-2" large rounded="0" variant="flat" class="text-none">
    {{ tag }}
  </v-btn>
  <v-btn :disabled="inTransition" icon="mdi-arrow-right" color="blue-lighten-4" large rounded="0" variant="flat"
    @click="next(true)" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'

import type { TId } from '@/types/moduleTypes'

import { useRoutesMainStore } from '../../../../scripts/stores/routes/routesMain'
import { useCollectionsStore } from '../../../../scripts/stores/collections/collections'
import { useItemStore } from '../../../../scripts/stores/item'
import { useElementAndCollectionStore } from '../../../../scripts/stores/collections/elementAndCollection'

const { derived } = storeToRefs(useItemStore())
const { setNextIndex, getElement } = useElementAndCollectionStore()
const { indices } = storeToRefs(useElementAndCollectionStore())
const { routerPush } = useRoutesMainStore()
const { inTransition } = storeToRefs(useRoutesMainStore())
const { getCollectionInfo } = useCollectionsStore()


const tag = computed(() => {
  const info = getCollectionInfo('main')
  return derived.value.tag ? `${derived.value.tag} (${indices.value.Show.index + 1}/${info.arrayLength})` : `...`
})

async function next(isRight: boolean) {
  setNextIndex('Show', isRight)
  await routerPush('show', getElement('Show') as TId)
}
</script>
