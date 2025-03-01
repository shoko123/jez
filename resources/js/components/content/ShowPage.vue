<template>
  <v-container fluid>
    <div v-if="itemView === 'Form'">
      <ShowItemView :all="false" />
    </div>
    <div v-else-if="itemView === 'All'">
      <ShowItemView :all="true" />
    </div>
    <div v-else-if="itemView === 'Media'">
      <ShowMediaView />
    </div>
    <div v-else-if="itemView === 'Related'">
      <ShowRelatedView />
    </div>
  </v-container>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'

import { useModuleStore } from '../../scripts/stores/module'
import ShowItemView from '../item/layouts/ShowItemView.vue'
import ShowMediaView from '../item/layouts/ShowMediaView.vue'
import ShowRelatedView from '../item/layouts/ShowRelatedView.vue'

const { itemView } = storeToRefs(useModuleStore())

</script>
