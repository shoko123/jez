<template>
  <v-card class="elevation-12">
    <v-card-title class="bg-grey text-black py-0 mb-4">
      {{ header }}
    </v-card-title>
    <v-card-text>
      <div class="mb-2">
        <v-btn @click="submit"> Submit </v-btn>
        <v-btn class="ml-2" @click="cancel"> Cancel </v-btn>
        <v-btn class="ml-2" @click="resetToItem"> Reset To Item </v-btn>
        <v-btn class="ml-2" @click="reset"> Reset </v-btn>
      </div>
      <v-tabs v-model="catIndex" class="primary">
        <v-tab v-for="(cat, index) in selectorCategoryTabs" :key="index">
          {{ cat.selectedCount > 0 ? `${cat.catName}(*)` : cat.catName }}
        </v-tab>
      </v-tabs>

      <v-tabs v-model="grpIndex">
        <v-tab v-for="(group, index) in selectorGroupTabs" :key="index" :class="'text-capitalize'">
          {{ group.selectedCount === 0 ? group.name : `${group.name}(${group.selectedCount})` }}
        </v-tab>
      </v-tabs>
      <GroupTagger />
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useTaggerStore } from '../../scripts/stores/trio/tagger'
import { useRoutesMainStore } from '../../scripts/stores/routes/routesMain'
import { useNotificationsStore } from '../../scripts/stores/notifications'
import { useTrioStore } from '../../scripts/stores/trio/trio'
import GroupTagger from './GroupTagger.vue'

const { routerPush } = useRoutesMainStore()
const { selectorCategoryTabs, selectorGroupTabs, selectorCategoryIndex, selectorGroupIndex } =
  storeToRefs(useTrioStore())
const { resetCategoryAndGroupIndices, optionClicked, taggerClearOptions } = useTrioStore()
const { sync, taggerCopyItemOptionsToTagger, taggerSetDefaultOptions } = useTaggerStore()
const { showSpinner, showSnackbar } = useNotificationsStore()

const header = computed(() => {
  return 'Item Tagger'
})

const catIndex = computed({
  get: () => {
    return selectorCategoryIndex.value
  },
  set: (val) => {
    // console.log(`selectorCategoryIndex set to ${val}`)
    selectorGroupIndex.value = 0
    selectorCategoryIndex.value = val
  },
})

const grpIndex = computed({
  get: () => {
    return selectorGroupIndex.value
  },
  set: (val) => {
    // console.log(`selectorGroupIndex set to ${val}`)
    selectorGroupIndex.value = val
  },
})

async function submit() {
  showSpinner('Syncing tags...')
  const res = await sync()
  showSpinner(false)

  if (res.success) {
    taggerClearOptions()
    await routerPush('back1')
  } else {
    showSnackbar(`Syncing of tags failed. Error: ${res.message}`)
  }
}

async function cancel() {
  console.log(`cancelClicked`)
  taggerClearOptions()
  await routerPush('back1')
}

function resetToItem() {
  console.log(`resetToItem`)
  resetCategoryAndGroupIndices()
  taggerCopyItemOptionsToTagger()
}

function reset() {
  resetCategoryAndGroupIndices()
  taggerSetDefaultOptions()
}
</script>
