<template>
  <v-layout  fill-height>
    <v-btn  v-if="stone"
    hint="stoneHint()"
    >{{stone.tag}}</v-btn>
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
        return this.$store.getters.stoneFormatted;
    },

    stoneHint() {
      return "stone id"  + this.stone.id;
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

<style scoped>
    .toolbar {
        width: 20px
    }
</style>

