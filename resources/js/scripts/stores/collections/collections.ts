import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type {
  TCollectionsData,
  TCData,
  TArray,
  TCollectionViewByCollectionName,
  TCollectionName,
  TAllViewsAndPageLengths,
  TPageApi,
  TPageSaved,
  TPage,
  TApiToSavedConverter,
  TArrayElementMatchesPageElement,
} from '@/types/collectionTypes'
import type { TModule } from '@/types/moduleTypes'
import type { TAsyncSuccessOptionalMessage } from '@/types/xhrTypes'

import { useModuleStore } from '../module'
import { useXhrStore } from '../xhr'
import { useCollectionMainStore } from './collectionMain'
import { useCollectionMediaStore } from './collectionMedia'
import { useCollectionRelatedStore } from './collectionRelated'

export const useCollectionsStore = defineStore('collections', () => {
  const { module } = storeToRefs(useModuleStore())
  const { send } = useXhrStore()

  const data = ref<TCollectionsData>({
    main: {
      array: [],
      page: [],
      viewsAndPageLengths: [],
      pageNoB1: 1,
      viewIndex: 0,
    },
    media: {
      array: [],
      page: [],
      viewsAndPageLengths: [],
      viewIndex: 1,
      pageNoB1: 0,
    },
    related: {
      array: [],
      page: [],
      viewsAndPageLengths: [],
      pageNoB1: 1,
      viewIndex: 0,
    },
  })

  function setViewsAndPageLengths(vpl: TAllViewsAndPageLengths) {
    // console.log(`setViewsAndPageLengths: ${JSON.stringify(vpl, null, 2)}`)
    for (const key in vpl) {
      data.value[key as TCollectionName]['viewsAndPageLengths'] = vpl[key as TCollectionName]
    }
  }

  function setCollectionArray<N extends TCollectionName>(
    name: N,
    array: TArray<N>[],
    setPageNoTo1: boolean,
  ) {
    // Make ts happy (instead of data.value[name].array = array)
    const specificData = data.value[name] as TCData<N>
    specificData.array = array

    if (setPageNoTo1) {
      specificData.pageNoB1 = 1
    }
  }

  function getCollectionArray<N extends TCollectionName>(name: N) {
    return data.value[name].array as TArray<N>[]
  }

  async function loadPage<N extends TCollectionName, V extends TCollectionViewByCollectionName<N>>(
    source: N,
    view: V,
    pageNoB1: number,
    module: TModule,
  ): TAsyncSuccessOptionalMessage {
    const pageLength = getPageLengthByCollectionAndView(source, view)
    const start = (pageNoB1 - 1) * pageLength
    const slice = data.value[source].array.slice(start, start + pageLength)

    console.log(
      `loadPage(${source}/${String(view)}/${module}) pNo(${pageNoB1}), startIndex: ${start}`,
    )

    const res = await loadAndConvertPageByArraySlice<N, V>(source, view, slice, module)
    if (res.success) {
      const specificData = data.value[source] as TCData<N>
      specificData.page = res.pageToSave
      data.value[source].pageNoB1 = pageNoB1
      return { success: true }
    } else {
      return res
    }
  }

  async function loadAndConvertPageByArraySlice<
    N extends TCollectionName,
    V extends TCollectionViewByCollectionName<N>,
  >(
    source: N,
    view: V,
    slice: TArray<N>[],
    module: TModule,
  ): Promise<
    { success: true; pageToSave: TPageSaved<N, V>[] } | { success: false; message: string }
  > {
    // console.log(
    //   `loadAndConvertPageByArraySlice(${source})  module: ${module} ,view: ${String(view)} slice: ${slice}`,
    // )

    const payload =
      source === 'related'
        ? {
            view,
            relations: slice,
          }
        : {
            module,
            view,
            ids: slice,
          }

    const res = await send<TPageApi<N, V>[]>(`page/${source}`, 'post', payload)
    if (res.success) {
      const converter = getCollectionStore(source).apiToSavedConverter as TApiToSavedConverter<N>
      return { success: true, pageToSave: converter(res.data, view) }
    } else {
      return res
    }
  }

  function convertAndSaveApiPage<
    N extends TCollectionName,
    V extends TCollectionViewByCollectionName<N>,
  >(source: N, view: V, apiPage: TPageApi<N, TCollectionViewByCollectionName<N>>[]) {
    const converter = getCollectionStore(source).apiToSavedConverter as TApiToSavedConverter<N>
    // Make TS happy - instead of data.value[source].page = converter(apiPage, view)
    const specificData = data.value[source] as TCData<N>
    specificData.page = converter(apiPage, view)
  }

  //////
  function getPageLengthByCollectionAndView<
    N extends TCollectionName,
    V extends TCollectionViewByCollectionName<N>,
  >(collectionName: N, viewName: V) {
    const view = data.value[collectionName].viewsAndPageLengths.find((x) => x[0] === viewName)
    if (view === undefined) {
      throw new Error('*** getPageInfoByIndex() ERROR view not found!! ***')
    }
    return view[1]
  }

  async function loadPageByItemIndex<
    N extends TCollectionName,
    V extends TCollectionViewByCollectionName<N>,
  >(collectionName: N, viewName: V, index: number, module: TModule) {
    const pageLength = getPageLengthByCollectionAndView(collectionName, viewName)
    const pageNoB1 = Math.floor(index / pageLength) + 1
    console.log(
      `loadPageByItemIndex(${collectionName}/${String(viewName)}/${module}) index: ${index}`,
    )
    return await loadPage(collectionName, viewName, pageNoB1, module)
  }

  async function toggleCollectionView<N extends TCollectionName>(name: N) {
    const info = getCollectionInfo(name)
    if (info.currentPageLength === 0) {
      console.log(`toggleCollectionView(length === 0) => abort`)
      return
    }
    console.log(`toggle info: ${JSON.stringify(info, null, 2)}`)

    await loadPageByItemIndex(
      name,
      info.nextViewName as TCollectionViewByCollectionName<N>,
      (info.pageNoB1 - 1) * info.itemsPerPage,
      module.value,
    )
    data.value[name].viewIndex = info.nextViewIndex
  }

  function clear(collections: TCollectionName[]) {
    collections.forEach((x) => {
      data.value[x].array = []
      data.value[x].pageNoB1 = 1
    })
  }

  function getPage<N extends TCollectionName>(name: N) {
    return data.value[name].page as TPage<N, TCollectionViewByCollectionName<N>>[]
  }

  function getCollectionInfo(name: TCollectionName) {
    const collection = data.value[name]
    const arrayLength = collection.array.length
    const currentViewTuple = collection.viewsAndPageLengths[collection.viewIndex]!
    const itemsPerPage = currentViewTuple[1]
    const nextViewIndex = (collection.viewIndex + 1) % collection.viewsAndPageLengths.length
    const nextViewTuple = collection.viewsAndPageLengths[nextViewIndex]!
    const currentPageLength = collection.page.length
    const pageNoB1 = collection.pageNoB1
    return {
      viewName: currentViewTuple[0],
      itemsPerPage,
      pageNoB1,
      arrayLength,
      noOfPages:
        Math.floor(arrayLength / itemsPerPage) + (arrayLength % itemsPerPage === 0 ? 0 : 1),
      currentPageLength,
      firstItemNo: (pageNoB1 - 1) * itemsPerPage + 1,
      lastItemNo: (pageNoB1 - 1) * itemsPerPage + currentPageLength,
      viewIndex: collection.viewIndex,
      nextViewIndex,
      nextViewName: nextViewTuple[0],
    }
  }

  function resetCollectionsViewIndexAndPageNo() {
    ;['main', 'media', 'related'].forEach((x) => {
      data.value[x as TCollectionName].viewIndex = 0
      data.value[x as TCollectionName].pageNoB1 = 1
    })
  }

  function elementByIndex(name: TCollectionName, index: number) {
    return data.value[name].array[index]
  }

  function indexInArray<N extends TCollectionName>(name: TCollectionName, element: TArray<N>) {
    const index = data.value[name].array.findIndex((x) => {
      return x === element
    })
    return index
  }

  // Used on Carousel.close() to check if we need to load a new page.
  function inPage<N extends TCollectionName, A extends TArray<N>>(collectionName: N, element: A) {
    const page = getPage(collectionName)
    const matcher = getCollectionStore(collectionName).matches as TArrayElementMatchesPageElement<
      N,
      TCollectionViewByCollectionName<N>
    >
    return page.some((x) => {
      return matcher(element, x)
    })
  }

  ///////////////////////////////
  // Manipulate local collections
  ///////////////////////////////

  async function removeElement<N extends TCollectionName>(
    name: N,
    index: number,
    updatePage: boolean,
    view?: TCollectionViewByCollectionName<N>,
    module?: TModule,
  ): TAsyncSuccessOptionalMessage {
    // Get collection info before making changes
    const info = getCollectionInfo(name)
    const pageNoB1 = info.pageNoB1
    const noOfPages = info.noOfPages
    const itemsPerPage = info.itemsPerPage
    const currentPageLength = info.currentPageLength

    // Remove from array

    data.value[name].array.splice(index, 1)

    if (!updatePage) {
      return { success: true }
    }

    // Update page - 2 cases:
    // (1) The removed item was in the last page - action depends on whether it was the only element in the page, and the number of pages.
    // (2) The removed item was not in the last page - get the first element from the next page and push it to fill the
    // spliced element in the currrent page.

    if (pageNoB1 === noOfPages) {
      // Element removed was in the last page.
      if (currentPageLength === 1) {
        // Element removed was the last in the page.
        if (pageNoB1 === 1) {
          // Only one page exists - set it to empty.
          data.value[name].page.splice(index % itemsPerPage, 1)
          return { success: true }
        } else {
          // Previous page exists - load it.
          return loadPage(name, view!, pageNoB1 - 1, module!)
        }
      } else {
        // Not the first element in the page - splice.
        data.value[name].page.splice(index % itemsPerPage, 1)
        return { success: true }
      }
    } else {
      // Next page exists - splice and fill missing element from the DB.
      data.value[name].page.splice(index % itemsPerPage, 1)
      const res = await loadAndConvertPageByArraySlice<N, TCollectionViewByCollectionName<N>>(
        name,
        info.viewName,
        [data.value[name].array[index + 1]] as TArray<N>[],
        module!,
      )
      if (res.success) {
        const specificData = data.value[name] as TCData<N>
        specificData.page.push(res.pageToSave[0]!)
        return { success: true }
      } else {
        return res
      }
    }
  }

  async function addElements<
    N extends TCollectionName,
    V extends TCollectionViewByCollectionName<N>,
  >(
    name: N,
    elements: TArray<N>[],
    updatePage: boolean,
    pageApi?: TPageApi<N, V>[],
    module?: TModule,
  ): TAsyncSuccessOptionalMessage {
    console.log(
      `collections.addElements() cname: ${name}, elements: ${elements}, pageApi: ${pageApi}`,
    )
    // Add elements to array
    const specificData = data.value[name] as TCData<N>
    specificData.array = [...specificData.array, ...elements]

    if (!updatePage) {
      return { success: true }
    }
    const info = getCollectionInfo(name)
    // 2 cases:
    // (1) Array is shorter then page - add elements to the current page.
    // (2) Array is longer than a page - load the last page from DB.
    if (info.arrayLength <= info.itemsPerPage) {
      const converter = getCollectionStore(name).apiToSavedConverter as TApiToSavedConverter<N>
      const specificData = data.value[name] as TCData<N>
      specificData.page = [...specificData.page, ...converter(pageApi!, info.viewName)]
    } else {
      const res = await loadPage<N, TCollectionViewByCollectionName<N>>(
        name,
        info.viewName,
        info.noOfPages,
        module!,
      )
      return res
    }
    return { success: true }
  }

  // Currently implemented only for media/Gallery
  async function switchOrder<N extends TCollectionName>(
    name: N,
    indexA: number,
    indexB: number,
  ): TAsyncSuccessOptionalMessage {
    if (name !== 'media') {
      return {
        success: false,
        message: `Switch order is currently only implemented for the media collection.`,
      }
    }
    const a = data.value.media.array[indexA] ?? 0
    const b = data.value.media.array[indexB] ?? 0
    const aInPage = inPage('media', a)
    const bInPage = inPage('media', b)
    const info = getCollectionInfo('media')

    // 3 cases:
    // (1) Both elements are not in the current page - error
    // (2) Both elements are in the current page - switch
    // (3) One element is in the current page and one out - load the 'out' element from the DB
    if (!aInPage && !bInPage) {
      return { success: false, message: `Switch order() - Both elements not in the current page.` }
    } else if (aInPage && bInPage) {
      switchMediaArrayElements(a, b)

      const pageIndexA = indexA % info.itemsPerPage
      const pageIndexB = indexB % info.itemsPerPage
      const temp = { ...data.value.media.page[pageIndexA]! }
      data.value.media.page[pageIndexA]! = data.value.media.page[pageIndexB]!
      data.value.media.page[pageIndexB]! = temp
      return { success: true }
    } else {
      switchMediaArrayElements(a, b)

      const inIndex = aInPage ? indexA : indexB
      const res = await loadAndConvertPageByArraySlice<N, TCollectionViewByCollectionName<N>>(
        name,
        'Gallery',
        [data.value.media.array[inIndex]] as TArray<N>[],
        module.value,
      )
      if (res.success) {
        data.value.media.page[inIndex % info.itemsPerPage] = res.pageToSave[0]! as TPageSaved<
          'media',
          'Gallery'
        >
        return { success: true }
      } else {
        return res
      }
    }

    function switchMediaArrayElements(a: number, b: number) {
      const tempArrayElement = a
      data.value.media.array[indexA] = b
      data.value.media.array[indexB] = tempArrayElement
    }
  }

  function getCollectionStore(source: TCollectionName) {
    switch (source) {
      case 'main':
        return useCollectionMainStore()
      case 'media':
        return useCollectionMediaStore()
      case 'related':
        return useCollectionRelatedStore()
    }
  }

  return {
    setViewsAndPageLengths,
    resetCollectionsViewIndexAndPageNo,
    clear,
    getCollectionInfo,
    //
    setCollectionArray,
    getCollectionArray,
    //
    getPage,
    getPageLengthByCollectionAndView,
    loadPage,
    loadPageByItemIndex,
    toggleCollectionView,
    convertAndSaveApiPage,
    //
    elementByIndex,
    indexInArray,
    inPage,
    //
    addElements,
    removeElement,
    switchOrder,
    // Debug
    data,
  }
})
