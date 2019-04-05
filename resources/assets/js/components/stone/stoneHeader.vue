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
            <v-icon @click="stoneSave()" color="info">save</v-icon>
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
    return {
      
    };
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

    stoneSave() {
      console.log("stoneSave()");
    },
    stoneDelete() {},
    stoneNew() {},
    
    displayOptions() {}
  }
};
</script>

<style scoped>

</style>