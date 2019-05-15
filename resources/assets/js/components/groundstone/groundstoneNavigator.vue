<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <groundstonePicker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
import groundstonePicker from "./groundstonePicker";
export default {
  name: "groundstone-navigator",
  components: { groundstonePicker },

  created() {},

  data() {
    return {};
  },

  computed: {},
  methods: {
    next() {
      this.requestNext("next");
    },

    prev() {
      this.requestNext("prev");
    },
    requestNext(direction) {
      console.log("nav.requestNext");
      this.$store.commit("isLoading", {
      value: true,
      message: "loading groundstone"
    });

      this.$store
        .dispatch("gs/groundstoneGetNextId", direction)
        .then(res => {
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          this.$store.commit("isLoading", { value: false });
          console.log(
            "groundstoneList received error from dispatch" + err.response
          );
        });
    }
  }
};
</script>

<style scoped>
</style>