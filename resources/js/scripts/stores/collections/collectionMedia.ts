import { defineStore } from 'pinia'

import {
  TArray,
  TPage,
  TPageApi,
  TCollectionViewByCollectionName,
  TApiToSavedConverter,
  TArrayElementMatchesPageElement,
} from '@/types/collectionTypes'

import { useMediaStore } from '../media'
import { copyProperties } from '../../utils/utils'

export const useCollectionMediaStore = defineStore('collectionMedia', () => {
  const { buildMedia } = useMediaStore()

  /* eslint-disable */
  const apiToSavedConverter: TApiToSavedConverter<'media'> = function (
    apiPage: TPageApi<'media'>[],
    view: TCollectionViewByCollectionName<'media'>,
  ) {
    /* eslint-enable */
    return (apiPage as TPageApi<'media', 'Gallery'>[]).map((x) => {
      return copyProperties(x, [], { media: buildMedia({ full: x.urls.full, tn: x.urls.tn }) })
    })
  }

  const matches: TArrayElementMatchesPageElement<
    'media',
    TCollectionViewByCollectionName<'media'>
  > = function (e: TArray<'media'>, p: TPage<'media', TCollectionViewByCollectionName<'media'>>) {
    return e === p.id
  }

  return {
    apiToSavedConverter,
    matches,
  }
})
