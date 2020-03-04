<template>
  <div>
    <h4>{{ media.tag }}</h4>
    <h5>Description: {{ media.description }}</h5>
    <v-btn @click="goTo(media.id)">Visit</v-btn>
    <!--v-btn @click="openLightBox()">Open Lightbox</v-btn-->   
  </div>
</template>
    

<script>

export default {
  props: {
    media: { type: Object }
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

