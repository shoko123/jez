<template>
  <v-row align="center" justify="center">
    <v-btn class="mx-2" fab text @click="goToItem('prev')" :disabled="disable">
      <v-icon color="primary">arrow_back</v-icon>
    </v-btn>

    <Picker/>

    <v-btn class="mx-2" fab text @click="goToItem('next')" :disabled="disable">
      <v-icon color="primary">arrow_forward</v-icon>
    </v-btn>

    <template v-if="isFind">
      <v-btn class="mr-5" large @click="goToLocus" color="info" text rounded outlined>To Locus</v-btn>
    </template>
  </v-row>
</template>



<script>
import Picker from "../registration/Picker";

export default {
  name: "navigator",
  components: { Picker },


  computed: {
    disable() {
      return (
        this.$store.getters["mgr/xhrStatus"].loadingItem ||
        this.$store.getters["mgr/xhrStatus"].loadingCollection
      );
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    },

    isFind() {
      return this.$store.getters["mgr/status"].isFind;
    }
  },
  methods: {
    goToItem(direction) {
      if (this.adjacents) {
        let path = this.$store.getters["mgr/status"].moduleAppBaseUrl
        this.$router.push({
          path: `${path}/${
            direction == "next" ? this.adjacents.next : this.adjacents.prev
          }/show`
        });
      }
    },

    goToLocus() {
      if (this.$store.getters["mgr/item"]) {
        this.$router.push({
          path: `/loci/${this.$store.getters["mgr/item"].locus_id}/show`
        });
      }
    },
  }
};
</script>

<style scoped>
</style>