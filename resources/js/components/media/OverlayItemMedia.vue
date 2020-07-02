<template>
  <div>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Open Lightbox</v-btn>   
  </div>
</template>  

<script>


export default {
   props: {
    media: Object,
    index: Number
  },
  computed: {
   showLightBoxOption() {
      return this.$store.getters["med/itemAllMedia"].length;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/dialogMediaLightBox", {value: true, source: "ItemMedia", index: this.index});
    }
  }
};
</script>

