<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar>
      <v-toolbar-items>
        <v-btn flat>groundstone ({{groundstonesCount}})</v-btn>

        <v-divider class="mx-3" inset vertical></v-divider>

        <template v-if="showNavigator">
          <groundstoneNavigator/>
        </template>
        <template v-if="showEditorTools">
          <v-divider class="mx-3" inset vertical></v-divider>

          <v-btn>
            <v-icon @click="groundstoneUpdate()" color="info">save</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="groundstoneDelete()" color="error">delete</v-icon>
          </v-btn>
          <v-btn>
            <v-icon @click="groundstoneNew()" color="warning">note_add</v-icon>
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
import groundstoneNavigator from "./groundstoneNavigator";

export default {
  name: "groundstone-menu",
  components: { groundstoneNavigator },

  data() {
    return {};
  },
  computed: {
findFormData() {
      return this.$store.getters.findFormData;
    },
    isCreate: {
      get() {
        return this.findFormData.isCreate;
      },
      set(data) {
        this.$store.commit("isCreate", data);
      }
    },

    showEditorTools() {
      return true;
    },
    showNavigator() {
      return true;
    },

    groundstonesCount() {
      return this.$store.getters['gs/groundstonesCount'];
    }
  },
  methods: {
    welcome() {
      this.$router.push({ path: `/groundstones/welcome` });
    },

    groundstoneUpdate() {
      console.log("groundstoneSave()");
    },
    groundstoneDelete() {
      this.$store.commit("isLoading", {
        value: true,
        message: "deleting groundstone",
        progressColor: "green"
      });

      this.$store
        .dispatch('gs/groundstoneDelete', this.$route.params.id)
        .then(res => {
          this.$store.commit("isLoading", {
            value: false,
            message: "",
            progressColor: "green"
          });

          this.$store.commit("snackbar", {
            value: true,
            message: "groundstone deleted successully. Redirected to list",
            timeout: 5000,
            color: "green",
            mode: ""
          });
          //go to update groundstone list
          this.$router.push({ path: `/groundstones/list` });
        })
        .catch(err => {
          console.log("Error in groundstoneDelete" + err.response);
        });
    },
    groundstoneNew() {
      this.isCreate = true;
      this.$router.push({ path: `/groundstones/create` });
    },

    groundstoneUpdate() {
      this.isCreate = false;
      this.$router.push({ path: `/groundstones/create` });
    },
    displayOptions() {}
  }
};
</script>

<style scoped>
</style>