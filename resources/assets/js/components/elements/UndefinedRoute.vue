<template>
  <v-container grid-list-sm fluid>
    <v-layout align-center justify-center>
      <v-card class="elevation-12" >

        <v-toolbar color="primary" dark>
          <v-toolbar-title>Undefined route!</v-toolbar-title>
        </v-toolbar>

        <v-card-text>
          <v-layout row wrap>           
              <v-btn class="primary" @click.native="home">home</v-btn>
              <v-btn class="primary" @click.native="back">Back</v-btn>
          </v-layout>
        </v-card-text>

      </v-card>
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
