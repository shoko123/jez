<template>

 <v-container fluid class="ma-0 pa-0">
  <v-card class="elevation-12">
    <template v-if="find">
      <v-card-title class="grey py-0 mb-4">Registration Details</v-card-title>
      <v-card-text class="flex">
        <v-row wrap no-gutters>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.date" readonly label="Date" filled></v-text-field>
          </v-col>

          <v-col xs12 lg1 class="px-1">
            <v-text-field
              v-model="find.related_pottery_basket"
              readonly
              label="Related Pottery"
              filled
            ></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.square" readonly label="Square" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.level_top" readonly label="Level-Top" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <v-text-field v-model="find.level_bottom" readonly label="Level-Bottom" filled></v-text-field>
          </v-col>
          <v-col xs12 lg1 class="px-1">
            <!--v-switch v-model="find.keep" readonly label="keep"></v-switch-->          
            <v-checkbox v-model="find.keep" readonly label="Keep"></v-checkbox>
          </v-col>
         
        </v-row>
        <v-row wrap no-gutters>
          <v-col xs12 lg4 class="px-1">
            <v-textarea v-model="find.description" rows="1"
              auto-grow readonly label="Description" filled></v-textarea>
          </v-col>
          <v-col xs12 lg4 class="px-1">
            <v-textarea v-model="find.notes" rows="1"
              auto-grow readonly label="Notes" filled></v-textarea>
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
  
  data() {
    return {
      checkbox: true,
    };
  },
  computed: {
    find() {
      return this.$store.getters["fnd/item"];
      //return !this.$store.getters["mgr/xhrStatus"].loadingItem
    },
  },
  methods: {}
};
</script>



