<template>
  <v-card outlined>
    <v-card-title class="bg-grey-lighten-3 text-black title mb-2"> Location </v-card-title>

    <v-card class="ma-2 pa-2">
      {{ locationText }}
    </v-card>

    <v-card class="ma-2 pa-2">
      <v-img :src="bgUrls.fullUrl" :lazy-src="bgUrls.tnUrl" :cover="true">
      </v-img>
    </v-card>

    <v-card v-if="isProduction" class="ma-2 pa-2">
      <GoogleMap :api-key="mapInfo.apiKey" style="width: 100%; height: 700px" :zoom="mapInfo.zoom"
        :center="mapInfo.center" :map-type-id="mapInfo.mapTypeId" :street-view-control="mapInfo.streetViewControl"
        :map-id="mapInfo.mapId">
        <AdvancedMarker :options="{ position: mapInfo.center }" />
      </GoogleMap>
    </v-card>
  </v-card>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useLandingStore } from '../../scripts/stores/landing'
import { storeToRefs } from 'pinia'
import { GoogleMap, AdvancedMarker } from 'vue3-google-map'
import { useAppStore } from '../../scripts/stores/app'

const { configs } = storeToRefs(useAppStore())
const { locationText } = useLandingStore()


const isProduction = import.meta.env.PROD

const bgUrls = computed(() => {
  return {
    fullUrl: `${configs.value.bucketUrl}app/about/Location.jpg`,
    tnUrl: `${configs.value.bucketUrl}app/about/Location-tn.jpg`,
  }
})

const mapInfo = computed(() => {
  return {
    apiKey: configs.value.googleMapsApiKey,
    mapId: 'jez_map_id',
    center: { lat: 32.55864, lng: 35.33668 },
    mapTypeId: "satellite",
    streetViewControl: false,
    zoom: 17
  }
})

</script>
