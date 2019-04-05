<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="stones">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="stone in stones" :key="stone.id">
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ stoneTag  }}</h3>
                    <div>Description: {{ stone.description }}</div>
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

    stoneTag() {
      if (this.find) {
        tag = 'stone: ' + stone.id + '. tag: ' + stone.find.locus.area.year +
        '.' + stone.find.locus.area.area + 'B' + stone.find.basket_no;
        return tag;
      }
      return null;
    },

    stone() {
      return this.$store.getters.stone;
      //return this.my_locus;
    },

    stones() {
      return this.$store.getters.stones;
    }
  },

  methods: {
 
  }
};
</script>


