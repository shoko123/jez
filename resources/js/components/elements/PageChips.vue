<template>
  <v-row wrap>
    <v-chip v-for="(item, index) in chunk" :key="index" :disabled="disabledChip(item)"
      class="font-weight-normal ma-2 body-1" @click="goTo(item)">{{ item.tag }}</v-chip>
  </v-row>
</template>

<script>
export default {
  props: {
    source: String,
    page: Number,
  },

  computed: {
    chunk() {
      return this.$store.getters["mgr/collections"](this.source).chunk;
    },
  },

  methods: {
    disabledChip(item) {
      return (this.source === "related" && item.module === "Tbd")
    },

    goTo(item) {
      let module;

      switch (this.source) {
        case 'main':
          module = this.$store.getters["mgr/module"];
          break;

        case 'related':
          module = item.module
          break;

      }

      this.$store.dispatch("mgr/goToRoute", {
        module,
        action: "show",
        dot: item.dot,
      });
    },
  },
};
</script>

