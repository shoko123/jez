<template>
    <v-container>
    <v-layout row wrap v-for="locus in loci" :key="locus.id" class="mb-2">
      <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
        <v-card class="info">
          <v-container fluid>
            <v-layout row>
              <v-flex xs5 sm4 md3>
                <v-img
                  
                ></v-img>
              </v-flex>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div>
                    <h5 class="white--text mb-0">{{ locus.tag }}</h5>
                    <div>Description: {{ locus.description }}</div>
                    
                    
                    <template v-if="locus.deposit !== null">
                        <div>Deposit: {{ locus.deposit }}</div>
                    </template>
                    
                    <!--
                        <div>Deposit: {{ locus.deposit }}</div>  
                    -->
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-btn flat :to="'/loci/' + locus.id">
                    <v-icon left light>arrow_forward</v-icon>
                    View Locus
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>

/*
src="https://cdn.vuetifyjs.com/images/carousel/bird.jpg"
                  height="130px"
                  */
    export default {
        name: 'locus-list',
        
        created() {
            
            //this.$store.dispatch('loci');
        }, 
        computed: {
            loci() {
                return this.$store.getters.loci;
            }
        }
       
    }
  
</script>
