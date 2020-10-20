<template>
<div>
  <SubMenuWelcome/>
  <v-img id="img" :src="imageUrls.fullUrl" :lazy-src="imageUrls.tnUrl" :cover="true">
    <v-container fill-height fluid>
      <v-row justify="center">
        <v-card class="mx-auto" flat color="rgb(255, 0, 0, 0)">
          <v-row>
            <v-card-title class="title white--text text-h2">{{headerText}}</v-card-title>
            <v-card-text class="white--text text-h4">
              <br />
              Number of Items: {{moduleDetails.itemCount}}
              <br />
              Number of Images: {{moduleDetails.imageCount}}
            </v-card-text>
            <v-card-actions></v-card-actions>
          </v-row>
        </v-card>
      </v-row>
    </v-container>
  </v-img>
</div>
</template>

<script>

import SubMenuWelcome from "../menus/SubMenuWelcome";

export default {

  components: {
    SubMenuWelcome,
  },
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
      return name.charAt(0).toUpperCase() + name.slice(1);
    },
    headerText() {
      return `${this.collectionNameCapitalized} Main Page`;
    },
    moduleDetails() {
      return this.$store.getters["mgr/moduleDetails"];
    },

    imageUrls() {
      return this.$store.getters["med/appMedia"].backgroundUrls[
        this.$store.getters["mgr/appStatus"].module
      ];
    },
  },
  methods: {

  },
};
</script>
<style scoped>
#img {
  height: 100vh;
}
</style>