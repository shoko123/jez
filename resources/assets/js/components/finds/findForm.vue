<template>
  <v-card class="elevation-5 flex d-flex flex-column">
    <template v-if="find">
      <v-card-title class="grey py-0 mb-4">Registration details</v-card-title>
      <v-card-text class="flex">
        <v-layout row wrap>
          <v-flex xs12 lg1 class="px-1">
            <v-text-field v-model="find.date" readonly label="date" filled></v-text-field>
          </v-flex>

          <v-flex xs12 lg1 class="px-1">
            <v-text-field
              v-model="find.related_pottery_basket"
              readonly
              label="related pottery"
              filled
            ></v-text-field>
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
            <v-switch v-model="find.keep" readonly label="keep"></v-switch>
            <!--v-checkbox v-model="find.keep" readonly label="keep"></v-checkbox-->
          </v-flex>
          <v-flex xs12 lg1 class="px-1">
            <v-switch v-model="find.drawn" readonly label="drawn"></v-switch>
            <!--v-checkbox v-model="find.drawn" readonly label="drawn"></v-checkbox-->
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

        <!--v-container fluid>
            <v-checkbox v-model="checkbox" :label="`Checkbox 1: ${checkbox.toString()}`"></v-checkbox>
            <v-switch v-model="switch1" :label="`Switch 1: ${switch1.toString()}`"></v-switch>
        </v-container-->
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  name: "find-form",

  created() {
    //console.log("findForm.created()");
    //this.$store.dispatch("find", this.$route.params.id);
  },

  data() {
    return {
      checkbox: true,
      switch1: true
    };
  },
  computed: {
    find() {
      return this.$store.getters["fnd/find"];
    }
  },
  methods: {}
};
</script>



