<template>
  <div>
    <h5>{{ text }}</h5>
    <v-btn @click="goTo(item.id)">Visit</v-btn>
    <v-btn v-if="showLightBoxOption" @click="openLightBox()">Lightbox</v-btn>
  </div>
</template>
    

<script>
export default {
  props: {
    item: Object,
    page: Number,
    index: Number,
  },

  created() {
    //console.log(`collectionOL page: ${this.page} index: ${this.index} item: ${JSON.stringify(this.item, null, 2)}`);
  },
  
  computed: {
    showLightBoxOption() {
      return this.item.hasMedia;
    },
    text() {
      let text = this.item.description;
      if (text === null) {
        return "";
      } else {
        return text.length < 101 ? text : text.substr(0, 100) + "...";
      }
    },
  },

  methods: {
    openLightBox() {
        let c = this.$store.getters["mgr/collections"]("main");
        this.$store.commit("med/openLightBox", {
        value: true,
        source: "main",
        index: this.index % c.itemsPerPage,
      });
    },

    goTo(id) {
      this.$store.dispatch("mgr/goToRoute", {
        module: this.$store.getters["mgr/module"],
        action: "show",
        id: id,
      });
    },
  },
};
</script>

