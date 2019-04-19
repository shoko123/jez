<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>Stone ( {{ noOfRecords }} )</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">
          <stoneNavigator/>

          <v-divider class="mx-3" inset vertical></v-divider>

          <v-btn>
            <v-icon @click="stoneUpdate()" color="info">save</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="stoneDelete()" color="error">delete</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="stoneNew()" color="warning">note_add</v-icon>
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
import stoneNavigator from "./stoneNavigator";

export default {
  name: "stone-header",
  components: { stoneNavigator },

  data() {
    return {};
  },
  computed: {
    showNavigator() {
      return true;
    },
    noOfRecords() {
      return this.$store.getters.stonesWithPagination.pagination.total;
    }
  },
  methods: {
    welcome() {
      this.$router.push({ path: `/stones/welcome` });
    },

    stoneUpdate() {
      console.log("stoneSave()");
    },
    stoneDelete() {
      this.$store.commit("isLoading", {
        value: true,
        message: "deleting stone",
        progressColor: "green"
      });

      this.$store
        .dispatch("stoneDelete", this.$route.params.id)
        .then(res => {

          this.$store.commit("isLoading", {
            value: false,
            message: "",
            progressColor: "green"
          });


          this.$store.commit("snackbar", {
            value: true,
            message: "Stone deleted",
            timeout: 5000,
            color: "green",
            mode: ""
          });
          //go to update stone list
          this.$router.push({ path: `/stones/list` });
        })
        .catch(err => {
          console.log("Error in stoneDelete" + err.response);
        });



      
    },
    stoneNew() {
      this.$router.push({ path: `/stones/create` });
    },

    displayOptions() {}
  }
};
</script>

<style scoped>
</style>