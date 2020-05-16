<template>

 <v-container fluid class="ma-0 pa-0">
  <v-card class="elevation-12">
    <template v-if="find">
      <v-card-title class="grey py-0 mb-4">Registration details</v-card-title>
      <v-card-text class="flex">
        <v-row wrap no-gutters>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.date" readonly label="date" filled></v-text-field>
          </v-col>

          <v-col xs12 lg1 class="px-1">
            <v-text-field
              v-model="find.related_pottery_basket"
              readonly
              label="related pottery"
              filled
            ></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.square" readonly label="square" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.level_top" readonly label="level-top" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.level_bottom" readonly label="level-bottom" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-switch v-model="find.keep" readonly label="keep"></v-switch>          
            <!--v-checkbox v-model="keep" readonly label="keep"></v-checkbox-->
          </v-col>
         
        </v-row>
        <v-row wrap no-gutters>
          <v-col xs12 lg4 class="px-1">
            <v-textarea v-model="find.description" rows="1"
              auto-grow readonly label="description" filled></v-textarea>
          </v-col>
          <v-col xs12 lg4 class="px-1">
            <v-textarea v-model="find.notes" rows="1"
              auto-grow readonly label="notes" filled></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>
 </v-container>
</template>

<script>
export default {
  name: "find-form",

  created() {
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
    },
  },
  methods: {}
};
</script>



