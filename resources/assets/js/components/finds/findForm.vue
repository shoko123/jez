<template>
  <v-container fluid>
    <template v-if="find">

      <v-card class="elevation-12">
        <v-card-text> <v-card-title><h2>Registration details:</h2></v-card-title>
      <v-layout row wrap>
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="find.date" readonly label="date" filled></v-text-field>
        </v-flex>

        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="find.related_pottery_basket" readonly label="related pottery" filled></v-text-field>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="find.square" readonly label="square" filled></v-text-field>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="find.level_top" readonly label="level-top" filled></v-text-field>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="find.level_bottom" readonly label="level-bottom" filled></v-text-field>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-checkbox v-model="find.keep" readonly label="keep"></v-checkbox>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-checkbox v-model="find.drawn" readonly label="drawn"></v-checkbox>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="find.description" readonly label="description" filled></v-textarea>
        </v-flex>
        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="find.notes" readonly label="notes" filled></v-textarea>
        </v-flex>
        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="find.storage_location" readonly label="storage-location" filled></v-textarea>
        </v-flex>
      </v-layout>
      </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  name: "find-form",

  created() {
    //console.log("findForm.created()");
    //this.$store.dispatch("find", this.$route.params.id);
  },

  data() {
    return {};
  },
  computed: {
    find() {
      return this.$store.getters["fnd/find"];
    }
  },
  methods: {}
};
</script>



