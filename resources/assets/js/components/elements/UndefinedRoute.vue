<template>

<v-container fill-height>
    <v-layout align-center justify-center>
      <v-flex xs8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Undefined route!</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <div class="text-center">
              <v-btn class="primary" @click.native="home">home</v-btn>
              <v-btn class="primary" @click.native="back">Back</v-btn>
          </div>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
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
