<template>
  <v-stepper-content step="4">
    <form @submit.prevent="submitForm('mediaForm')" data-vv-scope="mediaForm">
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
    findFormData() {
      return this.$store.getters.findFormData;
    },
    groundstoneFormData() {
      return this.$store.getters["gs/createData"];
    },

    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("step", data);
      }
    },

    isCreate() {
      return this.findFormData.isCreate;
    },

    headerMessage() {
      return this.findFormData.headerMessage;
    }
  },

  methods: {
    submitForm(scope) {
      console.log("submit");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.sendToServer();
          this.step = 3;
          return;
        }
        //alert("Correct them errors!");
      });
    },

    clear() {},

    sendToServer() {
  
    }
  }
};
</script>
