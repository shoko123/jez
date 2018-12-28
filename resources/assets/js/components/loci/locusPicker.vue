<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 class="px-1">
        <areaPicker/>
      </v-flex>

      <v-flex xs12 sm6 class="px-1">
        <v-text-field
          class="pr-1"
          name="my"
          v-model="my"
          v-validate="'required'"
          :error-messages="errors.collect('my')"
          label="locus number"
          box
        ></v-text-field>
      </v-flex>
    </v-layout>
  </v-container>
</template>

  


<script>
import areaPicker from "./areaPicker";
export default {
  components: { areaPicker },

  name: "locus-picker",

  data() {
    return {
      dialog: true,
      my: "my text"
    };
  },
  /*
        created() {
            //if (this.loci.length) {
            //    return;
            //}
            
            this.$store.dispatch('LociGet');
        }, */
  computed: {
    loci() {
      return this.$store.getters.loci;
    },
    areas() {
      return this.$store.getters.areas;
    }
  }
};
</script>


<style scoped>
.btn-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
</style>





