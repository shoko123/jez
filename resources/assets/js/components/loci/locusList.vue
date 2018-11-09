<template>
    <div>


<v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark color="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 2" :key="`6${i}`" xs6>
        <v-card dark color="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 3" :key="`4${i}`" xs4>
        <v-card dark color="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 4" :key="`3${i}`" xs3>
        <v-card dark color="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 6" :key="`2${i}`" xs2>
        <v-card dark color="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex v-for="i in 12" :key="`1${i}`" xs1>
        <v-card dark color="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>

        <!--
        <div class="btn-wrapper">
            <router-link to="/loci/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
                <th>Locus</th>
                <th>Description</th>
                <th>Deposit</th>
                <th>Actions</th>
            </thead>
            <tbody>
                <template v-if="!loci.length">
                    <tr>
                        <td colspan="4" class="text-center">No Loci Available</td>
                    </tr>
                </template>
                <template v-else>
                    <tr v-for="locus in loci" :key="locus.id">
                        <td>{{ locus.locus }}</td>
                        <td>{{ locus.description }}</td>
                        <td>{{ locus.deposit }}</td>
                        <td>
                            <router-link :to="`/loci/${locus.id}`">View</router-link>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>  

-->

    </div>
</template>

<script>
    export default {
        name: 'locus-list',
        mounted() {
            if (this.loci.length) {
                return;
            }
            
            this.$store.dispatch('getLoci');
        },
        computed: {
            loci() {
                return this.$store.getters.loci;
            }
        }
    }
</script>

<style scoped>
.btn-wrapper {
    text-align: right;
    margin-bottom: 20px;
}
</style>