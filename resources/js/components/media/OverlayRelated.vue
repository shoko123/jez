<template>
  <v-card class="mx-auto" color="transparent" flat>
    <v-card-text v-if="hasMedia" class="text-body-1 white--text">
      {{ text }}</v-card-text>
    <v-card-actions>
      <v-btn :disabled="disabledGoTo(item)" @click="goTo(item)">Visit</v-btn>
      <v-btn v-if="hasMedia" @click="openLightBox()">Lightbox</v-btn>
    </v-card-actions>
  </v-card>
</template>
    

<script>
export default {
  props: {
    item: Object,
    page: Number,
    index: Number,
    source: String
  },
  created() {
    //console.log(`relatedOL source: ${this.source} page: ${this.page} index: ${this.index} item: ${JSON.stringify(this.item, null, 2)}`);
  },

  computed: {
    hasMedia() {
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
      let c = this.$store.getters["mgr/collections"]("related");
      this.$store.commit("med/openLightBox", {
        value: true,
        source: "related",
        index: this.index % c.itemsPerPage,
      });
    },

    disabledGoTo(item) {
      return (this.source === "related" && item.module === "Tbd")
    },
    goTo() {
      this.$store.dispatch("mgr/goToRoute", {
        module: this.item.module,
        action: "show",
        dot: this.item.dot,
      });
    },
  },
};
</script>

