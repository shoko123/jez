import { defineStore } from 'pinia'
import { computed } from 'vue'

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

export const useCollectionRelatedStore = defineStore('collectionRelated', () => {
  const { buildMedia } = useMediaStore()

  const apiToSavedConverter: TApiToSavedConverter<'related'> = function (
    apiPage: TPageApi<'related'>[],
    view: TCollectionViewByCollectionName<'related'>,
  ) {
    switch (view as TCollectionViewByCollectionName<'related'>) {
      case 'Tabular':
        return (apiPage as TPageApi<'related', 'Tabular'>[]).map((x) => {
          return copyProperties(x, [], {
            moduleAndTag: `${x.module} ${x.tag}`,
            unique: `${x.relation_name}:${x.module}:${x.id}`,
          })
        })

      case 'Gallery':
        return (apiPage as TPageApi<'related', 'Gallery'>[]).map((x) => {
          return copyProperties(x, ['urls'], { media: buildMedia(x.urls, x.module) })
        })

      case 'Chips': {
        return (apiPage as TPageApi<'related', 'Chips'>[]).map((x) => {
          return copyProperties(x, [], { relation_name: x.relation_name })
        })
      }
    }
  }

  const matches: TArrayElementMatchesPageElement<
    'related',
    TCollectionViewByCollectionName<'related'>
  > = function (
    e: TArray<'related'>,
    p: TPage<'related', TCollectionViewByCollectionName<'related'>>,
  ) {
    return e.module === p.module && e.id === p.id
  }

  //relatedTableHeaders for the related.Tabular view
  const relatedTableHeaders = computed(() => {
    return [
      { title: 'Relation', align: 'start', key: 'relation_name' },
      { title: 'Tag', align: 'start', key: 'tag' },
      { title: 'Short Description', align: 'start', key: 'short' },
    ]
  })

  return {
    apiToSavedConverter,
    matches,
    relatedTableHeaders,
  }
})
