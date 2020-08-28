<template>
    <v-card class="elevation-12 mx-auto" width="100%">
      <v-img id="img" :src="imageUrl" :cover="true">
        <v-row>
          <v-card-text class="title white--text">
            <slot name="body">
              Number of items: {{moduleDetails.itemCount}}<br/>             
              Number of images: {{moduleDetails.imageCount}}<br/><br/>
            </slot>
            Please Selecte Action: 
            <v-btn @click="goToQuery">query collection</v-btn>
            <v-btn @click="showAll">show all</v-btn>
            <v-btn @click="goToItem">explore</v-btn>
            <br/><br/>
            <slot name="itemButtons"></slot>
          </v-card-text>
          <v-card-actions>
            
          </v-card-actions>
        </v-row>
      </v-img>
    </v-card>
</template>

<script>
export default {
  mounted: function() {
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = 'hidden'
  },
  destroyed: function() {
    let elHtml = document.getElementsByTagName('html')[0]
    elHtml.style.overflowY = null
  },
  computed: {
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
      this.$store.commit("aux/clearFilters");
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("welcome", "filter")}`,
      });
    },

    showAll() {
      this.$store.dispatch("aux/queryCollection", {clear: true, spinner: true, gotoCollection: true})
    },

    goToItem() {
      this.$store.dispatch("aux/queryCollection",  {clear: true, spinner: true, gotoCollection: false})
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