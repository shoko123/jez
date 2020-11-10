<template>
  <div>
    <SubMenuAbout />

    <v-container fluid>
      <v-row wrap no-gutters>
      <v-card class="elevation-12">
        <v-card-title class="grey py-0 mb-2">Topographic map of Jezreel Valley, Israel</v-card-title>
        <v-card-text>
          <!--v-img
      id="img"
      :src="imageUrls.fullUrl"
      :lazy-src="imageUrls.tnUrl"
      :cover="true"
    -->
        </v-card-text>
      </v-card>
      </v-row>
      <v-row wrap no-gutters>
      <v-card class="elevation-12">
        <v-card-title class="grey py-0 mb-2">Zoom in to Tel-Jezreel and Ein-Jezreel Area</v-card-title>
        <v-card-text>
          <!--v-img
      id="img"
      :src="imageUrls.fullUrl"
      :lazy-src="imageUrls.tnUrl"
      :cover="true"
    -->
        </v-card-text>
      </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import SubMenuAbout from "../menus/SubMenuAbout";

export default {
  components: {
    SubMenuAbout,
  },

  computed: {
    mapsBaseUrl() {
      return "";
    },
  },
};
</script>