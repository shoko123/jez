<template>
  
    <v-layout row height="100%">
      <v-btn flat @click="prev()">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <locusPicker/>
      <v-btn flat @click="next()">
        <v-icon>arrow_forward</v-icon>
      </v-btn>
    </v-layout>
  
</template>




 


<script>
import locusPicker from "./locusPicker";

export default {
  name: "locus-navigator",
  components: { locusPicker },

  created() {
    //this.$store.dispatch('areas');
    //this.$store.dispatch("loci");
  },

  data() {
    return {};
  },

  computed: {
    locus() {
      return this.$store.getters.locus;
    },
    loci() {
      return this.$store.getters.loci;
    }
  },
  methods: {
    next() {
      this.$store.commit("locusNext");
    },
    prev() {
      this.$store.commit("locusPrev");
    }
  }
};
</script>

<style scoped>
</style>