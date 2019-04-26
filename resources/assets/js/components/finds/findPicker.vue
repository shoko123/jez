<template>
  <v-layout  fill-height>
    <v-btn  v-if="find"
    hint="findHint()"
    >{{find.tag}}</v-btn>
  </v-layout>
</template>




<script>
export default {
  name: "find-picker",
  data() {
    return {
     
    };
  },
  
  
  computed: {
    
    find() {     
        return this.$store.getters.findFormatted;
    },

    findHint() {
      return "find id"  + this.find.id;
    },

     finds() {     
        return this.$store.getters.finds;
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

