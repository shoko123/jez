<template>
  <div>
    <h4>{{ media.tag }}</h4>
    <h5>{{ media.text }}</h5>
    <v-btn @click="goTo(media.item_id)">Visit</v-btn>
    <!--v-btn @click="openLightBox()">Open Lightbox</v-btn-->   
  </div>
</template>
    

<script>

export default {
  props: {
    media: Object,
    index: Number
  },

  computed: {
   
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {value: true, source: "Collection", index: this.index});
    },

    goTo(id) {    
      this.$router.push({ path: `${this.$store.getters["mgr/moduleInfo"].appBaseUrl}/${id}/show` });
      //this.$router.push({ path: `/loci/${id}/show` });
    }
  }
};
</script>

