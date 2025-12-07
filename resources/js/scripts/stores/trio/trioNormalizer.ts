import { storeToRefs } from 'pinia'
import { useAppStore } from '../app'
import { copyProperties } from '../../utils/utils'

import type {
  TApiTrio,
  TTrioOptionBare,
  TTrioGroupBare,
  TOptionObj,
  TGroupObj,
  TCategoriesArray,
  TGroupOrFieldToKeyObj,
  TApiGroup,
  TApiToTrioConvertersObj,
  TCode,
} from '@/types/trioTypes'

const converters: Partial<TApiToTrioConvertersObj> = {
  EM: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return { text: x.label, extra: x.label }
      }),
    ]
  },
  LV: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return { text: x.label, extra: x.id }
      }),
    ]
  },
  CT: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return { text: x.label, extra: x.index }
      }),
    ]
  },
  SF: function (apiGroup) {
    return [copyProperties(apiGroup, ['options'], {}), Array(6).fill({ text: '', extra: null })]
  },
  TG: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return { text: x.label, extra: x.tag_id }
      }),
    ]
  },
  TM: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return { text: x.label, extra: x.tag_id }
      }),
    ]
  },
  ON: function (apiGroup) {
    return [
      copyProperties(apiGroup, ['options'], {}),
      apiGroup.options.map((x) => {
        return {
          id: x.onp_id,
          text: x.label,
          extra: x.onp_id,
          label: x.label,
          unitLabel: x.unit_label,
          value: null,
          shift: x.shift,
          min: x.min,
          max: x.max,
        }
      }),
    ]
  },
  MD: function (apiGroup) {
    const { configs } = storeToRefs(useAppStore())
    return [
      copyProperties(apiGroup, ['options'], {}),
      configs.value.mediaCollectionNames!.map((x) => {
        return { text: x, extra: '' }
      }),
    ]
  },
  OB: function (apiGroup) {
    const apiOptions = [...apiGroup.options]

    return [
      copyProperties(apiGroup, ['options'], { orderByOptions: apiOptions }),
      Array(apiOptions.length).fill({
        text: '',
        extra: null,
      }),
    ]
  },
}

let categories: TCategoriesArray = []
let groupsObj: TGroupObj = {}
let optionsObj: TOptionObj = {}
let groupLabelToGroupKeyObj: TGroupOrFieldToKeyObj = {}
let catCnt = 0,
  grpCnt = 0,
  optionCnt = 0

function clear() {
  categories = []
  groupsObj = {}
  optionsObj = {}
  groupLabelToGroupKeyObj = {}
  catCnt = 0
  grpCnt = 0
  optionCnt = 0
}

export function normalizeTrio(apiTrio: TApiTrio) {
  // console.log(`normalizeTrio(api): ${JSON.stringify(apiTrio, null, 2)}`)

  clear()
  apiTrio.forEach((cat) => {
    // console.log(`Cat: ${cat.name}`)
    categories.push({ name: cat.name, groupKeys: [] })
    cat.groups.forEach((grp) => {
      // console.log(`Group: ${grp.label}`)
      categories[catCnt]!.groupKeys.push(pad(grpCnt, 3))
      const converterFunc = converters[grp.code]! as (
        apiGroup: TApiGroup,
      ) => [group: TTrioGroupBare<TCode>, options: TTrioOptionBare[]]

      const [group, options] = converterFunc(grp)
      addGroupAndOptions(group, options)
      grpCnt++
    })
    catCnt++
  })
  return {
    trio: { categories, groupsObj, optionsObj },
    groupLabelToGroupKeyObj,
  }
}

function addGroupAndOptions<C extends TCode>(
  grpBare: TTrioGroupBare<C>,
  options: TTrioOptionBare<C>[],
) {
  // console.log(
  //   `addGroupAndOptions(start) grpBare: ${JSON.stringify(grpBare, null, 2)}\noptions: ${JSON.stringify(options, null, 2)}`,
  // )

  const grpToSave = {
    ...grpBare,
    // covert dependency, if exists.
    ...('dependency' in grpBare &&
    (<TTrioGroupBare<'EM' | 'LV' | 'TG' | 'TM' | 'ON'>>grpBare).dependency.length > 0
      ? {
          dependency: processDependency(
            (<TTrioGroupBare<'EM' | 'LV' | 'TG' | 'TM' | 'ON'>>grpBare).dependency,
          ),
        }
      : {}),
    optionKeys: <string[]>[],
    selectorCategoryIndex: catCnt,
  }

  options.forEach((p) => {
    const optionKey = pad(optionCnt, 3)
    grpToSave.optionKeys.push(optionKey)
    optionsObj[optionKey] = { ...p, groupKey: pad(grpCnt, 3) }
    optionCnt++
  })

  groupsObj[pad(grpCnt, 3)] = grpToSave
  groupLabelToGroupKeyObj[grpToSave.label] = pad(grpCnt, 3)
}

function pad(num: number, size: number): string {
  let s = num + ''
  while (s.length < size) s = '0' + s
  return s
}

function processDependency(dependency: string[][]) {
  // console.log(`processDependency() ${dependency}`)
  return dependency.map((x) => {
    return processDependencyOrArray(x)
  })
}

function processDependencyOrArray(dependencyOrArray: string[]) {
  return dependencyOrArray.map((x) => {
    const pieces = x.split(':')
    if (groupLabelToGroupKeyObj[pieces[0]!] === undefined) {
      throw `TrioNormalizer: Undefined group "${pieces[0]}"`
    }
    const group = groupsObj[groupLabelToGroupKeyObj[pieces[0]!]!]!
    const res = group.optionKeys.find((x) => optionsObj[x]!.text === pieces[1])
    if (res === undefined) {
      throw `TrioNormalizer: Undefined dependency: ${x}`
    }
    return res
  })
}
