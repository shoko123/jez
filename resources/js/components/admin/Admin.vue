<template>
  <v-card width="80%" class="elevation-12 mt-4 mx-auto">
    <v-card-title class="grey py-0 mb-4">App Access Status</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-switch v-model="readOnly" :label="`Read Only`"></v-switch>
        <v-switch
          v-model="authorizedUsersOnly"
          :label="`Authorized Users Only`"
        ></v-switch>
        <v-btn class="primary" @click.native="home">cancel</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    appSettings() {
      return this.$store.getters["mgr/appSettings"];
    },
    readOnly: {
      get() {
        return this.appSettings.readOnly;
      },
      set(data) {
        //this.$store.commit("admin/appSettings", { field: "readOnly", value: data});
      },
    },
     authorizedUsersOnly: {
      get() {
        return this.appSettings.authorizedUsersOnly;
      },
      set(data) {
        //this.$store.commit("admin/appSettings", { field: "authorizedUsersOnly", value: data});
      },
    },
  },
  methods: {
     submit() {
      this.$store.dispatch("mgr/routes", "home");
    },
    home() {
      this.$store.dispatch("mgr/goToRoute", "home");
    },
  },
};
</script>