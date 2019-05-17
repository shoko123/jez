<template>
  
    <form @submit.prevent="submitForm('findSubmitOptionsForm')" data-vv-scope="findSubmitOptionsForm">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea label="Add media" box></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn flat @click.native="step = 2">Previous</v-btn>
      <v-btn type="submit" color="primary">submit</v-btn>
    </form>

</template>

<script>
export default {
  created() {
    console.log("submitOptionsForm.created()");
  },

  data() {
    return {};
  },

  computed: {
    
  },

  methods: {
    submitForm(scope) {
      console.log("submit");

      
    clear() {},

    sendToServer() {
    }
  }
};
</script>
