import { ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { TCollectionName, TArray } from '@/types/collectionTypes'
import { TApiCarousel, TApiCarouselUnion } from '@/types/mediaTypes'

import { useRoutesMainStore } from '../../../scripts/stores/routes/routesMain'
import { useCollectionsStore } from '../collections/collections'
import { useElementAndCollectionStore } from '../collections/elementAndCollection'
import { useXhrStore } from '../xhr'
import { useMediaStore } from '../media'

export const useCarouselStore = defineStore('carousel', () => {
  const { loadPageByItemIndex, inPage } = useCollectionsStore()
  const { current } = storeToRefs(useRoutesMainStore())
  const { send } = useXhrStore()
  const { buildMedia } = useMediaStore()
  const {
    resetElementIndex,
    setIndexByElement,
    setElementIndex,
    setNextIndex,
    getElement,
    arrayLength,
  } = useElementAndCollectionStore()
  const { indices } = storeToRefs(useElementAndCollectionStore())
  const isOpen = ref<boolean>(false)
  const saved = ref<TApiCarouselUnion | null>(null)

  const collectionName = computed(() => {
    return indices.value.Carousel.collectionName
  })

  const carouselComputed = computed(() => {
    if (!isOpen.value || saved.value === null) {
      return undefined
    }

    switch (collectionName.value) {
      case 'main': {
        const car = saved.value as TApiCarousel<'main'>
        const media = buildMedia(car.urls, current.value.module)
        return { ...car, media }
      }

      case 'media': {
        const car = saved.value as TApiCarousel<'media'>
        const media = buildMedia(car.urls, current.value.module)
        return {
          ...car,
          media,
          size: (car.size / 1000000).toFixed(2).toString() + 'MB',
          tag: '',
          text: '',
          title: '',
        }
      }
      case 'related':
      default: {
        const car = saved.value as TApiCarousel<'related'>
        const media = buildMedia(car.urls, car.module)
        return { ...car, media }
      }
    }
  })

  const index = computed(() => {
    return indices.value.Carousel.index
  })

  const carouselArrayLength = computed(() => {
    return arrayLength('Carousel')
  })

  async function open(source: TCollectionName, openIndex: number) {
    setElementIndex('Carousel', source, openIndex)
    const res = await loadCarousel(getElement('Carousel')!)
    if (res) {
      isOpen.value = true
    }
    return res
  }

  async function loadCarousel(arrayElement: TArray<TCollectionName>): Promise<boolean> {
    switch (indices.value.Carousel.collectionName) {
      case 'related':
        return await loadCarouselRelated(arrayElement as TArray<'related'>)

      case 'main':
        return await loadCarouselMain(arrayElement as TArray<'main'>)

      case 'media':
        return await loadCarouselMedia(arrayElement as TArray<'media'>)
    }
  }

  async function loadCarouselMain(item: TArray<'main'>) {
    const res = await send<TApiCarousel<'main'>>('carousel/main', 'post', {
      module: current.value.module,
      id: item,
    })

    if (!res.success) {
      return xhrError(res.message)
    }

    saved.value = res.data
    return true
  }

  async function loadCarouselMedia(item: TArray<'media'>) {
    // console.log(`loadCarouselMedia(${item}).`)
    const res = await send<TApiCarousel<'media'>>('carousel/media', 'post', {
      id: item,
    })

    if (!res.success) {
      return xhrError(res.message)
    }

    saved.value = res.data
    return true
  }

  async function loadCarouselRelated(item: TArray<'related'>) {
    // console.log(`loadCarouselRelated(${item}).`)
    const res = await send<TApiCarousel<'related'>>('carousel/related', 'post', {
      module: item.module,
      id: item.id,
    })

    if (!res.success) {
      return xhrError(res.message)
    }

    saved.value = { ...res.data, relation_name: item.relation_name }
    return true
  }

  function xhrError(message: string) {
    console.log(`carousel.load() failed. error: ${message}`)
    return false
  }

  async function nextItem(isRight: boolean) {
    setNextIndex('Carousel', isRight)
    return await loadCarousel(getElement('Carousel')!)
  }

  async function close(): Promise<boolean> {
    let element: TArray<TCollectionName>

    switch (collectionName.value) {
      case 'main': {
        const car = carouselComputed.value as unknown as TApiCarousel<'main'>
        element = car.id
        break
      }

      case 'media': {
        const car = carouselComputed.value as unknown as TApiCarousel<'media'>
        element = car.id
        break
      }
      case 'related': {
        element = carouselComputed.value as unknown as TApiCarousel<'related'>
        break
      }
    }

    //If saved carousel item is in the currently loaded page, close.
    if (inPage(collectionName.value, element)) {
      console.log(`carousel.close() no need to load a new page`)
      isOpen.value = false
      resetElementIndex(['Carousel'])
      return true
    }

    console.log(`carousel.close() - load new page by element: ${JSON.stringify(element, null, 2)}`)
    setIndexByElement('Carousel', collectionName.value, element)

    const res = await loadPageByItemIndex(
      collectionName.value,
      'Gallery',
      indices.value.Carousel.index,
      current.value.module!,
    )

    isOpen.value = false
    resetElementIndex(['Carousel'])
    return res.success
  }

  return {
    isOpen,
    collectionName,
    saved,
    carouselComputed,
    carouselArrayLength,
    index,
    open,
    close,
    nextItem,
  }
})
