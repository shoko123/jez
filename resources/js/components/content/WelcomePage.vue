<template>
  <v-img style="height: 95vh" :src="bgUrls.fullUrl" :lazy-src="bgUrls.tnUrl" cover>
    <v-card :width="`${overlayWidth}%`" height="100%" flat color="rgb(255, 0, 0, 0)"
      style="background-color: rgba(92, 19, 19, 0.4) !important;">
      <v-card-title class="title text-white text-h4"> {{ module }} Module </v-card-title>
      <v-card-text class="text-white text-h5">
        <v-container fluid>
          <v-row class="mb-4 mt-4"> Record Count: {{ counts.items }} </v-row>
          <v-row class="mb-4"> Media Count: {{ counts.media }} </v-row>
          <v-row>
            <v-textarea v-model="welcomeText" auto-grow class="font-weight-bold" />
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </v-img>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'
import { useModuleStore } from '../../scripts/stores/module'
import { useMainStore } from '../../scripts/stores/main'
const { smAndDown } = useDisplay()
const { counts, welcomeText, module } = storeToRefs(useModuleStore())
const { bucketUrl } = storeToRefs(useMainStore())

const overlayWidth = computed(() => {
  return smAndDown.value ? 100 : 30
})

const bgUrls = computed(() => {
  return {
    fullUrl: `${bucketUrl.value}app/background/${module.value}_Background.jpg`,
    tnUrl: `${bucketUrl.value}app/background/${module.value}_Background-tn.jpg`,
  }
})

</script>
