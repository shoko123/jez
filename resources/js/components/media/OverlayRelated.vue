<template>
  <div>
    <h5>{{ item.description }}</h5>
    <v-btn :disabled="!isImplemented" @click="goTo(item)">Visit</v-btn>
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
    /*
    console.log(
      `RelatedOL page: ${this.page} index: ${this.index} item: ${JSON.stringify(
        this.item,
        null,
        2
      )}`
    );
    */
  },

  computed: {
    showLightBoxOption() {
      return this.item.hasMedia;
    },
    module() {
      return this.$store.getters["mgr/module"];
    },
    isImplemented() {
      return this.module === "Locus"
        ? this.$store.getters["mgr/isImplemented"](this.item.findable_type)
        : true;
    },
  },
  methods: {
    openLightBox() {
      let c = this.$store.getters["mgr/collections"]("related");
      this.$store.commit("med/openLightBox", {
        value: true,
        source: "related",
        index: this.index % c.itemsPerPage,
      });
    },

    goTo(locus) {
      let module, id;
      switch (this.$store.getters["mgr/module"]) {
        case "Area":
        case "Season":
          module = "AreaSeason";
          id = this.item.id;
          break;
        case "AreaSeason":
          module = "Locus";
          id = this.item.id;

          break;
        case "Locus":
          module = this.item.findable_type;
          id = this.item.findable_id;
          break;
      }
      this.$store.dispatch("mgr/goToRoute", {
        module: module,
        action: "show",
        id: id,
      });
    },
  },
};
</script>

