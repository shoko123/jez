<template>
  <v-carousel height="800" continuos cycle>
    <v-carousel-item v-for="(item, i) in imagesUrls" :key="i" :src="item"></v-carousel-item>
  </v-carousel>
</template>


<script>
export default {
  created() {
    this.$store.dispatch("pkr/loadAreasSeasons", null);
  },
  data() {
    return {
      carouselImages: ["Church.jpeg", "Staff.jpg", "Winery.jpg"]
    };
  },
  computed: {
    imagesUrls() {
      return this.carouselImages.map(x => {
        return `${this.$store.getters["med/storageUrl"]}/static/images/${x}`;
      });
    }
  }
};
</script>
