<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn class="primary--text" text>{{subMenuTitle}} </v-btn>
         <v-row align="center" justify="center">
        <!--v-btn @click="welcome" color="info" text>welcome</v-btn-->
        <v-btn
          @click="toFilter"
          color="primary"
          large
          rounded
          class="ml-2"
        >to Filter</v-btn>
        
      </v-row>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>

export default {
  computed: {
    subMenuTitle() {
      return `${this.$store.getters["mgr/moduleInfo"].collectionName} Collection. Filters() -> (${this.$store.getters["mgr/status"].count})`;
    },
  },
  methods: {
    toFilter() {
      this.$router.push({ path: `${this.$router.currentRoute.path.replace("list", "filter")}` }); 
    }
  }
};
</script>