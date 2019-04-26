<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <v-flex>
        <template v-if="finds">
          <v-layout row wrap>
            <v-flex xs12 md6 lg3 v-for="find in finds" :key="find.id">
              <v-card>
                <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ findTag  }}</h3>
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

    findTag() {
      if (this.find) {
        tag = 'find: ' + find.id + '. tag: ' + find.find.locus.area.year +
        '.' + find.find.locus.area.area + 'B' + find.find.basket_no;
        return tag;
      }
      return null;
    },

    find() {
      return this.$store.getters.find;
      //return this.my_locus;
    },

    finds() {
      return this.$store.getters.finds;
    }
  },

  methods: {
 
  }
};
</script>


