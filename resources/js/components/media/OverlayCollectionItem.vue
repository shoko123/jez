<template>
  <div>
    <h4>{{ image.tag }}</h4>
    <h5>Description: {{ image.description }}</h5>
    <v-btn @click="goTo(image.id)">Visit</v-btn>
    <!--v-btn @click="openLightBox()">Open Lightbox</v-btn-->   
  </div>
</template>
    

<script>

export default {
  props: {
    image: { type: Object }
  },

  computed: {
   
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {value: true, source: "Collection"});
    },

    goTo(id) {    
      this.$router.push({ path: `/loci/${id}/show` });
    }
  }
};
</script>

