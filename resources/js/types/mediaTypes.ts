// mediaTypes.ts
import { TModule, TId } from '@/types/moduleTypes'
import { TPageApi, TPage, TCollectionName } from '@/types/collectionTypes'

type TMediaUrls = { full: string; tn: string }
type TMediaSource = 'DB' | 'Asset' | 'Filler' | 'External'

//When an item has no related media, we use a placeholder media urls.
type TMediaOfItem = {
  mediaSource: TMediaSource
  urls: TMediaUrls
}

type CarouselAll = {
  main: {
    api: {
      id: TId
      tag: string
      short: string
      urls: TMediaUrls | null
      module: TModule
    }
    item: {
      id: TId
      tag: string
      short: string
      media: TMediaOfItem
      module: TModule
    }
  }
  media: {
    api: {
      id: number
      urls: TMediaUrls
      size: number
      collection_name: string
      file_name: string
      order_column: number
      title: string
      text: string
    }
    item: {
      id: number
      media: TMediaOfItem
      size: string
      collection_name: string
      file_name: string
      order_column: number
      title?: string
      text?: string
    }
  }
  related: {
    api: TPageApi<'related', 'Gallery'>
    item: TPage<'related', 'Gallery'>
  }
}

type TApiCarouselUnion = CarouselAll[keyof CarouselAll]['api']
type TCarouselUnion = CarouselAll[keyof CarouselAll]['item']
type TApiCarousel<N extends TCollectionName> = CarouselAll[N]['api']
type TCarousel<N extends TCollectionName> = CarouselAll[N]['item']

export { TMediaUrls, TMediaOfItem, TApiCarousel, TApiCarouselUnion, TCarousel, TCarouselUnion }
