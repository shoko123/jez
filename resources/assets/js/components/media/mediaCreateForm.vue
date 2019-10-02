<template>
  <v-stepper-content step="4">
    <form @submit.prevent="submitForm('mediaForm')" data-vv-scope="mediaForm">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea label="Add media" filled></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn text @click.native="step = 2">Previous</v-btn>
      <v-btn type="submit" color="primary">submit</v-btn>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    //console.log("mediaCreateForm.created()");
  },

  //locusHydrated: false,
  data() {
    return {};
  },

  computed: {
    
  },

  methods: {
  }
};
</script>
