<template>
  <div>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Lightbox</v-btn>   
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
      return this.$store.getters["med/itemMedia"].length;
    },
  },
  methods: {
    openLightBox() {
      this.$store.commit("med/openLightBox", {value: true, source: "ItemMedia", index: this.index});
    }
  }
};
</script>

