<template>
  <v-form v-if="find">
    <v-container fluid>
      <v-layout row wrap class="ma-0 pa-0">
        
        <v-flex xs12 lg4>
          <v-text-field v-model="find.description" readonly label="description" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg4>
          <v-text-field v-model="find.type" readonly label="type" box></v-text-field>
        </v-flex> 
        
        <v-flex xs12 lg4>
          <v-text-field v-model="find.notes" label="notes" box></v-text-field>
        </v-flex>
      </v-layout>    
    </v-container>
  </v-form>
</template>

<script>


export default {
  name: "locus-form",

  created() {
    console.log("findForm.created() find id:" + this.$route.params.id);
    this.$store.dispatch("find", this.$route.params.id);
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
    find() {
      return this.$store.getters.find;
    },

  },
  methods: {
    deletefind() {}
  }
};
</script>



