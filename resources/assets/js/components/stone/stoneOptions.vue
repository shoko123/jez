<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Stones options</h1>
      </v-flex>
      <v-flex xs12 class="text-xs-center" mt-3>
        <p>Here we can checkout stones found on the dig</p>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: "stoneOptions",
  data() {
    return {
      cards: [
        { title: 'locus1', src: 'https://cdn.vuetifyjs.com/images/cards/house.jpg', flex: 12 },
        { title: '2015.S.44', src: 'https://cdn.vuetifyjs.com/images/cards/road.jpg', flex: 6 },
        { title: '2018.M.56', src: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg', flex: 6 }
      ]
      
    };
  },
  
  
  computed: {
    
    
   
  },
  methods: {
   
  },

};
</script>

