<template>
  <v-card width="80%" class="elevation-12 mt-4 mx-auto">
    <v-card-title class="grey py-0 mb-4">App Accessibility Status</v-card-title>
    <v-card-text>
      <v-container fluid>
        <v-checkbox
        disabled
          v-model="appSettings.readOnly"
          :label="`Read Only`"
        ></v-checkbox>
         <v-checkbox
          v-model="appSettings.authorizedUsersOnly"
          :label="`Authorized Users Only`"
          disabled
        ></v-checkbox>
        <v-btn class="primary" @click="home">Back</v-btn>
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
  },
  methods: {
    home() {
      this.$store.dispatch("mgr/goToRoute", "home");
    },
  },
};
</script>