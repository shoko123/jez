<template>
  <v-container fluid>
    <v-card class="elevation-12 mx-auto"
    max-width="60%">
      <v-card-title class="grey py-0 mb-4">Welcome to the {{status.itemName}} module</v-card-title>
      <v-row wrap dense>
        <v-card-text>
          <slot name="body">Currently recorded items: {{status.count}}</slot>
        </v-card-text>
        <v-card-actions>
          
          <v-btn @click="list">list</v-btn>
          <v-btn @click="explore">explore items</v-btn>
        
        </v-card-actions>
      </v-row>
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

    locusCount() {
      return this.$store.getters["loc/collection"]
        ? this.$store.getters["loc/collection"].length
        : 0;
    }
  },
  methods: {
    list() {
      let listUrl = this.status["baseURL"] + "/list";
      console.log("listUrl: " + listUrl)
      
      this.$router.push({ path: listUrl });
    },

    explore() {
      let id0 = this.$store.getters["mgr/collection"][0].id;
      this.$router.push({
        path: `${this.status.baseURL}/${id0}/show`
      });
    }
  }
};
</script>