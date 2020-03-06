<template>
  <div>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Open Lightbox</v-btn>   
  </div>
</template>  

<script>


export default {
  computed: {
   showLightBoxOption() {
      return this.$store.getters["med/media"].length;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {value: true, source: "ItemMedia"});
    }
  }
};
</script>

