import { ref, computed, type Ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type {
  TId,
  TFields,
  TFieldName,
  TFieldsNew,
  TModule,
  TFieldParamsCode,
  TFieldParamsSpecifics,
  TFieldValue,
} from '@/types/moduleTypes'

import { useCollectionsStore } from './collections/collections'
import { useElementAndCollectionStore } from './collections/elementAndCollection'
import { useRoutesMainStore } from './routes/routesMain'
import { useXhrStore } from './xhr'
import { useModuleStore } from './module'
import { useItemStore } from './item'
import { makeDate, makeUnixDateNumber } from '../../scripts/utils/utils'
import {
  requiredIf,
  minLength,
  maxLength,
  between,
  minValue,
  maxValue,
} from '@vuelidate/validators'

export const useItemNewStore = defineStore('itemNew', () => {
  const { current } = storeToRefs(useRoutesMainStore())
  const { changeCount } = useModuleStore()
  const { module, fieldsParams } = storeToRefs(useModuleStore())
  const { send } = useXhrStore()
  const { setIndexByElement } = useElementAndCollectionStore()
  const { getCollectionArray } = useCollectionsStore()

  const { fields } = storeToRefs(useItemStore())
  const currentIds = ref<string[]>([])
  const tag = ref<string | undefined>(undefined)
  const ready = ref<boolean>(false)
  const openIdSelectorModal = ref<boolean>(false)
  const array = getCollectionArray('main')

  const fieldsNew = ref<Partial<Record<keyof TFields, TFieldValue>>>({})
  const fieldsNewRules = ref<Record<string, object>>({})

  const mainArray = computed(() => {
    return array as TId[]
  })

  const isCreate = computed(() => {
    return current.value.name === 'create'
  })

  const isUpdate = computed(() => {
    return current.value.name === 'update'
  })

  function prepareFieldsNew() {
    fieldsNew.value = {}
    fieldsNewRules.value = {}

    let key: TFieldName
    for (key in fields.value) {
      if (key === 'id') {
        prepareID(fieldsParams.value!['id'][1] as TFieldParamsSpecifics<'INT'>)
        continue
      }

      switch (fieldsParams.value![key][0] as TFieldParamsCode) {
        case 'INT':
          prepareNUM(key, fieldsParams.value![key][1] as TFieldParamsSpecifics<'INT'>)
          break

        case 'STR':
          prepareSTR(key, fieldsParams.value![key][1] as TFieldParamsSpecifics<'STR'>)
          break

        case 'DAT':
          prepareDAT(key, fieldsParams.value![key][1] as unknown as TFieldParamsSpecifics<'DAT'>)
          break

        case 'EM':
          prepareEM(key, fieldsParams.value![key][1] as unknown as TFieldParamsSpecifics<'EM'>)
          break

        case 'LV':
          prepareLV(key, fieldsParams.value![key][1] as unknown as TFieldParamsSpecifics<'LV'>)
          break

        case 'RT':
          prepareRT(key, fieldsParams.value![key][1] as unknown as TFieldParamsSpecifics<'RT'>)
          break
      }
    }

    function prepareID(f: TFieldParamsSpecifics<'INT'>) {
      // console.log(`prepareID() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value.id = isCreate.value ? f.default : fields.value!.id
      fieldsNewRules.value['id'] = {
        minLength: minLength(f.min),
        maxLength: maxLength(f.max),
        required: requiredIf(
          !isCreate.value || (isCreate.value && typeof fields.value?.id === 'string'),
        ),
      }
    }

    function prepareNUM(key: TFieldName, f: TFieldParamsSpecifics<'INT'>) {
      // console.log(`prepareNum() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value ? f.default : fields.value![key]
      fieldsNewRules.value[key] = {
        between: between(f.min, f.max),
        required: requiredIf(!f.nullable),
      }
    }

    function prepareSTR(key: TFieldName, f: TFieldParamsSpecifics<'STR'>) {
      // console.log(`prepareStr() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value ? f.default : fields.value![key]
      fieldsNewRules.value[key] = {
        minLength: minLength(f.min),
        maxLength: maxLength(f.max),
        required: requiredIf(!f.nullable),
      }
    }

    function prepareDAT(key: TFieldName, f: TFieldParamsSpecifics<'DAT'>) {
      // console.log(`prepareDAT() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value
        ? f.default === 'Today'
          ? new Date()
          : null
        : fields.value![key]
          ? makeDate(fields.value![key])
          : null

      if (f.min === undefined && f.max === undefined) {
        fieldsNewRules.value[key] = { required: requiredIf(!f.nullable) }
        return
      }

      if (f.min !== undefined && f.max !== undefined) {
        fieldsNewRules.value[key] = {
          required: requiredIf(!f.nullable),
          min: minValue(makeUnixDateNumber(f.min!)),
          max: maxValue(makeUnixDateNumber(f.max!)),
        }
        return
      }
      if (f.min !== undefined) {
        fieldsNewRules.value[key] = {
          required: requiredIf(!f.nullable),
          min: minValue(makeUnixDateNumber(f.min!)),
        }
      } else {
        fieldsNewRules.value[key] = {
          required: requiredIf(!f.nullable),
          max: maxValue(makeUnixDateNumber(f.min!)),
        }
      }
    }

    function prepareEM(key: TFieldName, f: TFieldParamsSpecifics<'EM'>) {
      // console.log(`prepareEM() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value ? f.default : fields.value![key]
      fieldsNewRules.value[key] = {}
    }

    function prepareLV(key: TFieldName, f: TFieldParamsSpecifics<'LV'>) {
      // console.log(`prepareLV() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value ? 1 : fields.value![key]
      fieldsNewRules.value[key] = {}
    }

    function prepareRT(key: TFieldName, f: TFieldParamsSpecifics<'RT'>) {
      // console.log(`prepareRT() name: ${key}, params: ${JSON.stringify(f, null, 2)}`)
      fieldsNew.value[key] = isCreate.value ? 1 : fields.value![key]
      fieldsNewRules.value[key] = {}
    }
  }

  async function upload(
    isCreate: boolean,
    newFields: Partial<TFields>,
  ): Promise<{ success: true; id: TId; tag: string } | { success: false; message: string }> {
    console.log(
      `item.upload isCreate: ${isCreate}, module: ${module.value}, fields: ${JSON.stringify(newFields, null, 2)}`,
    )

    const res = await send<{ id: TId; tag: string }>('module/store', isCreate ? 'post' : 'put', {
      module: module.value,
      data: {
        fields: newFields,
      },
    })

    if (!res.success) {
      return res
    }

    if (isCreate) {
      // Update count and push the newly created id into the 'main' collection.
      // Caller component CreateUpdate will routerPush() to this id.
      changeCount('items', 1)
      mainArray.value.push(res.data.id)
      setIndexByElement('Show', 'main', res.data.id)
    }

    return { success: true, id: res.data.id, tag: res.data.tag }
  }

  function itemNewClear() {
    tag.value = undefined
  }

  // eslint-disable-next-line
  function typedFieldsNew<M extends TModule>(module: M) {
    return fieldsNew as Ref<TFieldsNew<M>>
  }

  return {
    currentIds,
    typedFieldsNew,
    fieldsNew,
    fieldsNewRules,
    tag,
    ready,
    isCreate,
    isUpdate,
    openIdSelectorModal,
    itemNewClear,
    upload,
    prepareFieldsNew,
  }
})
