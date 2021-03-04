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
      <v-card
        v-if="welcomeData"
        width="30%"
        height="100%"
        flat
        color="rgb(255, 0, 0, 0)"
        class="opac"
      >
        <v-card-title class="title white--text text-h4">{{
          headerText
        }}</v-card-title>
        <v-card-text class="white--text text-h5">
          <v-row wrap>
            <v-col>
              {{ text }}
            </v-col>
          </v-row>
          <br />
          <v-row>
            <v-col>
              <div v-if="'items' in welcomeData.counts">
                Record Count: {{ welcomeData.counts.items }} <br />
              </div>
              <div v-if="'media' in welcomeData.counts">
                Media Count: {{ welcomeData.counts.media }} <br />
              </div>
              <!--div v-if="'baskets' in welcomeData.counts">
                Basket Count: {{ welcomeData.counts.baskets }} <br />
              </div>
              <div v-if="'artifacts' in welcomeData.counts">
                Artifact Count: {{ welcomeData.counts.artifacts }} <br >
              </div-->
            </v-col></v-row
          >
        </v-card-text>
      </v-card>
    </v-img>
  </div>
</template>

<script>
import SubMenuWelcome from "../menus/SubMenuWelcome";
import SubMenuAbout from "../about/SubMenuAbout";

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
    welcomeData() {
      return this.$store.getters["mgr/welcomeData"];
    },
    headerText() {
      return this.welcomeData.welcomePageParams.title; //`${this.$store.getters["mgr/status"].collectionName} Main Page`;
    },

    text() {
      return this.welcomeData.welcomePageParams.text;
    },

    imageUrls() {
      return this.$store.getters["med/appMedia"].backgroundUrls[
        this.$store.getters["mgr/module"]
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