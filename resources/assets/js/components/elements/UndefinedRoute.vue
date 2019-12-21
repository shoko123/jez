<template>
  <v-container class="fill-height" fluid>
    <v-card class="ma-auto elevation-12" min-width="500" min-height="400">
      <v-toolbar dark color="primary">
        <v-toolbar-title>Undefined route!</v-toolbar-title>
      </v-toolbar>
      <v-card-actions>
        <v-btn class="primary" @click.native="home">home</v-btn>
        <v-btn class="primary" @click.native="back">Back</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    home() {
      this.$router.push("/");
    },
    back() {
      this.$router.push("/");
    }
  }
};
</script>
