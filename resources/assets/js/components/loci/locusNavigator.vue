<template>
  
    <v-layout fill-height>
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
      this.$router.push({ path: `/loci/${this.locus.id}` });
    },
    prev() {
      this.$store.commit("locusPrev");
      this.$router.push({ path: `/loci/${this.locus.id}` });
    }
  }
};
</script>

<style scoped>
</style>