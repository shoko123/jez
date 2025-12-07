import { TMediaOfItem, TMediaUrls } from '@/types/mediaTypes'
import { TModule, TId } from '@/types/moduleTypes'

type TCollectionView = 'Gallery' | 'Chips' | 'Tabular'

// Array types
//////////////
type TArrayMain = TId

type TArrayMedia = number

type TArrayRelated = {
  relation_name: string
  module: TModule
  id: TId
  tag: string
}

// Page Types
//////////////

// utility type to convert media property type from the api's TMediaUrls to the frontend's TMediaOfItem
type SwapUrlWithMedia<T extends TPageApi<TCollectionName, 'Gallery'>> = Omit<T, 'urls'> & {
  media: TMediaOfItem
}

// Main - views(Gallery,Tabular, Chips)
///////////////////////////////////////
type TPageMainChipsApi = {
  id: TArrayMain
  tag: string
}

type TPageMainChipsSaved = TPageMainChipsApi

type TPageMainTabularApi = TPageMainChipsApi & {
  [key: string]: string | number
}

type TPageMainTabularSaved = TPageMainTabularApi

type TPageMainGalleryApi = {
  id: TId
  tag: string
  short: string
  urls: TMediaUrls
}

type TPageMainGallerySaved = SwapUrlWithMedia<TPageMainGalleryApi>

// Media - views(Gallery)
/////////////////////////
type TPageMediaGalleryApi = {
  id: TId
  order_column: number
  urls: TMediaUrls
}

type TPageMediaGallerySaved = SwapUrlWithMedia<TPageMediaGalleryApi>

// Related - views(Gallery,Tabular, Chips)
//////////////////////////////////////////
type TPageRelatedChipsApi = {
  relation_name: string
  module: TModule
  id: TId
  tag: string
}

type TPageRelatedChipsSaved = TPageRelatedChipsApi

type TPageRelatedTabularApi = TPageRelatedChipsApi & {
  moduleAndTag: string
  unique: string
  short: string
}
type TPageRelatedTabularSaved = TPageRelatedTabularApi

type TPageRelatedGalleryApi = TPageRelatedChipsApi & { urls: TMediaUrls; short: string }
type TPageRelatedGallerySaved = SwapUrlWithMedia<TPageRelatedGalleryApi>

// Generic Collections
type DDefs = {
  main: {
    array: TArrayMain
    views: 'Gallery' | 'Tabular' | 'Chips'
  }
  media: {
    array: TArrayMedia
    views: 'Gallery'
  }
  related: {
    array: TArrayRelated
    views: 'Gallery' | 'Tabular' | 'Chips'
  }
}

type TCollectionName = keyof DDefs
type TArray<N extends TCollectionName> = DDefs[N]['array']
type TCollectionViewByCollectionName<N extends TCollectionName> = DDefs[N]['views']

type TPageApi<
  N extends TCollectionName = TCollectionName,
  V extends TCollectionViewByCollectionName<N> = TCollectionViewByCollectionName<N>,
> = N extends 'main'
  ? // 'main'
    V extends 'Tabular'
    ? TPageMainTabularApi
    : V extends 'Gallery'
      ? TPageMainGalleryApi
      : TPageMainChipsApi
  : N extends 'media'
    ? // 'media'
      TPageMediaGalleryApi
    : // 'related'
      V extends 'Tabular'
      ? TPageRelatedTabularApi
      : V extends 'Gallery'
        ? TPageRelatedGalleryApi
        : TPageRelatedChipsApi

type TPageSaved<
  N extends TCollectionName,
  V extends TCollectionViewByCollectionName<N>,
> = N extends 'main'
  ? // 'main'
    V extends 'Tabular'
    ? TPageMainTabularSaved
    : V extends 'Gallery'
      ? TPageMainGallerySaved
      : TPageMainChipsSaved
  : N extends 'media'
    ? // 'media'
      TPageMediaGallerySaved
    : // 'related'
      V extends 'Tabular'
      ? TPageRelatedTabularSaved
      : V extends 'Gallery'
        ? TPageRelatedGallerySaved
        : TPageRelatedChipsSaved

// functions that each specific collection store must implement
type TApiToSavedConverter<N extends TCollectionName> = (
  apiPage: TPageApi<N>[],
  view: TCollectionViewByCollectionName<N>,
) => TPageSaved<N, TCollectionViewByCollectionName<N>>[]

type TArrayElementMatchesPageElement<
  N extends TCollectionName,
  V extends TCollectionViewByCollectionName<N>,
> = (a: TArray<N>, b: TPage<N, V>) => boolean

type TViewAndPageLength = [TCollectionView, number]

type TCData<N extends TCollectionName> = {
  array: TArray<N>[]
  page: TPageSaved<N, TCollectionViewByCollectionName<N>>[]
  viewsAndPageLengths: TViewAndPageLength[]
  pageNoB1: number
  viewIndex: number
}

type TCollectionsData = {
  [N in TCollectionName]: TCData<N>
}

type TAllViewsAndPageLengths = {
  [N in TCollectionName]: TViewAndPageLength[]
}

// Alias TPage to TPageSaved (for extrnal use)
type TPage<
  S extends TCollectionName = TCollectionName,
  V extends TCollectionViewByCollectionName<S> = TCollectionViewByCollectionName<S>,
> = TPageSaved<S, V>

export {
  TCollectionsData,
  TCData,
  TCollectionName,
  TArray,
  TPage,
  TPageApi,
  TPageSaved,
  TCollectionView,
  TCollectionViewByCollectionName,
  TViewAndPageLength,
  TAllViewsAndPageLengths,
  //
  TApiToSavedConverter,
  TArrayElementMatchesPageElement,
}
