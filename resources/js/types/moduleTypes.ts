import type { TApiTrio } from '@/types/trioTypes'
import type {
  TCollectionName,
  TCollectionView,
  TArray,
  TAllViewsAndPageLengths,
} from '@/types/collectionTypes'

import type { TArea } from '@/types/modules/Area'
import type { TSurvey } from '@/types/modules/Survey'
import type { TSeason } from '@/types/modules/Season'
import type { TLocus } from '@/types/modules/Locus'
import type { TStone } from '@/types/modules/Stone'
import type { TCeramic } from '@/types/modules/Ceramic'
import type { TFauna } from '@/types/modules/Fauna'
import type { TGlass } from '@/types/modules/Glass'
import type { TLithic } from '@/types/modules/Lithic'
import type { TMetal } from '@/types/modules/Metal'

// Id type string or number(auto-increment)
type TId = string

type TFieldsParamsDefs = {
  INT: { min: number; max: number; shift?: number; nullable: boolean; default: number | null }
  STR: { min: number; max: number; nullable: boolean; default: string | null }
  LV: { groupName: string }
  RT: { tableName: string; columnName: string }
  EM: { groupName: string; default: string }
  DAT: { nullable: boolean; default: 'Today' | null; min?: string; max?: string }
}

type TFieldParamsCode = keyof TFieldsParamsDefs
type TFieldParamsSpecifics<C extends TFieldParamsCode> = TFieldsParamsDefs[C]

// Definition of all modules
type TDefs = {
  Area: TArea
  Survey: TSurvey
  Season: TSeason
  Locus: TLocus
  Stone: TStone
  Ceramic: TCeramic
  Fauna: TFauna
  Glass: TGlass
  Lithic: TLithic
  Metal: TMetal
}

type TModule = keyof TDefs

type TFieldsCodes<M extends TModule> = TDefs[M]['fields']

type TFields<M extends TModule = TModule> = {
  [K in keyof TFieldsCodes<M>]: TFieldsCodes<M>[K] extends 'STR'
    ? string
    : TFieldsCodes<M>[K] extends 'INT'
      ? number
      : TFieldsCodes<M>[K] extends 'DAT'
        ? Date
        : TFieldsCodes<M>[K] extends 'LV'
          ? number
          : TFieldsCodes<M>[K] extends 'RT'
            ? TId
            : // 'EM'
              string
}

type TFieldName<M extends TModule = TModule> = keyof TFields<M>

type TParamsAsTuple<C extends TFieldParamsCode = TFieldParamsCode> = [C, TFieldsParamsDefs[C]]

type TFieldsParams<M extends TModule = TModule> = {
  [K in keyof TFieldsCodes<M>]: TFieldsCodes<M>[K] extends TFieldParamsCode
    ? TParamsAsTuple<TFieldsCodes<M>[K]>
    : never
}

type TFieldsDisplay<M extends TModule = TModule> = {
  [K in keyof TFields<M>]: TFields<M>[K] extends 'LV' ? string : TFields<M>[K]
}

type TFieldsNew<M extends TModule = TModule> = {
  [K in keyof TFields<M>]: TFields<M>[K] extends 'DAT' ? Date : TFields<M>[K]
}

//////////////////////////

type TCategorizerFuncs = (fields?: TFields) => Record<string, number>

type TMayDeleteFunc = (
  related?: TArray<'related'>[],
) => { mayDelete: true } | { mayDelete: false; message?: string }

type TSlugFormatter = (g: TId, m?: TModule) => string
type TIdFormatter = (g: string) => TId

type TModuleConfigs = {
  idRegExp: RegExp
  idRegExpToSlugFormatter: (g: Record<string, string>) => string
  slugRegExp: RegExp
  slugRegExpToIdFormatter: (g: Record<string, string>) => TId
  categorizerFuncs: TCategorizerFuncs
  mayDelete: TMayDeleteFunc
}

// Conversions of Module <--> UrlModule
type TModuleToUrlName = {
  [Key in keyof TDefs]: TDefs[Key]['url_name']
}

// The "reverse" of TModuleToUrlName
type TUrlModuleNameToModule = {
  [K in keyof TModuleToUrlName as TModuleToUrlName[K]]: K
}

type TUrlModule = keyof TUrlModuleNameToModule

// Collections, views & pages
///////////////////////////////

// Items per page for each view are the same across collections.
// Of course a more elaborate schema can be devised.
type TItemsPerPageByView = Record<TCollectionView, number>
type TItemsPerPage = Record<TCollectionName, Partial<Record<TCollectionView, number>>>
type TViewsForCollection = Record<TCollectionName, TCollectionView[]>

// Specific records - "item"
////////////////////////////

type TFieldsErrors<M extends TModule = TModule> = {
  [Key in keyof TFields<M>]: string | undefined
}

type TFieldsDefaultsAndRules<M extends TModule> = {
  [Key in keyof TFields<M>]: { d: TFields<M>[Key] | undefined | null; r: object }
}

type TFieldValue = string | number | Date | null

type TModuleBtnsInfo = { title: string; module: TModule; url_module: TUrlModule }

type TApiModuleInit = {
  module: TModule
  counts: { items: number; media: number }
  first_id: TId
  fieldsMeta: TFieldsParams<TModule>
  display_options: {
    item_views: string[]
  }
  collections_views_and_page_lengths: TAllViewsAndPageLengths
  trio: TApiTrio
  welcome_text: string
}

export {
  TModule,
  TUrlModule,
  TModuleToUrlName,
  TUrlModuleNameToModule,
  TModuleConfigs,
  TApiModuleInit,
  TViewsForCollection,
  TItemsPerPage,
  TItemsPerPageByView,
  TModuleBtnsInfo,
  TSlugFormatter,
  TIdFormatter,

  // Item fields
  TFieldParamsCode,
  TFieldParamsSpecifics,
  TId,
  TFieldValue,
  TFields,
  TFieldName,
  TFieldsParams,
  TFieldsDisplay,
  TFieldsNew,
  TFieldsErrors,
  TFieldsDefaultsAndRules,
}
