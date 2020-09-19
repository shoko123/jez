<template>
  <v-img id="img" :src="imageUrl" :cover="true">
    <v-container fill-height fluid>
      <v-row justify="center">
        <v-card class="mx-auto" flat color="rgb(255, 0, 0, 0)">
          <v-row> 
             <v-card-title class="title white--text  text-h2">{{headerText}}</v-card-title>
            <v-card-text class="white--text text-h4">         
           <br />
              Number of items: {{moduleDetails.itemCount}}
              <br />
              Number of images: {{moduleDetails.imageCount}}
              <br />
              <br />Please Selecte Action:
              <v-btn @click="goToQuery">query collection</v-btn>
              <v-btn @click="showAll">show all</v-btn>
              <v-btn @click="goToItem">explore</v-btn>
              <br />
              <br />
             
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
export default {
  mounted: function () {
    let elHtml = document.getElementsByTagName("html")[0];
    elHtml.style.overflowY = "hidden";
  },
  destroyed: function () {
    let elHtml = document.getElementsByTagName("html")[0];
    elHtml.style.overflowY = null;
  },
  computed: {
    collectionNameCapitalized() {
      let name = this.$store.getters["mgr/status"].collectionName;
      return name.charAt(0).toUpperCase() + name.slice(1)
    },
    headerText() {
      return `${this.collectionNameCapitalized} main page`;
    },
    status() {
      return this.$store.getters["mgr/status"];
    },
    moduleDetails() {
      return this.$store.getters["mgr/moduleDetails"];
    },
    imageUrl() {
      return this.$store.getters["med/appMedia"].backgroundUrls[
        this.$store.getters["mgr/appStatus"].module
      ];
    },
  },
  methods: {
    goToQuery() {
      this.$store.dispatch("aux/clearFilters");
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("welcome", "filter")}`,
      });
    },

    showAll() {
      this.$store.dispatch("aux/queryCollection", {
        clear: true,
        spinner: true,
        gotoCollection: true,
      });
    },

    goToItem() {
      this.$store
        .dispatch("aux/queryCollection", {
          clear: true,
          spinner: true,
          gotoCollection: false,
        })
        .then((res) => {
          this.$router.push({
            path: `${this.status.moduleAppBaseUrl}/${this.$store.getters["mgr/collection"][0].id}/show`,
          });
        });
    },
  },
};
</script>
<style scoped>
#img {
  height: 100vh;
}
</style>