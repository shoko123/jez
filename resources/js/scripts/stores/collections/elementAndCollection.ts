import type { TCollectionName, TArray } from '@/types/collectionTypes'

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useCollectionsStore } from './collections'

type TIndexName = 'Show' | 'Carousel'
type TIndexInfo = { index: number; collectionName: TCollectionName }
type TIndices = Record<TIndexName, TIndexInfo>

export const useElementAndCollectionStore = defineStore('elementAndCollection', () => {
  const { getCollectionArray, indexInArray, getCollectionInfo } = useCollectionsStore()

  // Keeps track of the show and carousel indices
  const indices = ref<TIndices>({
    Show: { index: -1, collectionName: 'main' },
    Carousel: { index: -1, collectionName: 'main' },
  })

  function setElementIndex(indexName: TIndexName, collectionName: TCollectionName, index: number) {
    indices.value[indexName].collectionName = collectionName
    indices.value[indexName].index = index
  }

  function setIndexByElement<N extends TCollectionName>(
    indexName: TIndexName,
    collectionName: N,
    element: TArray<N>,
  ) {
    indices.value[indexName] = { collectionName, index: indexInArray(collectionName, element) }
  }

  function setNextIndex(indexName: TIndexName, isRight: boolean) {
    const array = getCollectionArray(getCollectionName(indexName))
    const currentIndex = indices.value[indexName].index
    const nextIndex = isRight
      ? currentIndex === array.length - 1
        ? 0
        : currentIndex + 1
      : currentIndex === 0
        ? array.length - 1
        : currentIndex - 1

    indices.value[indexName].index = nextIndex
  }

  function resetElementIndex(indexName: TIndexName[]) {
    indexName.forEach((element) => {
      indices.value[element].index = -1
      indices.value[element].collectionName = 'main'
    })
  }

  // debug
  const showElement = computed(() => {
    return getElement('Show')
  })

  const carouselElement = computed(() => {
    return getElement('Carousel')
  })
  // debug end

  function getElement(indexName: TIndexName) {
    if (indices.value[indexName].index === -1) {
      return undefined
    }
    const array = getCollectionArray(getCollectionName(indexName))
    return array[indices.value[indexName].index]
  }

  function arrayLength(indexName: TIndexName) {
    return getCollectionInfo(getCollectionName(indexName)).arrayLength
  }

  function getCollectionName(indexName: TIndexName) {
    return indices.value[indexName].collectionName
  }

  function getIndex(indexName: TIndexName) {
    return indices.value[indexName].index
  }
  return {
    indices,
    setElementIndex,
    setIndexByElement,
    resetElementIndex,
    setNextIndex,
    getElement,
    arrayLength,
    getIndex,
    // debug
    showElement,
    carouselElement,
    // debug- end
  }
})
