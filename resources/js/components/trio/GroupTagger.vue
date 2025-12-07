<template>
  <onp-form />
  <v-sheet elevation="10" class="mt-2 pa-4">
    <div>{{ groupHeader }}</div>
    <v-chip-group v-model="selectedOptions" multiple column active-class="primary">
      <v-chip v-for="(option, index) in selectorOptions" :key="index" color="blue" large
        @click="optionClicked(option.key)">
        {{ option.optionLabelForTagger }}
      </v-chip>
    </v-chip-group>
  </v-sheet>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTrioStore } from '../../scripts/stores/trio/trio'
import OnpForm from '@/components/trio/OnpForm.vue'

const { selectorGroupTabs, selectorOptions, selectorGroupIndex } = storeToRefs(useTrioStore())
const { optionClicked, groupDependencyText } = useTrioStore()

const groupHeader = computed(() => {
  let groupDetails = selectorGroupTabs.value[grpIndex.value]!
  return `${groupDetails.required ? 'R' : 'Not r'}equired,  ${groupDetails.multiple ? 'multiple' : 'single'} selection, ${groupDependencyText(groupDetails.groupKey)}`
})

const grpIndex = computed(() => {
  return selectorGroupIndex.value
})

// v-chip-group requires two way bind with v-model which requires a get/set
const selectedOptions = computed({
  get: () => {
    let selected: number[] = []
    selectorOptions.value?.forEach((x, index) => {
      if (x.selected === true) {
        selected.push(index)
      }
    })
    return selected
  },
  // eslint-disable-next-line 
  set: (val) => { },
})

</script>