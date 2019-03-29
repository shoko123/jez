<!--
<template>
  <v-container v-if="locus">
    <div>locusFinds</div>
    <template v-if="finds">
      <v-layout row wrap v-for="find in finds" :key="find.id" class="mb-2">
        <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
          <v-card class="info">
            <v-container fluid>
              <v-layout row>
                <v-flex xs5 sm4 md3>
                  <v-img></v-img>
                </v-flex>
                <v-flex xs7 sm8 md9>
                  <v-card-title primary-title>
                    <div>
                      <h5 class="white--text mb-0">{{ find.id + '. ' + find.registration_category }}</h5>
                      <div>Description: {{ find.description }}</div>
                    </div>
                  </v-card-title>
                  <v-card-actions></v-card-actions>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>
-->


<template>
  <v-container v-if="locus" fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="finds">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="find in finds" :key="find.id">
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ find.id + '. ' + find.registration_category }}</h3>
                    <div>Description: {{ find.description }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn flat color="orange">Share</v-btn>
                  <v-btn flat color="orange">Explore</v-btn>
                </v-card-actions>
              </v-card>
            </v-flex>
          </v-layout>
        </template>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "locus-finds",

  created() {
    console.log("locusFinds.created()");
  },

  watch: {
    locus(newLocus, oldLocus) {
      if (newLocus) {
        let finds = newLocus.finds;
        /*
        finds.forEach(item => {
          console.log(
            "Cat: " +
              item.registration_category +
              " Description: " +
              item.description
          );
        });
        */
      }
    }
  },

  data() {
    return {
      myLocus: null
    };
  },
  computed: {
    finds() {
      if (this.locus) {
        return this.locus.finds;
      }
      return null;
    },

    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    },

    loci() {
      return this.$store.getters.loci;
    }
  },

  methods: {
    deleteLocus() {}
  }
};
</script>



