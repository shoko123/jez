<template> 
      <v-img
        id="lbmedia"
        :src="media.fullUrl"
        :lazy-src="media.tnUrl"
        contain
        class="grey lighten-2"
      ></v-img>
</template>

<script>
export default {
  computed: {
    media() {
      if (this.$store.getters["mgr/ready"].item) {
        return this.$store.getters["mgr/item"];
      } else {
        return { fullUrl: null, tnUrl: null };
      }
    },
  },
};
</script>
<style scoped>
#lbmedia {
  height: 80vh;
}
</style>
