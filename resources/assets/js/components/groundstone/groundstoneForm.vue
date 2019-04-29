<template>
  <v-form v-if="groundstone">
    <v-container fluid>
      <v-layout row wrap class="ma-0 pa-0">
        
        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.description" readonly label="description" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.type" readonly label="type" box></v-text-field>
        </v-flex> 
        
        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.notes" label="notes" box></v-text-field>
        </v-flex>
      </v-layout>    
    </v-container>
  </v-form>
</template>

<script>


export default {
  name: "groundstone-form",

  created() {
    console.log("groundstoneForm.created() groundstone id:" + this.$route.params.id);
    
    this.$store.commit("isLoading", {
        value: true,
        message: "loading groundstone"
      });

      this.$store
        .dispatch('gs/groundstone', this.$route.params.id)
        .then(res => {
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          this.$store.commit("isLoading", { value: false });
          console.log("groundstoneForm received error upon dispatch" + err.response);
        });
    
    
    //this.$store.dispatch("groundstone", this.$route.params.id);
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
    groundstone() {
      return this.$store.getters['gs/groundstone'];
    },

  },
  methods: {
   
  }
};
</script>



