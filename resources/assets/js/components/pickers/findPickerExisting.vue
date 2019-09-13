<template>

  <v-layout row wrap>
    <v-flex xs12 md6 lg3 v-for="x in finds" :key="x.id">
      <v-btn @click="findSelected(x.id)">{{x.tag}}</v-btn>
    </v-flex>
  </v-layout>

</template>

<script>
export default {
  created() {
    console.log("findPickerExisting.created()");

  },
  destroyed() {
    console.log("findPickerExisting.destroyed");
  },

  data() {
    return { };
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    finds() {
      //finds are read from DB at locusSelected();
      return this.$store.getters["pkr/finds"];
    },
  },
    methods: {
      findSelected(id) {
      //this.dialog = false;     
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      console.log("findPickerExisting.findSelected id: " + id);
      //this.$router.push({ path: `/loci/${this.locus_id}/show` });     
    },      

    goTo() {
      //this.dialog = false;     
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      console.log("findPicker.goto()");
      //this.$router.push({ path: `/loci/${this.locus_id}/show` });     
    },
  }
};
</script>
