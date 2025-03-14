import type { TApiTrio, TOption } from '@/types/trioTypes'
import type { TCName, TCollectionView, TArray } from '@/types/collectionTypes'

import type { TArea } from '@/types/modules/Area'
import type { TSeason } from '@/types/modules/Season'
import type { TLocus } from '@/types/modules/Locus'
import type { TSurvey } from '@/types/modules/Survey'
import type { TCeramic } from '@/types/modules/Ceramic'
import type { TLithic } from '@/types/modules/Lithic'
import type { TStone } from '@/types/modules/Stone'
import type { TFauna } from '@/types/modules/Fauna'
import type { TGlass } from '@/types/modules/Glass'
import type { TMetal } from '@/types/modules/Metal'

// Definition of all modules
type TDefs = {
  Area: TArea
  Season: TSeason
  Survey: TSurvey
  Locus: TLocus
  Ceramic: TCeramic
  Lithic: TLithic
  Stone: TStone
  Glass: TGlass
  Fauna: TFauna
  Metal: TMetal
}
type TCategorizerFuncs = (fields?: TFields) => Record<string, number>

type TMayDeleteFunc = (
  related?: TArray<'related'>[],
) => { mayDelete: true } | { mayDelete: false; message?: string }

type TModuleConfigs = {
  idRegExp: RegExp
  idDerived: (g: Record<string, string>) => { slug: string; tag: string }
  slugRegExp: RegExp
  idFormatter: (g: Record<string, string>) => string
  categorizerFuncs: TCategorizerFuncs
  mayDelete: TMayDeleteFunc
}

// Conversions of Module <--> UrlModule
type TModuleToUrlName = {
  [Key in keyof TDefs]: TDefs[Key]['url_name']
}

// The "reverse" of TModuleToUrlName
type TUrlModuleNameToModule = { [K in keyof TModuleToUrlName as TModuleToUrlName[K]]: K }

type TModule = keyof TDefs
type TUrlModule = keyof TUrlModuleNameToModule

// Collections, views & pages
///////////////////////////////

// Items per page for each view are the same across collections.
// Of course a more elaborate schema can be devised.
type TItemsPerPageByView = Record<TCollectionView, number>
type TViewsForCollection = Record<TCName, TCollectionView[]>

type TApiTabular = {
  id: string
  field: number
  [key: string]: string | number
}

// Specific records - "item"
////////////////////////////
type TFields<M extends TModule = TModule> = TDefs[M]['fields']
type TApiFields = SwapDatesWithStrings<TFields>

type SwapDatesWithStrings<T> = {
  [k in keyof T]: T[k] extends Date ? string : T[k]
}

type TLookupFields<M extends TModule = TModule> = Partial<{
  [Key in keyof TFields<M>]: string
}>

type TFieldsErrors<M extends TModule = TModule> = {
  [Key in keyof TFields<M>]: string | undefined
}

type TFieldsDefaultsAndRules<M extends TModule> = {
  [Key in keyof TFields<M>]: { d: TFields<M>[Key] | undefined | null; r: object }
}

type TFieldInfo = {
  fieldName: string
  fieldValue: TFieldValue
  code: string
  optionKey: string
  optionLabel: string
  optionExtra: TFieldValue
  options: TOption[]
  index: number
}

type TFieldValue = string | number | boolean | null

type TModuleBtnsInfo = { title: string; module: TModule; url_module: TUrlModule }

type TSpecialFields = {
  dates?: string[]
  lookupVals?: string[]
  enums?: string[]
  onps?: true
}
type TApiModuleInit = {
  module: TModule
  counts: { items: number; media: number }
  first_id: string
  specialFields: TSpecialFields
  display_options: {
    item_views: string[]
    collection_views: TViewsForCollection
    items_per_page: TItemsPerPageByView
  }

  trio: TApiTrio
  welcome_text: string
}

export {
  TModule,
  TUrlModule,
  TModuleToUrlName,
  TSpecialFields,
  TUrlModuleNameToModule,
  TModuleConfigs,
  TApiModuleInit,
  TViewsForCollection,
  TItemsPerPageByView,
  TModuleBtnsInfo,
  TApiTabular,

  // Item fields
  TFieldValue,
  TApiFields,
  TFields,
  TLookupFields,
  TFieldInfo,
  TFieldsErrors,
  TFieldsDefaultsAndRules,
}
