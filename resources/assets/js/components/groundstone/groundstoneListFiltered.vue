<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="groundstones">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="groundstone in groundstones" :key="groundstone.id">
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ groundstoneTag  }}</h3>
                    <div>Description: {{ groundstone.description }}</div>
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

    groundstoneTag() {
      if (this.find) {
        tag = 'groundstone: ' + groundstone.id + '. tag: ' + groundstone.find.locus.area.year +
        '.' + groundstone.find.locus.area.area + 'B' + groundstone.find.basket_no;
        return tag;
      }
      return null;
    },

    groundstone() {
      return this.$store.getters.groundstone;
      //return this.my_locus;
    },

    groundstones() {
      return this.$store.getters.groundstones;
    }
  },

  methods: {
 
  }
};
</script>


