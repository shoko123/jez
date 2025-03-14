import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  TApiModuleInit,
  TUrlModule,
  TSpecialFields,
  TModule,
  TModuleConfigs,
  TItemsPerPageByView,
  TViewsForCollection,
  TModuleToUrlName,
  TUrlModuleNameToModule,
  TModuleBtnsInfo,
} from '../../types/moduleTypes'
import type { TCName, TArray } from '@/types/collectionTypes'
type TItemViews = { options: string[]; index: number }

import { AreaConfigs } from '../../configs/AreaConfigs'
import { SeasonConfigs } from '../../configs/SeasonConfigs'
import { SurveyConfigs } from '../../configs/SurveyConfigs'
import { LocusConfigs } from '../../configs/LocusConfigs'
import { CeramicConfigs } from '../../configs/CeramicConfigs'
import { FaunaConfigs } from '../../configs/FaunaConfigs'
import { GlassConfigs } from '../../configs/GlassConfigs'
import { LithicConfigs } from '../../configs/LithicConfigs'
import { MetalConfigs } from '../../configs/MetalConfigs'
import { StoneConfigs } from '../../configs/StoneConfigs'

export const useModuleStore = defineStore('module', () => {
  const module = ref<TModule>('Locus')
  const counts = ref({ items: 0, media: 0 })
  const welcomeText = ref<string>('')
  const firstSlug = ref<string>('')
  const specialFields = ref<TSpecialFields>({})
  const itemsPerPage = ref<TItemsPerPageByView>({ Gallery: 0, Tabular: 0, Chips: 0 })
  const collectionViews = ref<TViewsForCollection>({ main: [], media: [], related: [] })
  const itemViews = ref<TItemViews>({ options: [], index: -1 })

  // Next 2 structures define the modules and their required properties.
  const moduleToUrlModuleName = ref<TModuleToUrlName>({
    Area: 'areas',
    Season: 'seasons',
    Survey: 'survey',
    Locus: 'loci',
    Ceramic: 'ceramics',
    Stone: 'stones',
    Lithic: 'lithics',
    Fauna: 'fauna',
    Metal: 'metals',
    Glass: 'glass',
  })

  function getModuleConfigs(moduleName: TModule): TModuleConfigs {
    switch (moduleName) {
      case 'Area':
        return AreaConfigs.getConfigs()
      case 'Season':
        return SeasonConfigs.getConfigs()
      case 'Survey':
        return SurveyConfigs.getConfigs()
      case 'Locus':
        return LocusConfigs.getConfigs()
      case 'Ceramic':
        return CeramicConfigs.getConfigs()
      case 'Fauna':
        return FaunaConfigs.getConfigs()
      case 'Glass':
        return GlassConfigs.getConfigs()
      case 'Lithic':
        return LithicConfigs.getConfigs()
      case 'Metal':
        return MetalConfigs.getConfigs()
      case 'Stone':
        return StoneConfigs.getConfigs()
    }
  }

  async function setModuleInfo(initData: TApiModuleInit) {
    module.value = initData.module
    counts.value = initData.counts
    welcomeText.value = initData.welcome_text
    firstSlug.value = tagAndSlugFromId(initData.first_id, initData.module).slug
    specialFields.value = initData.specialFields
    //
    itemsPerPage.value = initData['display_options']['items_per_page']
    collectionViews.value = initData['display_options']['collection_views']
    itemViews.value.options = initData['display_options']['item_views']
    itemViews.value.index = 0
  }

  // Construct necessary module related structures (often accessed by module rather than by url_module).
  const urlModuleNameToModule = ref(inverse(moduleToUrlModuleName.value))

  function inverse(moduleToUrl: TModuleToUrlName) {
    return Object.fromEntries(Object.entries(moduleToUrl).map(([key, value]) => [value, key]))
  }

  // Collection views related functionality
  function getItemsPerPage(collectionName: TCName, collectionViewIndex: number): number {
    return itemsPerPage.value[collectionViews.value[collectionName]![collectionViewIndex]!]!
  }

  function getCollectionViewName(collectionName: TCName, collectionViewIndex: number) {
    return collectionViews.value[collectionName]![collectionViewIndex]!
  }

  function getCollectionViews(collectionName: TCName) {
    return collectionViews.value[collectionName]!
  }

  const moduleBtnsInfo = computed<TModuleBtnsInfo[]>(() => {
    const arr: TModuleBtnsInfo[] = []
    Object.entries(moduleToUrlModuleName.value).forEach(([k, v]) => {
      arr.push({
        title: k,
        url_module: v,
        module: <TModule>k,
      })
    })
    return arr
  })

  // item views related
  function setNextItemView() {
    itemViews.value.index = (itemViews.value.index + 1) % itemViews.value.options.length
  }

  function resetItemView() {
    itemViews.value.index = 0
  }

  const itemView = computed(() => {
    return itemViews.value.options[itemViews.value.index]
  })

  function getCategorizerFuncs() {
    const configs = getModuleConfigs(module.value)
    return configs.categorizerFuncs ?? null
  }

  // id, tag and slug conversions
  function parseSlug(
    module: TModule,
    slug: string,
  ): { success: true; id: string } | { success: false; message: string } {
    const config = getModuleConfigs(module)
    const res = config.slugRegExp.exec(slug)

    if (res === null) {
      return { success: false, message: `Unsupported ${module} slug: ${slug}` }
    } else {
      return {
        success: true,
        id: config.idFormatter(res.groups!),
      }
    }
  }

  function tagAndSlugFromId(id: string, m?: TModule) {
    // If the module is not provided, use current.
    const mod = m === undefined ? module.value : m

    const config = getModuleConfigs(mod)
    const res = config.idRegExp.exec(id)

    // console.log(
    //   `tagAndSlugFromId idRegEx: ${config.idRegExp.toString()}, slugRegEx: ${config.slugRegExp.toString()}`,
    // )

    if (res === null) {
      console.log(`*** Error in Formatting id (${mod}) "${id}"`)
      return { tag: '', slug: '' }
    } else {
      return config.idDerived(res.groups!)
    }
  }

  function parseModule(urlModule: string) {
    if (urlModule in urlModuleNameToModule.value) {
      return {
        success: true,
        module: urlModuleNameToModule.value[urlModule as keyof TUrlModuleNameToModule],
        url_module: urlModule as TUrlModule,
      }
    } else {
      return {
        success: false,
        data: null,
        message: `Error: unknown url module "${urlModule}"`,
      }
    }
  }

  function prepareNewFields(fields: object) {
    const newFields = Object.fromEntries(
      Object.entries(fields).map(([key, value]) => {
        if (
          specialFields.value.dates &&
          specialFields.value.dates.includes(key) &&
          value !== null
        ) {
          console.log(`converting field ${key}(${value}) to Date`)
          return [key, new Date(value)]
        } else {
          return [key, value]
        }
      }),
    )
    return newFields
  }

  function mayDelete(related: TArray<'related'>[]) {
    const mayDeleteFunc = getModuleConfigs(module.value).mayDelete
    return mayDeleteFunc(related)
  }

  function changeCount(countOf: 'items' | 'media', change: number) {
    counts.value[countOf] += change
  }

  return {
    setModuleInfo,
    module,
    counts,
    welcomeText,
    firstSlug,
    itemsPerPage,
    collectionViews,
    urlModuleNameToModule,
    moduleToUrlModuleName,
    moduleBtnsInfo,
    parseModule,
    parseSlug,
    tagAndSlugFromId,
    getCollectionViews,
    getCollectionViewName,
    getItemsPerPage,
    getCategorizerFuncs,
    itemViews,
    itemView,
    setNextItemView,
    resetItemView,
    specialFields,
    prepareNewFields,
    mayDelete,
    changeCount,
  }
})
