<template>
  <v-container fluid>
    <v-card class="elevation-12 mx-auto" max-width="60%">
      <v-img :src="imageUrl" :cover="true">
        <v-card-title class="grey py-0 mb-4">Welcome to {{status.itemName}}</v-card-title>
        <v-row wrap dense>
          <v-card-text class="title">
            <slot name="body">
              <template v-if="moduleDetails">
                Number of items: {{moduleDetails.itemCount}}
                Number of images: {{moduleDetails.imageCount}}
              </template>
            </slot>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="goToQuery">query collection</v-btn>
            <v-btn @click="showAll">show all</v-btn>
            <v-btn @click="goToItem">explore</v-btn>
            <slot name="itemButtons"></slot>
          </v-card-actions>
        </v-row>
      </v-img>
    </v-card>
  </v-container>
</template>


<script>
export default {
  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    },
    moduleDetails() {
      return this.$store.getters["mgr/moduleDetails"];
    },
    imageUrl() {
      return this.$store.getters["med/appMedia"].backgroundUrls[this.status.itemName];
    }
  },
  methods: {
    goToQuery() {
      this.$store.dispatch("tag/clearFilterSelections");
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("welcome", "filter")}`
      });
    },

    showAll() {
      this.$store.dispatch("tag/clearFilterSelections");
      this.$store.dispatch("mgr/queryCollection", true).then(res => {
        this.$router.push({
          path: `${this.status.moduleAppBaseUrl}/list`
        });
      });
    },

    goToItem() {
      this.$store.dispatch("tag/clearFilterSelections");
      this.$store.dispatch("mgr/queryCollection", true).then(res => {
        this.$router.push({
          path: `${this.status.moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`
        });
      });
    }
  }
};
</script>