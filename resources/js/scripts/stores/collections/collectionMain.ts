import { defineStore, storeToRefs } from 'pinia'
import { computed } from 'vue'
import type {
  TArray,
  TPage,
  TPageApi,
  TCollectionViewByCollectionName,
  TApiToSavedConverter,
  TArrayElementMatchesPageElement,
} from '@/types/collectionTypes'

import { useModuleStore } from '../module'
import { useCollectionsStore } from '../collections/collections'
import { useMediaStore } from '../media'
import { copyProperties } from '../../utils/utils'

export const useCollectionMainStore = defineStore('collectionMain', () => {
  const { buildMedia } = useMediaStore()
  const { module } = storeToRefs(useModuleStore())
  const { getCollectionInfo, getPage } = useCollectionsStore()

  const apiToSavedConverter: TApiToSavedConverter<'main'> = function (
    apiPage: TPageApi<'main'>[],
    view: TCollectionViewByCollectionName<'main'>,
  ) {
    switch (view) {
      case 'Gallery':
        return (apiPage as TPageApi<'main', 'Gallery'>[]).map((x) => {
          return copyProperties(x, ['urls'], {
            media: buildMedia(x.urls, module.value),
          })
        })

      case 'Tabular':
      case 'Chips':
      default:
        return apiPage
    }
  }

  const matches: TArrayElementMatchesPageElement<
    'main',
    TCollectionViewByCollectionName<'main'>
  > = function (e: TArray<'main'>, p: TPage<'main', TCollectionViewByCollectionName<'main'>>) {
    return e === p.id
  }

  const tabularHeaders = computed(() => {
    const info = getCollectionInfo('main')
    const page = getPage('main') as TPageApi<'main', 'Tabular'>[]
    if (info.viewName !== 'Tabular' || info.currentPageLength === 0) {
      return [['', 'start', '']]
    }

    const headers = Object.keys(page[0]!).map((x) => {
      return [x, typeof x === 'string' ? 'start' : 'end', x]
    })
    return headers.filter((x) => !['id'].includes(x[0]!))
  })

  return {
    apiToSavedConverter,
    matches,
    tabularHeaders,
  }
})
