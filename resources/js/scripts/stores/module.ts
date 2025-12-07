import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type {
  TId,
  TApiModuleInit,
  TUrlModule,
  TModule,
  TModuleConfigs,
  TItemsPerPageByView,
  TItemsPerPage,
  TViewsForCollection,
  TModuleToUrlName,
  TUrlModuleNameToModule,
  TModuleBtnsInfo,
  TFieldsParams,
} from '../../types/moduleTypes'
import type { TCollectionName, TArray, TCollectionView } from '@/types/collectionTypes'
import { useItemStore } from '../../scripts/stores/item'
import { ModuleConfigs } from '../../configs/ModuleConfigs'
import { useCollectionsStore } from '../../scripts/stores/collections/collections'

export const useModuleStore = defineStore('module', () => {
  const moduleToUrlModuleName = ref<TModuleToUrlName | null>(null)
  const urlModuleNameToModule = ref<TUrlModuleNameToModule | null>(null)

  const module = ref<TModule>('Area')
  const counts = ref({ items: 0, media: 0 })
  const welcomeText = ref<string>('')
  const firstId = ref<TId>('K')
  const moduleConfigs = ref<TModuleConfigs | null>(null)
  const fieldsParams = ref<TFieldsParams | null>(null)

  const itemsPerPage = ref<TItemsPerPageByView>({ Gallery: 0, Tabular: 0, Chips: 0 })
  const ipp = ref<TItemsPerPage>({
    main: { Gallery: 0, Tabular: 0, Chips: 0 },
    related: { Gallery: 0, Tabular: 0, Chips: 0 },
    media: { Gallery: 0 },
  })
  const collectionViews = ref<TViewsForCollection>({ main: [], media: [], related: [] })

  /////// Called on app.init() /////
  function setModuleAndUrlNamesObjects(moduleToUrl: TModuleToUrlName) {
    // console.log(`setModuleAndUrlNamesObjects: ${JSON.stringify(moduleToUrl, null, 2)}`)
    moduleToUrlModuleName.value = moduleToUrl
    urlModuleNameToModule.value = inverse(moduleToUrlModuleName.value)
  }

  function setModuleInfo(initData: TApiModuleInit) {
    const { setItemViews } = useItemStore()
    const { setViewsAndPageLengths } = useCollectionsStore()
    module.value = initData.module
    counts.value = initData.counts
    welcomeText.value = initData.welcome_text
    firstId.value = initData.first_id
    moduleConfigs.value = ModuleConfigs.getConfigs(initData.module)
    fieldsParams.value = initData.fieldsMeta
    //
    setItemViews(initData['display_options']['item_views'])
    setViewsAndPageLengths(initData.collections_views_and_page_lengths)

    Object.entries(ipp.value).forEach(([key, value]) => {
      collectionViews.value[key as TCollectionName] = Object.keys(value) as TCollectionView[]
    })
  }

  function getModuleConfigs(module: TModule): TModuleConfigs {
    return ModuleConfigs.getConfigs(module)
  }

  function inverse(moduleToUrl: TModuleToUrlName) {
    return Object.fromEntries(
      Object.entries(moduleToUrl).map(([key, value]) => [value, key]),
    ) as TUrlModuleNameToModule
  }

  const moduleBtnsInfo = computed<TModuleBtnsInfo[]>(() => {
    const arr: TModuleBtnsInfo[] = []
    Object.entries(moduleToUrlModuleName.value!).forEach(([k, v]) => {
      arr.push({
        title: k,
        url_module: v,
        module: <TModule>k,
      })
    })
    return arr
  })

  function getCategorizerFuncs() {
    return moduleConfigs.value!.categorizerFuncs ?? null
  }

  // id, slug conversions
  function parseSlug(
    module: TModule,
    slug: string,
  ): { success: true; id: TId } | { success: false; message: string } {
    const configs = getModuleConfigs(module)
    const res = configs!.slugRegExp.exec(slug)

    if (res === null) {
      return { success: false, message: `Unsupported ${module} slug: ${slug}` }
    } else {
      return {
        success: true,
        id: configs.slugRegExpToIdFormatter(res.groups!),
      }
    }
  }

  async function slugFromId(id: TId, m: TModule) {
    // if (typeof id === 'number') {
    //   return id.toString()
    // }

    const configs = m === module.value ? moduleConfigs.value! : getModuleConfigs(m)
    const res = configs.idRegExp.exec(id)

    // console.log(
    //   `slugFromId idRegEx: ${config.idRegExp.toString()}, slugRegEx: ${config.slugRegExp.toString()}`,
    // )

    if (res === null) {
      console.log(`*** Error in Formatting id ${m}(id: ${id})`)
      return ''
    } else {
      return configs.idRegExpToSlugFormatter(res.groups!)
    }
  }

  function parseModule(urlModule: string) {
    if (urlModule in urlModuleNameToModule.value!) {
      return {
        success: true,
        module: urlModuleNameToModule.value![urlModule as keyof TUrlModuleNameToModule],
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

  function mayDelete(related: TArray<'related'>[]) {
    const mayDeleteFunc = moduleConfigs.value!.mayDelete
    return mayDeleteFunc(related)
  }

  function changeCount(countOf: 'items' | 'media', change: number) {
    counts.value[countOf] += change
  }

  return {
    setModuleAndUrlNamesObjects,
    setModuleInfo,
    moduleConfigs,
    module,
    counts,
    welcomeText,
    firstId,
    itemsPerPage,
    ipp,
    collectionViews,
    urlModuleNameToModule,
    moduleToUrlModuleName,
    moduleBtnsInfo,
    fieldsParams,
    parseModule,
    parseSlug,
    slugFromId,
    getCategorizerFuncs,
    mayDelete,
    changeCount,
  }
})
