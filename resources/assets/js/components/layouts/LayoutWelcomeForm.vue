<template>
  <v-container fluid>
    <v-card class="elevation-12 mx-auto" max-width="60%">
      <v-img :src="imageUrl" :cover="true">
        <v-card-title class="grey py-0 mb-4">Welcome to {{status.itemName}}</v-card-title>
        <v-row wrap dense>
          <v-card-text class="title">
            <slot name="body">Current number of recorded items: {{status.count}}</slot>
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
    imageUrl() {
      return `${
        this.$store.getters["med/storageUrl"]
      }/static/images/full/${this.status.itemName}.jpg`;
    }
  },
  methods: {
    list() {
      let listUrl = this.status["moduleAppBaseUrl"] + "/list";
      console.log("listUrl: " + listUrl);

      this.$router.push({ path: listUrl });
    },

    explore() {
      let id0 = this.$store.getters["mgr/collection"][0].id;
      this.$router.push({
        path: `${this.status.moduleAppBaseUrl}/${id0}/show`
      });
    }
  }
};
</script>