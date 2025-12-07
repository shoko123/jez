import type { TFieldValue } from '@/types/moduleTypes'

type TrioSelectorSource = 'Filter' | 'Tagger'
type TrioSourceName = TrioSelectorSource | 'Item'

type TCommonTrioOption = {
  text: string
  extra: TFieldValue
}

type TGroupDefs = {
  // enum
  EM: {
    group: {
      field_name: string
      useInTagger: boolean
      showAsTag: boolean
      dependency: string[][]
    }
    apiOption: { index: number; label: string }
    trioOption: TCommonTrioOption
  }
  // lookup value
  LV: {
    group: {
      table_name: string
      field_name?: string
      filter_by_field_name?: string
      useInTagger: boolean
      showAsTag: boolean
      dependency: string[][]
    }
    apiOption: { id: number; label: string }
    trioOption: TCommonTrioOption
  }
  // categorized (record => index)
  CT: {
    // eslint-disable-next-line
    group: {}
    apiOption: { index: number; label: string }
    trioOption: TCommonTrioOption
  }
  // module specific tags
  TM: {
    group: {
      multiple: boolean
      dependency: string[][]
    }
    apiOption: { tag_id: number; label: string }
    trioOption: TCommonTrioOption
  }
  // global tags
  TG: {
    group: {
      multiple: boolean
      dependency: string[][]
    }
    apiOption: { tag_id: number; label: string }
    trioOption: TCommonTrioOption
  }
  // optional numeric propertites
  ON: {
    group: {
      onp_group_id: number
      useInTagger: boolean
      showAsTag: boolean
      dependency: string[][]
    }
    apiOption: {
      onp_id: number
      label: string
      unit_label: string
      shift: number
      min: number
      max: number
    }
    trioOption: TCommonTrioOption & {
      id: number
      shift: number
      unitLabel: string
      min: number
      max: number
      label: string
      value: number | null
    }
  }
  // textual search field (column)
  SF: {
    group: {
      field_name: string
    }
    apiOption: string
    trioOption: TCommonTrioOption
  }
  // media
  MD: {
    // eslint-disable-next-line
    group: {}
    apiOption: string
    trioOption: TCommonTrioOption
  }
  // order by
  OB: {
    group: {
      options: string[]
    }
    addPropertiesToTrioGroup: { orderByOptions: string[] }
    apiOption: string
    trioOption: TCommonTrioOption & { key: string }
  }
}

type TCode = keyof TGroupDefs

//////// API ////////
type TApiOptionBare<C extends TCode = TCode> = TGroupDefs[C]['apiOption']

type TApiGroup<C extends TCode = TCode> = TGroupDefs[C]['group'] & {
  label: string
  code: C
  options: TApiOptionBare<C>[]
}

type TApiTrio<C extends TCode = TCode> = { name: string; groups: TApiGroup<C>[] }[]

//////// TRIO ////////
type TTrioOptionBare<C extends TCode = TCode> = TGroupDefs[C]['trioOption']
type TOption<C extends TCode = TCode> = TTrioOptionBare<C> & { groupKey: string }
type TTrioGroupBare<C extends TCode> = Omit<TApiGroup<C>, 'options'>

type TGroupA<C extends TCode> = TTrioGroupBare<C> & {
  optionKeys: string[]
  selectorCategoryIndex: number
}

// If defined, add 'addPropertiesToTrioGroup' to trio group.
type TGroup<C extends TCode = TCode> = 'addPropertiesToTrioGroup' extends keyof TGroupDefs[C]
  ? TGroupA<C> & TGroupDefs[C]['addPropertiesToTrioGroup']
  : TGroupA<C>

type TOptionObj<C extends TCode = TCode> = { [key: string]: TOption<C> }

type TGroupObj<C extends TCode = TCode> = {
  [key: string]: TGroup<C>
}

type TCategoriesArray = { name: string; groupKeys: string[] }[]
type TGroupOrFieldToKeyObj = { [key: string]: string }

type TTrio<C extends TCode = TCode> = {
  categories: TCategoriesArray
  groupsObj: TGroupObj<C>
  optionsObj: TOptionObj<C>
}

/////// Converter ///////
type TConverterFunc<C extends TCode> = (
  apiGroup: TApiGroup<C>,
) => [group: TTrioGroupBare<C>, options: TTrioOptionBare[]]

type TApiToTrioConvertersObj = {
  [TCode in keyof TGroupDefs]: TConverterFunc<TCode>
}

export {
  TrioSourceName,
  TrioSelectorSource,
  TApiTrio,
  TTrio,
  TCategoriesArray,
  TOptionObj,
  TGroupObj,
  TGroupOrFieldToKeyObj,
  TTrioOptionBare,
  TOption,
  TApiGroup,
  TGroup,
  TCode,
  TApiToTrioConvertersObj,
  TConverterFunc,
  TTrioGroupBare,
  TApiOptionBare,
}
