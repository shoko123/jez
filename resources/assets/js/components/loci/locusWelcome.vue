<template>
  <v-layout>
    <v-text-field
      v-model="message"
      >
    </v-text-field>
  </v-layout>
</template>


<script>
export default {
  name: "locusWelcome",
  data() {
    return {
      
    };
  },
  
  
  computed: {
    areas() {
      return this.$store.getters.areas;
    },
    
    locus: {
      get() {
        return this.$store.getters.locus;
      },
      set(value) {
        //this.$store.commit('updateMessage', value)
      }
    },
    message() {
      return "Welcome! current locus: " + this.locus.tag;
    },
  },
  methods: {
    
    locus() {
      console.log(this.areasFormatted);
      console.log("selected area: " + this.areaId);
    },
  },

};
</script>

