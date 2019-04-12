<template>
  <v-form v-if="stone">
    <v-container fluid>
      <v-layout row wrap class="ma-0 pa-0">
        
        <v-flex xs12 lg4>
          <v-text-field v-model="stone.description" readonly label="description" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg4>
          <v-text-field v-model="stone.type" readonly label="type" box></v-text-field>
        </v-flex> 
        
        <v-flex xs12 lg4>
          <v-text-field v-model="stone.notes" label="notes" box></v-text-field>
        </v-flex>
      </v-layout>    
    </v-container>
  </v-form>
</template>

<script>


export default {
  name: "locus-form",

  created() {
    console.log("stoneForm.created() stone id:" + this.$route.params.id);
    this.$store.dispatch("stone", this.$route.params.id);
  },

  

  data() {
    return {
      my_locus_id: null,
      my_locus: null,
      menu: "",
      menu2: ""
    };
  },
  computed: {
    stone() {
      return this.$store.getters.stone;
    },

  },
  methods: {
    deleteStone() {}
  }
};
</script>



