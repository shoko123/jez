<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>find</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">
          <findNavigator/>

          <v-divider class="mx-3" inset vertical></v-divider>

          <v-btn>
            <v-icon @click="findUpdate()" color="info">save</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="findDelete()" color="error">delete</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="findNew()" color="warning">note_add</v-icon>
          </v-btn>
        </template>
      </v-toolbar-items>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn @click="welcome" color="info" flat>welcome</v-btn>
        <v-btn @click="displayOptions()" color="info" flat>display options</v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-container>
</template>

<script>
import findNavigator from "./findNavigator";

export default {
  name: "find-header",
  components: { findNavigator },

  data() {
    return {};
  },
  computed: {
    showNavigator() {
      return true;
    },
    noOfRecords() {
      return this.$store.getters.findsWithPagination.pagination.total;
    }
  },
  methods: {
    welcome() {
      this.$router.push({ path: `/finds/welcome` });
    },

    findUpdate() {
      console.log("findSave()");
    },
    findDelete() {
      this.$store.commit("isLoading", {
        value: true,
        message: "deleting find",
        progressColor: "green"
      });

      this.$store
        .dispatch("findDelete", this.$route.params.id)
        .then(res => {

          this.$store.commit("isLoading", {
            value: false,
            message: "",
            progressColor: "green"
          });


          this.$store.commit("snackbar", {
            value: true,
            message: "find deleted",
            timeout: 5000,
            color: "green",
            mode: ""
          });
          //go to update find list
          this.$router.push({ path: `/finds/list` });
        })
        .catch(err => {
          console.log("Error in findDelete" + err.response);
        });



      
    },
    findNew() {
      this.$router.push({ path: `/finds/create` });
    },

    displayOptions() {}
  }
};
</script>

<style scoped>
</style>