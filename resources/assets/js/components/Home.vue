<template>
<div id=jez-home-page>
  <v-carousel height="100%" continuos cycle>
    <v-carousel-item v-for="(item, i) in imagesUrls" :key="i" :src="item"></v-carousel-item>
  </v-carousel>
</div>
</template>


<script>
export default {
 
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

<style scoped>
  #jez-home-page {height:90vh}
</style>
