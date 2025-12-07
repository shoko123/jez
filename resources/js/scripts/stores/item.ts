import type { TId, TModule, TFields, TFieldsDisplay } from '@/types/moduleTypes'
import type { TApiItemShow } from '@/types/itemTypes'
import type { TOption } from '@/types/trioTypes'
import { type Ref, ref, computed } from 'vue'
import { defineStore, storeToRefs } from 'pinia'

import { useCollectionsStore } from './collections/collections'

import { useElementAndCollectionStore } from './collections/elementAndCollection'
import { useRoutesMainStore } from './routes/routesMain'
import { useXhrStore } from './xhr'
import { useModuleStore } from './module'
import { useTrioStore } from './trio/trio'

export const useItemStore = defineStore('item', () => {
  const { current } = storeToRefs(useRoutesMainStore())
  const { itemSetAllOptionsKeys, itemTagsToOptionsKeys, fieldsDependentData, getGroupFromLabel } =
    useTrioStore()
  const { trio, allPossibleOnpOptionKeys } = storeToRefs(useTrioStore())

  const { changeCount } = useModuleStore()

  const { module, fieldsParams } = storeToRefs(useModuleStore())
  const { setCollectionArray, convertAndSaveApiPage, getCollectionInfo, removeElement } =
    useCollectionsStore()
  const { send } = useXhrStore()

  const fields = ref<TFields | null>(null)
  const fieldsDisplay = ref<TFieldsDisplay | null>(null)

  const tag = ref<string>('')
  const ready = ref<boolean>(false)

  const id = computed(() => {
    return fields.value === null ? undefined : fields.value.id
  })

  const derived = computed(() => {
    return {
      module: current.value.module,
      id: id.value,
      tag: tag.value,
      moduleAndTag: `${current.value === undefined ? '' : current.value.module} ${tag.value}`,
    }
  })

  // Called at item load
  function setItem<F extends TFields>(apiItem: TApiItemShow<F>) {
    // console.log(`setItem: ${JSON.stringify(apiItem, null, 2)}`)
    // Save item fields, onps and tags
    fields.value = apiItem.fields
    // onps.value = apiItem.onps
    tag.value = apiItem.tag

    // save media & related collections
    setCollectionArray('media', apiItem.media_array, true)
    convertAndSaveApiPage('media', 'Gallery', apiItem.media_page)
    //related
    const relatedInfo = getCollectionInfo('related')
    setCollectionArray('related', apiItem.related_array, true)
    convertAndSaveApiPage('related', relatedInfo.viewName, apiItem.related_page)

    // Set fieldsDisplay and fields dependent options keys
    const data = fieldsDependentData(fields.value!, fieldsParams.value!)
    fieldsDisplay.value = data!.fieldsDisplay

    // onps
    // Clear all onp values from the previous item.
    clearOnpValues()

    apiItem.onps.forEach((grp) => {
      // console.log(`itemSaveOnp: ${JSON.stringify(grp, null, 2)}}`)
      // Get group and options from trio
      const group = getGroupFromLabel(grp.group_label)
      const optionLabelsFromTrio = group.optionKeys.map((x) => {
        return trio.value.optionsObj[x]?.text
      })
      console.log(`option labels from trio: ${optionLabelsFromTrio}`)
      // Find index of the api option
      const index = optionLabelsFromTrio.findIndex((x) => x === grp.label)
      if (index === -1) {
        throw `Can't find onp "${grp.group_label}:${grp.label}" in TRIO`
      } else {
        // Get a ref to the trio.option object
        const option = trio.value.optionsObj[group.optionKeys[index]!] as TOption<'ON'>
        // Set trio.option.text and value
        option.text = grp.label
        option.value = grp.value
      }
    })

    /////////////////////////
    //////////////////////////
    itemSetAllOptionsKeys(
      [
        ...data!.optionsKeys,
        ...itemTagsToOptionsKeys(
          apiItem.module_tags.concat(
            apiItem.global_tags,
            apiItem.onps.map((x) => {
              return { group_label: x.group_label, tag_text: x.label, value: x.value }
            }),
          ),
        ),
      ].sort((a, b) => {
        return a > b ? 1 : -1
      }),
    )
  }

  // eslint-disable-next-line
  function typedFieldsDisplay<M extends TModule>(module: M) {
    return fieldsDisplay as Ref<TFieldsDisplay<M>>
  }

  function clearItem() {
    fields.value = null
    fieldsDisplay.value = null
    clearOnpValues()
    tag.value = ''
    setCollectionArray('media', [], true)
    setCollectionArray('related', [], true)
  }

  function clearOnpValues() {
    allPossibleOnpOptionKeys.value.forEach((k) => {
      ;(<TOption<'ON'>>trio.value.optionsObj[k]).value = null
    })
  }

  async function itemRemove(): Promise<
    { success: true; id: TId | null } | { success: false; message: string }
  > {
    const { getIndex, getElement, setNextIndex } = useElementAndCollectionStore()
    const res = await send<{ deleted_id: string }>('module/destroy', 'post', {
      module: module.value,
      id: fields.value?.id,
    })

    if (!res.success) {
      return res
    }

    changeCount('items', -1)
    removeElement('main', getIndex('Show'), false)
    const info = getCollectionInfo('main')
    if (info.arrayLength > 0) {
      setNextIndex('Show', false)
      return { success: true, id: getElement('Show') as TId }
    } else {
      // A null id signals an empty array is empty
      return { success: true, id: null }
    }
  }

  // item views related
  const itemViews = ref<{ options: string[]; index: number }>({ options: [], index: 0 })

  function setItemViews(options: string[]) {
    itemViews.value.options = options
    itemViews.value.index = 0
  }

  function setNextItemView() {
    itemViews.value.index = (itemViews.value.index + 1) % itemViews.value.options.length
  }

  const itemView = computed(() => {
    const { current } = storeToRefs(useRoutesMainStore())
    if (itemViews.value.options.length === 0 || current.value.name !== 'show') {
      return undefined
    }
    return itemViews.value.options[itemViews.value.index]
  })

  return {
    fields,
    fieldsDisplay, // debug only
    typedFieldsDisplay,
    setItem,
    clearItem,
    derived,
    tag,
    ready,
    id,
    setItemViews,
    itemView,
    setNextItemView,
    itemRemove,
  }
})
