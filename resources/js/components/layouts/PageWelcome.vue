<template>
  <div>
    <template v-if="isAbout">
      <SubMenuAbout />
    </template>
    <template v-else>
      <SubMenuWelcome />
    </template>
    <v-img
      id="img"
      :src="imageUrls.fullUrl"
      :lazy-src="imageUrls.tnUrl"
      :cover="true"
    >
      <v-card flat color="rgb(255, 0, 0, 0)">
        <v-card-title class="title white--text text-h2">{{
          headerText
        }}</v-card-title>
        <v-card-text class="white--text text-h4">
          <v-row wrap>
            <v-col lg="8" class="opac">
              {{ text }}
            </v-col>
          </v-row>
          <br />

          <v-row v-if="'items' in moduleData.counts">
            Record Count: {{ moduleData.counts.items }}
          </v-row>
          <v-row v-if="'media' in moduleData.counts">
            Media Count: {{ moduleData.counts.media }}
          </v-row>
          <v-row v-if="'baskets' in moduleData.counts">
            Basket Count: {{ moduleData.counts.baskets }}
          </v-row>
          <v-row v-if="'artifacts' in moduleData.counts">
            Artifact Count: {{ moduleData.counts.artifacts }}
          </v-row>
        </v-card-text>
      </v-card>
    </v-img>
  </div>
</template>

<script>
import SubMenuWelcome from "../menus/SubMenuWelcome";
import SubMenuAbout from "../menus/SubMenuAbout";

export default {
  components: {
    SubMenuWelcome,
    SubMenuAbout,
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
    isAbout() {
      return this.$store.getters["mgr/module"] === "About";
    },
    moduleData() {
      return this.$store.getters["mgr/moduleData"];
    },
    headerText() {
      return this.moduleData.welcomePageParams.title; //`${this.$store.getters["mgr/status"].collectionName} Main Page`;
    },
    text() {
      return `${this.moduleData.welcomePageParams.text}`;
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
.opac {
  background-color: rgba(92, 19, 19, 0.2) !important;
  border-color: white !important;
}
</style>