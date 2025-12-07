import { ref } from 'vue'
import { defineStore, storeToRefs } from 'pinia'
import type { TOption } from '../../../types/trioTypes'
import { useTrioStore } from './trio'
import { shiftedNumericLabel } from '@/scripts/utils/utils'

export const useTrioOnpStore = defineStore('trioOnp', () => {
  const optKey = ref<string | null>(null)
  const option = ref<TOption<'ON'> | null>(null)
  const currentValue = ref<number | null>(null)
  const localIsCurrentlySelected = ref<boolean>(false)
  const onpFormData = ref({
    isOpen: false,
    currentValue: 0,
    grpLabel: '',
    optionName: '',
    unitLabel: '',
    min: 0,
    max: 0,
    shift: 0,
    onpValue: null as null | number,
  })

  // function displayedValue(savedValue: number) {
  //   return savedValue / Math.pow(10, onpFormData.value.shift)
  // }

  function openOnpForm(optionKey: string, groupLabel: string, isCurrentlySelected: boolean) {
    const { trio } = storeToRefs(useTrioStore())
    option.value = trio.value.optionsObj[optionKey!] as TOption<'ON'>
    optKey.value = optionKey

    currentValue.value = option.value.value
    localIsCurrentlySelected.value = isCurrentlySelected

    onpFormData.value.grpLabel = groupLabel
    onpFormData.value.optionName = option.value!.label
    onpFormData.value.unitLabel = option.value!.unitLabel
    onpFormData.value.min = shiftedNumericLabel(option.value!.min, option.value.shift)!
    onpFormData.value.max = shiftedNumericLabel(option.value!.max, option.value.shift)!
    onpFormData.value.shift = option.value!.shift
    onpFormData.value.onpValue = option.value
      ? shiftedNumericLabel(option.value!.value as number, option.value.shift)
      : null
    onpFormData.value.isOpen = true
    // console.log(
    //   `TrioOnp.isOpen() option: ${JSON.stringify(option.value, null, 2)};\nonpFormData: ${JSON.stringify(onpFormData.value, null, 2)}`,
    // )
  }

  function close() {
    const { taggerAllOptionKeys } = storeToRefs(useTrioStore())
    // console.log(`close: ${JSON.stringify(option.value, null, 2)}`)
    if (onpFormData.value.onpValue === null) {
      option.value!.text = option.value!.label
      option.value!.value = null

      //If the onp was selected, remove onpKey from taggerAllOptionKeys
      if (localIsCurrentlySelected.value) {
        const index = taggerAllOptionKeys.value.findIndex((item) => item === optKey.value)
        if (index !== -1) {
          taggerAllOptionKeys.value.splice(index, 1)
        } else {
          console.log(`trioOnp *** Failed to remove onps`)
        }
      }
    } else {
      // If currently selected we remove onpKey from taggerOptionKeys and re-select to trigger the reactivity system
      // If currently not selected, we only select (add onpKey to taggerOptionKeys).
      option.value!.value = onpFormData.value.onpValue * Math.pow(10, onpFormData.value.shift)
      option.value!.text = option.value!.label //+ ': ' + option.value!.value

      if (localIsCurrentlySelected.value) {
        const index = taggerAllOptionKeys.value.findIndex((item) => item === optKey.value)
        if (index !== -1) {
          taggerAllOptionKeys.value.splice(index, 1)
        } else {
          console.log(`trioOnp *** Failed to remove onps`)
        }
      }
      selectOnp(optKey.value!)
    }

    onpFormData.value.isOpen = false
    optKey.value = null
  }

  function selectOnp(onpKey: string) {
    const { taggerAllOptionKeys } = storeToRefs(useTrioStore())
    const tmp = [...taggerAllOptionKeys.value]
    tmp.push(onpKey)
    tmp.sort((a, b) => {
      return a > b ? 1 : -1
    })
    taggerAllOptionKeys.value = tmp
  }
  return {
    onpFormData,
    openOnpForm,
    close,
  }
})
