<template>
  <v-container v-if="finds" fluid grid-list-md>
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
  created() {
    console.log("LocusFinds.created()");
  },

  data() {
    return {};
  },
  computed: {
    finds() {
      return this.$store.getters["loc/item"]
        ? this.$store.getters["loc/item"].finds
        : null;
    }
  }
};
</script>



