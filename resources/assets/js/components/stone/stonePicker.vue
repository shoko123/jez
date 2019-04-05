<template v-if="stone">
  <v-layout>
    <v-text-field>HELLO PICKER</v-text-field>
    <!--v-text-field
      v-model="stone.tag"
      box
      label="stone registrar"
    ></v-text-field-->
  </v-layout>
</template>




<script>
export default {
  name: "stone-picker",
  data() {
    return {
     
    };
  },
  
  
  computed: {
    
    stone() {     
        return this.$store.getters.stone;
    },

     stones() {     
        return this.$store.getters.stones;
    },
      

    message() {
      return "locus Welcome";
    },
  },
  methods: {
   
  },

};
</script>

