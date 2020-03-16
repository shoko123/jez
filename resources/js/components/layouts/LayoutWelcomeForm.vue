<template>
  <v-container fluid>
    <v-card class="elevation-12 mx-auto" max-width="60%">
      <v-img :src="imageUrl" :cover="true">
        <v-card-title class="grey py-0 mb-4">Welcome to {{status.itemName}}</v-card-title>
        <v-row wrap dense>
          <v-card-text class="title">
            <slot name="body">
              <template v-if="summary">
                Number of items: {{summary.itemCount}}
                Number of images: {{summary.imageCount}}
              </template>
            </slot>
          </v-card-text>
          <v-card-actions>
            <v-btn @click="list">list</v-btn>
            <v-btn @click="explore">explore items</v-btn>
          </v-card-actions>
        </v-row>
      </v-img>
    </v-card>
  </v-container>
</template>





<script>
export default {
  data() {
    return {};
  },

  computed: {
    status() {
      return this.$store.getters["mgr/status"];
    },
    summary() {
      return this.$store.getters["mgr/summary"];
    },
    imageUrl() {
      return `${this.$store.getters["med/storageUrl"]}/static/media/full/${this.status.itemName}.jpg`;
    }
  },
  methods: {
    list() {
      let listUrl = this.status["moduleAppBaseUrl"] + "/list";
      console.log("listUrl: " + listUrl);

      this.$router.push({ path: listUrl });
    },

    explore() {
      if (!this.$store.getters["mgr/collection"]) {
        this.$store.dispatch("mgr/loadCollection", null).then(res => {
          this.$router.push({
            path: `${this.status.moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`
          });
        });
      } else {
        this.$router.push({path: `${this.status.moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`});
      }
      
    }
  }
};
</script>