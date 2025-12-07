import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import type {
  TApiTrio,
  TTrio,
  TGroupOrFieldToKeyObj,
  TrioSourceName,
  TrioSelectorSource,
  TGroup,
  TCode,
  TOption,
} from '../../../types/trioTypes'
import type {
  TFields,
  TFieldName,
  TFieldValue,
  TFieldsParams,
  TFieldParamsCode,
  TFieldParamsSpecifics,
  TFieldsDisplay,
} from '@/types/moduleTypes'
import type { TApiTag } from '@/types/itemTypes'
import { assert } from '../../utils/utils'
import { normalizeTrio } from './trioNormalizer'
import { useRoutesMainStore } from '../routes/routesMain'
import { useModuleStore } from '../module'
import { useTrioOnpStore } from './trioOnp'
import { shiftedNumericLabel } from '@/scripts/utils/utils'

export const useTrioStore = defineStore('trio', () => {
  const { current } = storeToRefs(useRoutesMainStore())
  const { getCategorizerFuncs } = useModuleStore()
  const { openOnpForm } = useTrioOnpStore()
  const trio = ref<TTrio>({ categories: [], groupsObj: {}, optionsObj: {} })
  const groupLabelToGroupKeyObj = ref<TGroupOrFieldToKeyObj>({})

  const taggerAllOptionKeys = ref<string[]>([])
  const filterAllOptionKeys = ref<string[]>([])
  const itemAllOptionKeys = ref<string[]>([])

  //current indices of visible categories/groups
  const selectorCategoryIndex = ref<number>(0)
  const selectorGroupIndex = ref<number>(0)

  function typedGroup<C extends TCode>(code: C, group: TGroup<TCode>) {
    return group as unknown as TGroup<C>
  }

  // Setup trio
  async function setTrio(apiTrio: TApiTrio) {
    clearTrio()
    const res = normalizeTrio(apiTrio)
    // console.log(`trio: ${JSON.stringify(res, null, 2)}`)
    trio.value = res.trio
    groupLabelToGroupKeyObj.value = res.groupLabelToGroupKeyObj
  }

  function clearTrio() {
    console.log(`clearTrio()`)
    resetCategoryAndGroupIndices()
    filterClearOptions(false)
    taggerClearOptions(false)
    itemAllOptionKeys.value = []
    trio.value = { categories: [], groupsObj: {}, optionsObj: {} }
    groupLabelToGroupKeyObj.value = {}
  }

  const groupLabels = computed(() => {
    const labels: string[] = []
    for (const key in groupLabelToGroupKeyObj.value) {
      labels.push(key)
    }
    return labels
  })

  function getOptionFromKey(optionKey: string) {
    return { ...trio.value.optionsObj[optionKey]! } as const
  }

  function getGroupFromKey(groupKey: string) {
    return { ...trio.value.groupsObj[groupKey]! } as const
  }

  function getGroupFromLabel(groupLabel: string) {
    if (groupLabelToGroupKeyObj.value[groupLabel] === undefined) {
      console.log(`Undefined group "${groupLabel}"`)
      throw `Undefined group ${groupLabel}`
    }

    const groupKey = groupLabelToGroupKeyObj.value[groupLabel]
    return getGroupFromKey(groupKey)
  }

  ////////////////////////////////
  // Displayed options (Read Only)
  ////////////////////////////////

  // Returns an object with Filter & Tagger keys and all available groupKeys according to group's dependencies.
  const availableGroupKeys = computed(() => {
    const tmp: Record<TrioSelectorSource, string[]> = { Filter: [], Tagger: [] }

    for (const grpKey in trio.value.groupsObj) {
      const group = getGroupFromKey(grpKey)
      // i++
      switch (group.code) {
        case 'LV':
        case 'EM':
          {
            const g = typedGroup(group.code, group)
            if (dependencyConditionsMet(g.dependency!, filterAllOptionKeys.value)) {
              tmp['Filter'].push(grpKey)
            }

            if (
              g.useInTagger &&
              dependencyConditionsMet(g.dependency!, taggerAllOptionKeys.value)
            ) {
              tmp['Tagger'].push(grpKey)
            }
          }
          break

        case 'TG':
        case 'TM':
        case 'ON':
          {
            const g = typedGroup(group.code, group)
            if (dependencyConditionsMet(g.dependency!, filterAllOptionKeys.value)) {
              // console.log(`${i}. Filter "${groupTG.label}" dependency Yes`)
              tmp['Filter'].push(grpKey)
            } else {
              // console.log(`${i}. Filter "${groupTG.label}" dependency NO`)
            }

            if (dependencyConditionsMet(g.dependency!, taggerAllOptionKeys.value)) {
              tmp['Tagger'].push(grpKey)
            }
          }
          break

        case 'SF':
        case 'OB':
        case 'MD':
        case 'CT':
          tmp['Filter'].push(grpKey)
      }
    }
    return tmp
  })

  function dependencyConditionsMet(dependency: string[][], selectedKeys: string[]) {
    return (
      dependency.length === 0 ||
      dependency.every((y) => {
        return y.some((x) => {
          return selectedKeys.includes(x)
        })
      })
    )
  }

  function groupDependencyText(grpKey: string) {
    const group = trio.value.groupsObj[grpKey]!
    // const g = typedGroup('', group)
    if (['SF', 'CT', 'MD', 'OB'].includes(group.code)) {
      return 'Dependency: Independent'
    }
    if (['EM', 'LV', 'TM', 'TG', 'ON'].includes(group.code)) {
      const g = group as TGroup<'EM' | 'LV' | 'TM' | 'TG' | 'ON'>
      if (g.dependency.length === 0) {
        return 'Dependency: Independent'
      } else {
        let formattedDependency: string = ''
        g.dependency.forEach((x) => {
          const text = x.reduce((accumulator, currentValue) => {
            const dependencyOption = getOptionFromKey(currentValue)
            const dependencyGroup = getGroupFromKey(dependencyOption.groupKey)
            return accumulator + dependencyGroup.label + ':' + dependencyOption.text + ' OR '
          }, '')
          formattedDependency += `[${text.slice(0, -4)}] AND `
        })
        return `Dependency: ${formattedDependency.slice(0, -5)}`
      }
    }
  }

  // Route dependent: welcome, index, show, filter. Also create, and update routes
  const routeIsNotTagger = computed(() => {
    return current.value.name !== 'tag'
  })

  const routeIsTagger = computed(() => {
    return current.value.name === 'tag'
  })

  const availableGroupKeysByRoute = computed(() => {
    return routeIsNotTagger.value
      ? availableGroupKeys.value['Filter']
      : routeIsTagger.value
        ? availableGroupKeys.value['Tagger']
        : []
  })

  const selectedOptionKeysByRoute = computed(() => {
    return routeIsNotTagger.value
      ? filterAllOptionKeys.value
      : routeIsTagger.value
        ? taggerAllOptionKeys.value
        : []
  })

  // dependent on route and selectedKeys (filter or tag)
  const visibleCatIndices = computed(() => {
    const indices: number[] = []
    availableGroupKeysByRoute.value.forEach((x) => {
      const catIndex = getGroupFromKey(x).selectorCategoryIndex
      if (!indices.includes(catIndex)) {
        indices.push(catIndex)
      }
    })
    return indices
  })

  const selectorCategoryTabs = computed(() => {
    return visibleCatIndices.value.map((x) => {
      const cat = trio.value.categories[x]!

      return {
        catIndex: x,
        catName: cat.name,
        groupKeys: cat.groupKeys,
        selectedCount: cat.groupKeys.reduce((accumulator, groupKey) => {
          return accumulator + (availableGroupsSelectedCounterObj.value[groupKey]! ?? 0) // Avoid apparent race condition
        }, 0),
      }
    })
  })

  const selectorGroupTabs = computed(() => {
    return visibleGroupKeys.value.map((x) => {
      const group = getGroupFromKey(x)
      if (routeIsNotTagger.value) {
        return {
          name: group.label,
          groupKey: x,
          groupType: group.code,
          selectedCount: availableGroupsSelectedCounterObj.value[x]!,
        }
      } else {
        const isTag = ['TG', 'TM'].includes(group.code)

        const multiple = isTag && (<TGroup<'TG' | 'TM'>>group).multiple
        const required = !isTag
        return {
          name: group.label,
          groupKey: x,
          groupType: group.code,
          multiple,
          required,
          selectedCount: availableGroupsSelectedCounterObj.value[x]!,
        }
      }
    })
  })

  const availableGroupsSelectedCounterObj = computed(() => {
    const tmp: Record<string, number> = {}

    availableGroupKeysByRoute.value.forEach((x) => {
      const group = getGroupFromKey(x)
      tmp[x] = selectedCount(group.optionKeys, selectedOptionKeysByRoute.value)
    })
    return tmp
  })

  function selectedCount(arr1: string[], arr2: string[]) {
    return arr1.reduce((accumulator, option) => {
      return accumulator + (arr2.includes(option) ? 1 : 0)
    }, 0)
  }

  // Visible groupKeys depend on selectorCategoryIndex and can be either filter or tag.
  const visibleGroupKeys = computed(() => {
    const categoryGroupKeys =
      trio.value.categories[visibleCatIndices.value[selectorCategoryIndex.value]!]?.groupKeys ?? []
    return categoryGroupKeys.filter((x) => {
      return availableGroupKeys.value[routeIsTagger.value ? 'Tagger' : 'Filter'].includes(x)
    })
  })

  const currentGroup = computed(() => {
    return getGroupFromKey(visibleGroupKeys.value[selectorGroupIndex.value]!)
  })

  const selectorOptions = computed(() => {
    return currentGroup.value === undefined
      ? []
      : currentGroup.value.optionKeys.map((x) => {
          return {
            ...getOptionFromKey(x),
            optionLabelForTagger: getLabelFromOptionKey(x, 'Item'),
            optionLabelForFilter: getLabelFromOptionKey(x, 'Filter'),
            selected: selectedOptionKeysByRoute.value.includes(x),
            key: x,
          }
        })
  })

  function displayedSelected(source: TrioSourceName, selected: string[]) {
    const displayGroups: {
      groupKey: string
      label: string
      catIndex: number
      options: string[]
    }[] = []

    const cats: {
      myIndex: number
      label: string
      groups: { label: string; options: string[] }[]
    }[] = []

    // console.log(`displayedSelectedItem.selected: (${itemAllOptionKeys.value})`)
    // console.log(`labels: (${itemAllOptionKeys.value.map((x) => getOptionFromKey(x)?.text)})`)

    // Build groups
    for (const key of selected) {
      const groupKey = getOptionFromKey(key).groupKey
      const group = getGroupFromKey(groupKey)
      // If item, don't show CT groups , show LV & EM groups only if showAsTag is true and don't show if 'Unassigned'
      if (source === 'Item') {
        switch (group.code) {
          case 'CT':
            continue

          case 'LV':
          case 'EM':
          case 'ON':
            {
              const g = typedGroup(group.code, group)
              if (!g.showAsTag) {
                continue
              } else {
                if (getOptionFromKey(key).text === 'Unassigned') {
                  continue
                }
              }
            }
            break

          default:
          // show tags that belong to TM & TG group types
        }
      }

      const index = displayGroups.findIndex((x) => x.groupKey === getOptionFromKey(key).groupKey)

      if (index === -1) {
        const groupKey = getOptionFromKey(key).groupKey
        const group = getGroupFromKey(groupKey)

        displayGroups.push({
          groupKey,
          label: group.label,
          catIndex: group.selectorCategoryIndex,
          options: [getLabelFromOptionKey(key, source === 'Filter' ? 'Filter' : 'Item')],
        })
      } else {
        displayGroups[index]?.options.push(
          getLabelFromOptionKey(key, source === 'Filter' ? 'Filter' : 'Item'),
        )
      }
    }

    // Build cats
    displayGroups.forEach((group) => {
      const index = cats.findIndex((x) => x.myIndex === group.catIndex)
      if (index === -1) {
        const cat = trio.value.categories[group.catIndex]!
        cats.push({
          myIndex: group.catIndex,
          label: cat.name,
          groups: [{ label: group.label, options: group.options }],
        })
      } else {
        cats[index]?.groups.push({ label: group.label, options: [...group.options] })
      }
    })

    // return formated structure
    return cats.map((x) => {
      return { label: x.label, groups: x.groups }
    })
  }

  const displayedSelectedItem = computed(() => {
    return displayedSelected('Item', itemAllOptionKeys.value)
  })

  const displayedSelectedTagger = computed(() => {
    return displayedSelected('Tagger', taggerAllOptionKeys.value)
  })

  const displayedSelectedFilter = computed(() => {
    return displayedSelected('Filter', filterAllOptionKeys.value)
  })

  const itemOnps = computed(() => {
    const onpsByGroup = []
    for (const value of Object.values(groupLabelToGroupKeyObj.value)) {
      const group = getGroupFromKey(value)
      if (group.code === 'ON') {
        const optionKeys = group.optionKeys.filter((x) => itemAllOptionKeys.value.includes(x))
        onpsByGroup.push({
          groupLabel: group.label,
          groupKey: value,
          onps: optionKeys.map((x) => {
            const option = getOptionFromKey(x) as TOption<'ON'>
            return {
              optionLabel: option.label,
              optionValue: option.value,
              shift: option.shift,
              unitLabel: option.unitLabel,
            }
          }),
        })
      }
    }
    return onpsByGroup
  })

  const allPossibleOnpOptionKeys = computed(() => {
    const onpOptionKeys: string[] = []
    for (const value of Object.values(groupLabelToGroupKeyObj.value)) {
      const group = getGroupFromKey(value)
      if (group.code === 'ON') {
        onpOptionKeys.push(...group.optionKeys)
      }
    }
    return onpOptionKeys
  })

  const DebugItemOptions = computed(() => {
    return itemAllOptionKeys.value.map((key) => {
      const option = getOptionFromKey(key)
      const group = getGroupFromKey(option.groupKey)
      return `${key}: ${group.label}:${option.text}`
    })
  })

  const DebugNewItemOptions = computed(() => {
    return taggerAllOptionKeys.value.map((key) => {
      const option = getOptionFromKey(key)
      const group = getGroupFromKey(option.groupKey)
      return `${key}: ${group.label}:${option.text}`
    })
  })
  ////////////////// Display section - END //////////////////////

  function itemSetAllOptionsKeys(optionsKeys: string[]) {
    itemAllOptionKeys.value = optionsKeys
  }

  function copyItemOptionsToTagger() {
    taggerAllOptionKeys.value = [...itemAllOptionKeys.value]
  }

  function fieldsDependentData(fields: TFields, fieldsParams: TFieldsParams) {
    // Here we do two things:
    // 1. Convert fields to fieldsDisplay
    // 2. Collect all the optionKeys that are dependant on fields (LV, EM, and categorizer functions)

    // console.log(
    //   `fields:\n${JSON.stringify(fields, null, 2)}\nparams:${JSON.stringify(fieldsParams, null, 2)}`,
    // )
    const partialFieldsDisplay: Partial<Record<keyof TFields, TFieldValue>> = {}
    const optionsKeys: string[] = []

    // Lookup, Enum & Value fields
    //////////////////////////////
    let key: TFieldName
    for (key in fields) {
      // console.log(`processing [${key}] => ${fields[key]}`)
      switch (fieldsParams[key][0] as TFieldParamsCode) {
        case 'LV':
        case 'EM':
          prepareLV_EM(
            key,
            fields[key],
            fieldsParams[key][1] as unknown as TFieldParamsSpecifics<'LV' | 'EM'>,
          )
          break

        default:
          simpleCopy(key)
      }
    }

    // Categorized optionsKeys
    ///////////////////////////

    const catFunc = getCategorizerFuncs()
    // if (catFunc === null) {
    //   return
    // }
    // console.log(`itemSetFieldsKeys() fields:${JSON.stringify(fields, null, 2)}`)
    const categorizerGroupOptionObj = catFunc(fields)
    // console.log(`categorizerFuncs() =>  ${JSON.stringify(categorizerGroupOptionObj, null, 2)}`)

    for (const groupLabel in categorizerGroupOptionObj) {
      const index = categorizerGroupOptionObj[groupLabel]!
      const group = getGroupFromLabel(groupLabel)
      // console.log(
      //   `fieldsDependentData.Pushed option ${getFullName(group!.optionKeys[index]!)} index(${index})`,
      // )

      optionsKeys.push(group!.optionKeys[index]!)
    }

    function prepareLV_EM(
      key: TFieldName,
      value: TFieldValue,
      f: TFieldParamsSpecifics<'LV' | 'EM'>,
    ) {
      const group = getGroupFromKey(groupLabelToGroupKeyObj.value[f.groupName]!) as TGroup<
        'LV' | 'EM'
      >
      // console.log(`prepareLV_EM() group: ${JSON.stringify(group, null, 2)}`)
      const optionKey = group.optionKeys[indexOfOptionOrThrow(group, value)]!
      optionsKeys.push(optionKey)
      partialFieldsDisplay[key] = getOptionFromKey(optionKey).text
    }

    function simpleCopy(key: keyof TFields) {
      // console.log(`simpleCopy() [${key}] => ${fields[key]}`)
      partialFieldsDisplay[key] = fields[key]
    }

    const fieldsDisplay = partialFieldsDisplay as TFieldsDisplay
    return { fieldsDisplay, optionsKeys }
  }

  function indexOfOptionOrThrow(group: TGroup<TCode>, val: TFieldValue) {
    // Debug - Start
    // const showOptions: Record<string, { extra: TFieldValue; text: string }> = {}
    // group.optionKeys.forEach((x) => {
    //   const op = getOptionFromKey(x)
    //   showOptions[x] = { extra: op.extra, text: op.text }
    // })

    // console.log(
    //   `${group.label}(${group.code}) fieldVal: ${val} opKeys: ${JSON.stringify(showOptions, null, 2)}`,
    // )
    // Debug - End

    const propertyToCompare = group.code === 'EM' ? 'text' : 'extra'
    const index = group.optionKeys.findIndex(
      // ** weak comparison because option.extra is either string, number or boolean
      (y) => getOptionFromKey(y)[propertyToCompare] == val,
    )

    if (index === -1) {
      const prompt = `indexOfOptionOrThrow() - Can't find value "${val}" in group: "${group.label}")`
      console.log(prompt)
      throw new Error(prompt)
    }
    return index
  }

  function optionClicked(prmKey: string) {
    const option = getOptionFromKey(prmKey)
    const group = getGroupFromKey(option.groupKey)

    const isSelected = selectedOptionKeysByRoute.value.includes(prmKey)
    console.log(`TRIO.click(${getFullName(prmKey)}[${isSelected ? '+' : '-'}])`)

    // Filter
    if (current.value.name === 'filter') {
      if (isSelected) {
        unSelectOption(prmKey)
      } else {
        selectOption(prmKey)
      }
      return
    }

    // Tagger
    switch (group.code) {
      case 'TG':
      case 'TM':
        {
          const g = typedGroup(group.code, group)
          if (g.multiple) {
            if (isSelected) {
              unSelectOption(prmKey)
            } else {
              selectOption(prmKey)
            }
          } else {
            if (isSelected) {
              unSelectOption(prmKey)
            } else {
              //if there is currently  a  selected one - unselect the currently selected and select the new one.
              //if there isn't, select the new one.
              const currentKey = selectedOptionKeysByRoute.value.find((x) => {
                return getGroupFromKey(getOptionFromKey(x).groupKey).label === group.label
              })
              if (currentKey !== undefined) {
                unSelectOption(currentKey)
                // Required, Single groups' "unselect" means set to default option[0], (in clearDependencies()) so here we corrct that.
                selectOption(prmKey)
              } else {
                console.log('No option currently selected - selecting clicked')
                selectOption(prmKey)
              }
            }
          }
        }
        break

      case 'LV':
      case 'EM':
        if (isSelected) {
          //do nothing
        } else {
          //unselect the currently selected and select the new one
          const currentKey = selectedOptionKeysByRoute.value.find((x) => {
            return getGroupFromKey(getOptionFromKey(x).groupKey).label === group.label
          })
          if (currentKey === undefined) {
            console.log(
              "Error in optionNewClicked - can't find a selected option in current group, wrong code",
            )
            return
          }
          // console.log(`newItemOptions(CL or LV).clicked select: ${prmKey}, unSelect: ${currentKey}`)
          if (currentKey !== prmKey) {
            unSelectOption(currentKey)
            selectOption(prmKey)
          }
        }
        break
      case 'ON':
        openOnpForm(prmKey, group.label, isSelected)
        break

      default:
        console.log('Error in optionNewClicked - wrong code')
    }
  }

  function selectOption(prmKey: string) {
    console.log(`selectOption(${getFullName(prmKey)})`)
    const tmp = [...selectedOptionKeysByRoute.value]
    tmp.push(prmKey)
    tmp.sort((a, b) => {
      return a > b ? 1 : -1
    })
    if (current.value.name === 'filter') {
      filterAllOptionKeys.value = tmp
    } else {
      taggerAllOptionKeys.value = tmp
    }
  }

  function unSelectOption(optionKey: string, setToDefault = false) {
    // console.log(`Unselect(${getFullName(optionKey)})`)
    const i = selectedOptionKeysByRoute.value.findIndex((y) => y === optionKey)
    if (i === -1) {
      console.log(`Option "${getFullName(optionKey)}" is NOT selected - ignore`)
      return
    }

    const option = getOptionFromKey(optionKey)
    const group = getGroupFromKey(option.groupKey)
    // For required, Single groups (LV & EM) if setToDefault is true, replace with default options[0] (='Unassigned')
    if (current.value.name === 'tag' && ['LV', 'EM'].includes(group.code) && setToDefault) {
      // console.log(`Unselect Required,Single option. Set to default(${getFullName(optionKey)})`)
      if (selectedOptionKeysByRoute.value[i] === group.optionKeys[0]!) {
        // If already the default - do nothing
        return
      } else {
        selectedOptionKeysByRoute.value[i] = group.optionKeys[0]!
      }
    } else {
      selectedOptionKeysByRoute.value.splice(i, 1)
    }
    // If 'ON', set value to null
    if (group.code === 'ON') {
      const onpOption = trio.value.optionsObj[optionKey] as TOption<'ON'>
      onpOption.value = null
    }
    // After unselecting, clear dependencies
    clearDependecies()
  }

  function clearDependecies() {
    // Debug - start
    // const selected = selectedOptionKeysByRoute.value.reduce((accumulator, groupKey) => {
    //   return accumulator + getFullName(groupKey) + ', '
    // }, '')
    // console.log(`Currently selected: ${selected}\n`)
    // Debug - end

    // (1) Iterate over selected optionKeys & collect groups that don't meet dependency conditions
    // Only certain group type may be dependent.
    // From those depependent, filter only those where dependency conditions are not met
    const possibleOptionsToUnselected = new Set<string>()

    selectedOptionKeysByRoute.value.forEach((x) => {
      const optionObj = getOptionFromKey(x)
      const group = getGroupFromKey(optionObj.groupKey!)

      if (
        ['TG', 'TM', 'LV', 'EM', 'ON'].includes(group.code) &&
        !dependencyConditionsMet(
          (<TGroup<'TG' | 'TM' | 'LV' | 'EM' | 'ON'>>group).dependency!,
          routeIsTagger.value ? taggerAllOptionKeys.value : filterAllOptionKeys.value,
        )
      )
        // Add all group's option to the possibleUnselect Set
        group.optionKeys.forEach((item) => possibleOptionsToUnselected.add(item))
    })

    // (2) Iterate over possibleUnselectsAsString, and for each, if selected, call unSelectOption()
    possibleOptionsToUnselected.forEach((x) => {
      if (selectedOptionKeysByRoute.value.includes(x)) {
        unSelectOption(x, true)
      }
    })
  }

  function getFullName(optionKey: string) {
    const option = getOptionFromKey(optionKey)
    const group = getGroupFromKey(option.groupKey)
    return `${group.label}:${option.text}`
  }

  // Tagger
  function taggerClearOptions(resetIndices = true) {
    if (resetIndices) {
      resetCategoryAndGroupIndices()
    }
    taggerAllOptionKeys.value = []
  }

  function filterClearOptions(resetIndices = true) {
    console.log(`trio.filterClearOptions`)
    if (resetIndices) {
      resetCategoryAndGroupIndices()
    }
    SearchTextClear()
    orderByClear()
    filterAllOptionKeys.value = []
  }

  ////// Order By //////////////
  const orderByGroup = computed(() => {
    return 'Order By' in groupLabelToGroupKeyObj.value
      ? (getGroupFromLabel('Order By') as TGroup<'OB'>)
      : undefined
  })

  const orderByOptions = computed(() => {
    return orderByGroup.value ? orderByGroup.value.orderByOptions : []
  })

  function orderByClear() {
    if (orderByGroup.value === undefined) {
      return
    }
    orderByGroup.value.optionKeys.forEach((x) => {
      trio.value.optionsObj[x]!.text = ''
      if (filterAllOptionKeys.value.includes(x)) {
        const i = filterAllOptionKeys.value.indexOf(x)
        filterAllOptionKeys.value.splice(i, 1)
      }
    })
  }

  ////// Textual Search Clear //////////////
  function SearchTextClear(currentGroupOnly: boolean = false) {
    if (currentGroupOnly) {
      // Clear relevant options' text, and remove from filterAllOptionKeys
      assert(
        currentGroup.value?.code === 'SF',
        `SearchTextClear of not a FieldSearch group "${currentGroup.value?.label}"`,
      )

      currentGroup.value.optionKeys.forEach((x) => {
        if (filterAllOptionKeys.value.includes(x)) {
          const i = filterAllOptionKeys.value.indexOf(x)
          filterAllOptionKeys.value.splice(i, 1)
        }
        trio.value.optionsObj[x]!.text = ''
        trio.value.optionsObj[x]!.extra = ''
      })
      return
    }

    // Clear only FieldSearch options' text. filterAllOptionKeys will be cleared by calling function filterClearOptions()
    for (const value of Object.values(groupLabelToGroupKeyObj.value)) {
      const group = getGroupFromKey(value)
      if (group.code === 'SF') {
        group.optionKeys.forEach((x) => {
          trio.value.optionsObj[x]!.text = ''
          trio.value.optionsObj[x]!.extra = ''
        })
      }
    }
  }

  function resetCategoryAndGroupIndices() {
    console.log(`resetCategoryAndGroupIndices`)
    selectorGroupIndex.value = 0
    selectorCategoryIndex.value = 0
  }

  function itemTagsToOptionsKeys(apiTags: TApiTag[]) {
    // console.log(`itemTagsToOptionsKeys() apiTags: ${JSON.stringify(apiTags, null, 2)}`)
    const tagOptionKey: string[] = []
    for (const x of apiTags) {
      const group = getGroupFromLabel(x.group_label)
      if (group === undefined) {
        console.log(`*** itemTagsToOptionsKeys() - Can't find group ${x.group_label} ***`)
        continue
      }
      // if (group.code === 'ON') {
      //   console.log(`itemTagsToOptionsKeys ON group ${group.label}`)
      // }
      // console.log(`Add Tag:  ${x.group_label} => "${x.tag_text}"`)
      const optionKey = group.optionKeys.find((y) => getOptionFromKey(y).text === x.tag_text)
      if (optionKey === undefined) {
        console.log(`*** Can't find tag ${x.tag_text} in group ${group.label} ***`)
        continue
      }
      tagOptionKey.push(optionKey)
      if (group.code === 'ON') {
        // const option = getOptionFromKey(optionKey) as TOption<'ON'>
        const option = trio.value.optionsObj[optionKey!] as TOption<'ON'>
        option.value = x.value!
        // console.log(`itemTagsToOptionsKeys setting ${x.group_label}:${x.tag_text}(${x.value})`)
      }
    }
    console.log(`itemTagsToOptionsKeys() - done`)
    return tagOptionKey
  }

  function getOptionsByGroupName(groupName: string) {
    if (!(groupName in groupLabelToGroupKeyObj.value)) {
      console.log(`**** Wrong group ("${groupName}") passed to getOptionsByGroupName() ****`)
      return []
    }
    const group = getGroupFromLabel(groupName)
    return group.optionKeys.map((x) => {
      const option = getOptionFromKey(x)
      return { label: option.text, val: option.extra }
    })
  }

  function getOptionsKeysByGroupName(groupName: string) {
    if (!(groupName in groupLabelToGroupKeyObj.value)) {
      console.log(`**** Wrong group ("${groupName}") passed to getOptionsKeysByGroupName() ****`)
      return []
    }
    return getGroupFromLabel(groupName).optionKeys
  }

  function getLabelFromOptionKey(optionKey: string, keySource: 'Filter' | 'Item' | 'Dependency') {
    // console.log(`getLabelFromOptionKey(option: ${optionKey}, keysource: ${keySource}) ****`)
    const option = getOptionFromKey(optionKey)
    const group = getGroupFromKey(option.groupKey)
    switch (group.code) {
      case 'TG':
      case 'TM':
      case 'LV':
      case 'EM':
      case 'CT':
      case 'MD':
      case 'SF':
      case 'OB':
        return option.text
      case 'ON': {
        const optionON = <TOption<'ON'>>option
        return keySource === 'Filter'
          ? option.text
          : keySource === 'Item'
            ? `${option.text}${optionON.value === null ? '' : `: ${shiftedNumericLabel(optionON.value, optionON.shift)} ${optionON.unitLabel}`}`
            : `${group.label}:${option.text}`
      }
      default:
        return ''
    }
  }

  return {
    // general
    getGroupFromKey,
    getOptionFromKey,
    getOptionsByGroupName,
    getOptionsKeysByGroupName,
    fieldsDependentData,
    groupDependencyText,

    // Display selected
    displayedSelectedItem,
    displayedSelectedFilter,
    displayedSelectedTagger,

    // Item tags
    itemAllOptionKeys,
    itemTagsToOptionsKeys,
    itemSetAllOptionsKeys,
    itemOnps,
    allPossibleOnpOptionKeys,

    // Selector
    selectorCategoryIndex,
    selectorGroupIndex,
    selectorCategoryTabs,
    selectorGroupTabs,
    selectorOptions,
    currentGroup,

    // Selector "tag" actions (all except text search & order by)
    optionClicked,
    resetCategoryAndGroupIndices,

    // Filter
    filterAllOptionKeys,
    orderByOptions,
    orderByGroup,
    orderByClear,
    filterClearOptions,
    SearchTextClear,

    // Tagger
    taggerAllOptionKeys,
    copyItemOptionsToTagger,
    taggerClearOptions,

    // Trio setup and data structures
    trio,
    groupLabels,
    getGroupFromLabel,
    clearTrio,
    setTrio,

    // Debug
    DebugItemOptions,
    DebugNewItemOptions,
  }
})
