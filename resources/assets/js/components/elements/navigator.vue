<template>
  <v-layout fill-height>
    <v-btn flat @click="prev()">
      <v-icon>arrow_back</v-icon>
    </v-btn>

    <picker/>
    <v-btn flat @click="next()">
      <v-icon>arrow_forward</v-icon>
    </v-btn>
  </v-layout>
</template>
 


<script>
import picker from "../pickers/picker";
export default {
  name: "navigator",
  components: { picker },

  created() {
    console.log("navigatorCreate");
  },

  data() {
    return {};
  },

  computed: {
    path() {
      return this.$store.getters["mgr/moduleBaseURL"];
    },
    collection() {
      this.$store.getters["mgr/collection"];
    },
    item() {
      this.$store.getters["mgr/item"];
    },
    adjacents() {
      return this.$store.getters["mgr/adjacents"];
    }
  },
  methods: {
    next() {
      if (this.adjacents) {
        let path = "/" + this.path + "/" + this.adjacents.next + "/show";
        console.log(
          "path from manager " + this.path + "\nactual path: " + path
        );
        this.$router.push({ path: `${path}` });
      }
    },

    prev() {
      if (this.adjacents) {
        let path = "/" + this.path + "/" + this.adjacents.prev + "/show";
        console.log(
          "path from manager " + this.path + "\nactual path: " + path
        );
        this.$router.push({ path: `${path}` });
      }
    }
  }
};
</script>

<style scoped>
</style>