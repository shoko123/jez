<template>
  <div>
    <SubMenuWelcome />
    <v-img
      id="img"
      :src="imageUrls.fullUrl"
      :lazy-src="imageUrls.tnUrl"
      :cover="true"
    >
      <v-card class="mx-auto" flat color="rgb(255, 0, 0, 0)">
        <v-card-title class="title white--text text-h2">{{
          headerText
        }}</v-card-title>
        <v-card-text class="white--text text-h4">
          Number of Items: {{ moduleData.counts.items }}
          <br />
          Number of Images: {{ moduleData.counts.media }}
        </v-card-text>
      </v-card>
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
    headerText() {
      return `${this.$store.getters["mgr/status"].collectionName} Main Page`;
    },
    moduleData() {
      return this.$store.getters["mgr/moduleData"];
    },

    imageUrls() {
      return this.$store.getters["med/appMedia"].backgroundUrls[
        this.$store.getters["mgr/appStatus"].module
      ];
    },
  },
  methods: {},
};
</script>
<style scoped>
#img {
  height: 100vh;
}
</style>