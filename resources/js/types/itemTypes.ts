//showTypes.ts
//types returned from 'show' api route
import { TArray, TPageApi } from '@/types/collectionTypes'
import { TFields } from '@/types/moduleTypes'
type TOnp = {
  // optional numeric property
  group_label: string
  label: string
  value: number
  shift: number
}
type TApiTag = { group_label: string; tag_text: string; value?: number }

type TApiItemShow<F extends TFields> = {
  tag: string
  fields: F
  module_tags: TApiTag[]
  global_tags: TApiTag[]
  onps: TOnp[]
  media_array: TArray<'media'>[]
  media_page: TPageApi<'media', 'Gallery'>[]
  related_array: TArray<'related'>[]
  related_page: TPageApi<'related'>[]
}

export { TApiItemShow, TOnp, TApiTag }
