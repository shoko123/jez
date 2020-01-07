<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}} Collection Menu - Not implemented yet</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>

export default {

 
  data() {
    return {};
  },
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/status"].collectionName} (${
        this.$store.getters["mgr/count"]
      })`; //return 'item';
    },
    

  },
  methods: {
  }
};
</script>

<style scoped>
</style>