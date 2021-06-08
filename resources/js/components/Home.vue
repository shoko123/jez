<template>
  <div id="jez-home-page">
    <v-carousel height="100%" continuos cycle>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.fullUrl" :lazy-src="item.tnUrl">
        <!--v-card class="mx-auto" flat color="rgb(255, 0, 0, 0)">
        <v-card-title class="title white--text text-h3 opac">{{
          item.text
        }}</v-card-title>
        <v-card-text class="white--text text-h4">

        </v-card-text>
      </v-card-->
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters["med/carousel"];
    }
  }
};
</script>

<style scoped>
#jez-home-page {
  height: 90vh;
}
.opac {
   background-color: rgba(92, 19, 19, 0.2) !important;
   border-color: white !important;
 }
</style>
