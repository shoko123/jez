<template>
  <div id="jez-home-page">
    <v-carousel height="100%" continuos cycle>
      <v-carousel-item v-for="(item, i) in items" :key="i" :src="item.url">
      </v-carousel-item>
    </v-carousel>
  </div>
</template>

<script>
export default {
  computed: {
    items() {
      return this.$store.getters["med/appMedia"].carouselItems;
    }
  }
};
</script>

<style scoped>
#jez-home-page {
  height: 90vh;
}
</style>
