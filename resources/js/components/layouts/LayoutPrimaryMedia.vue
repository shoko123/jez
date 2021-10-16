<template>
  <v-container fluid v-if="isReady">
    <v-card>
      <v-card-title class="grey py-0 mb-4"
        >Description and Primary Media View
        <v-spacer />
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-card width="80%">
            <MediaPrimary />
          </v-card>

          <v-card width="20%" class="purple lighten-3">
            <v-card-title class="ma-2 text--body-1 bold">
              {{ item.tag }}</v-card-title
            >
            <v-card-text>
              <v-row v-if="!item.hasMedia">[No media]</v-row>
              <v-row v-if="!item.description">[No description]</v-row>
              <v-row class="text-body-1"> {{ item.description }}</v-row>
            </v-card-text>
          </v-card>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import MediaPrimary from "../media/MediaPrimary";
export default {
  components: {
    MediaPrimary,
  },

  computed: {
    isReady() {
      return this.$store.getters["mgr/ready"].item;
    }, 
    item() {
      return this.$store.getters["mgr/item"];
    },

    header() {
      return this.lightBox.header;
    },
  },
  
};
</script>
