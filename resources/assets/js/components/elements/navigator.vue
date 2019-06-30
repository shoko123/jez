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

import picker from "../elements/picker";
export default {
  name: "navigator",
  components: { picker},

  created() {},

  data() {
    return {};
  },

  computed: {
    path() {
      return this.$store.getters["mg/path"];
    },
    collection() {
      this.$store.getters["mg/collection"]
    },
    item() {
      this.$store.getters["mg/item"]
    },
    adjacents() {
      return this.$store.getters["mg/adjacents"];
    }, 
  },
  methods: {
    next() {      
      let path = '/' + this.path + '/' + this.adjacents.next + '/show';
      console.log('path from manager ' + this.path + '\nactual path: ' + path);
      this.$router.push({ path: `${path}` });
    },

    prev() {
      let path = '/' + this.path + '/' + this.adjacents.prev + '/show';
      console.log('path from manager ' + this.path + '\nactual path: ' + path);
      this.$router.push({ path: `${path}` });
    },
  }
};
</script>

<style scoped>
</style>