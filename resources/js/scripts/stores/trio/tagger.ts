import { defineStore, storeToRefs } from 'pinia'
import type {
  TFields,
  TFieldName,
  TFieldValue,
  TFieldParamsCode,
  TFieldParamsSpecifics,
} from '@/types/moduleTypes'
import { TGroup, TOption } from '@/types/trioTypes'
import { useXhrStore } from '../xhr'
import { useItemStore } from '../item'
import { useModuleStore } from '../module'
import { useTrioStore } from './trio'

export const useTaggerStore = defineStore('tagger', () => {
  const { fields } = storeToRefs(useItemStore())
  const { send } = useXhrStore()
  const { module, fieldsParams } = storeToRefs(useModuleStore())
  const { getGroupFromKey, getOptionFromKey, getOptionsKeysByGroupName, copyItemOptionsToTagger } =
    useTrioStore()
  const { taggerAllOptionKeys } = storeToRefs(useTrioStore())

  function taggerCopyItemOptionsToTagger() {
    copyItemOptionsToTagger()
  }

  // Clear all optional tags, reset all LVs & EMs to defaults
  function taggerSetDefaultOptions() {
    taggerAllOptionKeys.value = []

    let key: TFieldName
    for (key in fieldsParams.value) {
      switch (fieldsParams.value![key][0] as TFieldParamsCode) {
        case 'LV':
        case 'EM':
          {
            const fieldParams = fieldsParams.value![key][1] as unknown as TFieldParamsSpecifics<
              'LV' | 'EM'
            >
            const optionKeys = getOptionsKeysByGroupName(fieldParams.groupName)
            taggerAllOptionKeys.value.push(optionKeys[0]!)
          }
          break
        default:
          break
      }
    }
  }

  function taggerConvertSelectedToApi() {
    const optionsParams = {
      global_tag_ids: <number[]>[],
      module_tag_ids: <number[]>[],
      onps: <{ id: number; val: number }[]>[],
      fields: <{ field_name: string; val: TFieldValue }[]>[],
    }

    taggerAllOptionKeys.value.forEach((optionKey) => {
      const option = getOptionFromKey(optionKey)
      const group = getGroupFromKey(option.groupKey)
      switch (group.code) {
        case 'TG':
          optionsParams.global_tag_ids.push(<number>option.extra)
          break

        case 'TM':
          optionsParams.module_tag_ids.push(<number>option.extra)
          break
        case 'ON':
          {
            const onpOption = option as TOption<'ON'>
            optionsParams.onps.push({ id: onpOption.id, val: onpOption.value! })
          }
          break
        case 'LV':
        case 'EM':
          {
            if ((<TGroup<'LV' | 'EM'>>group).useInTagger) {
              optionsParams.fields.push({
                field_name: (<TGroup<'LV' | 'EM'>>group).field_name!,
                val: group.code === 'LV' ? option.extra : option.text,
              })
            }
          }
          break
      }
    })
    // console.log(`taggerConvertSelectedToApi: ${JSON.stringify(optionsParams, null, 2)}`)
    return optionsParams
  }
  async function sync() {
    const payload = {
      module: module.value,
      module_id: (<TFields>fields.value).id,
      ...taggerConvertSelectedToApi(),
    }

    //console.log(`tagger.toSend: ${JSON.stringify(payload, null, 2)}`)
    const res = await send<boolean>('tags/sync', 'post', payload)

    if (res.success) {
      return { success: true }
    }
    return { success: false, message: res.message }
  }

  return {
    sync,
    taggerCopyItemOptionsToTagger,
    taggerSetDefaultOptions,
  }
})
