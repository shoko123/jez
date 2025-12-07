<template>
  <v-card class="elevation-12">
    <v-card-title class="bg-grey text-black py-0 mb-4">
      {{ title }}
    </v-card-title>
    <v-card-text>
      <v-container fluid>
        <div v-if="hasMedia">
          <v-row no-gutters>
            <v-col :cols="widths[0]">
              <component :is="itemForm" />
            </v-col>
            <v-col :cols="widths[1]">
              <v-container fill-height fluid>
                <v-row>
                  <v-col>
                    <MediaSquare v-bind="{ source: 'media', itemIndex: 0, }" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </div>
        <div v-else>
          <v-row dense>
            <component :is="itemForm" />
          </v-row>
        </div>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script lang="ts" setup>
import { type Component, ref, computed, markRaw, defineAsyncComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import type { TModule } from '@/types/moduleTypes'
import { useModuleStore } from '../../../scripts/stores/module'
import { useItemStore } from '../../../scripts/stores/item'
import { useCollectionsStore } from '../../../scripts/stores/collections/collections'
import MediaSquare from '../../media/MediaSquare.vue'

const { module, moduleToUrlModuleName } = storeToRefs(useModuleStore())
const { smAndDown } = useDisplay()
let { getCollectionInfo } = useCollectionsStore()
let { derived } = storeToRefs(useItemStore())

const ModuleFormObj = ref<Partial<Record<TModule, Component>>>({})

// The Vue compiler needs to statically know where the components are located.
for (let key in moduleToUrlModuleName.value) {
  ModuleFormObj.value[key as TModule] = markRaw(defineAsyncComponent(() => import(`../../modules/${module.value}/${module.value}Form.vue`))
  )
}

const itemForm = computed<Component>(() => {
  return ModuleFormObj.value[module.value]!
})
const title = computed(() => {
  return `${derived.value.moduleAndTag} - Details`
})

const hasMedia = computed(() => {
  return getCollectionInfo('media').arrayLength > 0
})

const widths = computed(() => {
  return smAndDown.value ? [12, 12] : [9, 3]
})
</script>
