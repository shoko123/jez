<template>
  <v-container fluid class="ma-0 pa-0">
    <v-toolbar class="ma-0 pa-0">
      <v-toolbar-title>Loci</v-toolbar-title>

      <v-toolbar-items>
        <v-breadcrumbs :items="items" divider=">"></v-breadcrumbs>
      </v-toolbar-items>

      <v-snackbar
        top
        v-model="snackbar"
        :color="color"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
      >
        {{ text }}
        <v-btn dark flat @click="snackbar = false">Close</v-btn>
      </v-snackbar>
      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat>Link One</v-btn>
        <v-btn flat>Link Two</v-btn>
        <v-btn flat>Link Three</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <router-view></router-view>
  </v-container>
  
</template>

<script>
export default {
  name: "locus-main",

  data() {
      return {
    items: [
      {
        text: "Loci",
        disabled: false,
        href: "#"
      },
      {
        text: "filter1",
        disabled: false,
        href: "#"
      },
      {
        text: "filter2",
        disabled: true,
        href: "#"
      }
    ],


      
        snackbar: true,
        color: 'green',
        mode: '',
        timeout: 3000,
        text: 'Hello,snackbar!'

  }


  }
};
</script>