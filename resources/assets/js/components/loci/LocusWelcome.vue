<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome to the loci section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card-title primary-title>
              <div>
                <h3
                  class="headline mb-0"
                >{{this.locusCount}} items recorded. Check those options:</h3>
              </div>
            </v-card-title>
            <v-card-actions align-center>
              <v-btn @click="lociList">Loci list</v-btn>
              <v-btn @click="locus0">Loci explorer</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  data() {
    return {};
  },

  computed: {
    locusCount() {
      return this.$store.getters["loc/collection"] ? (this.$store.getters["loc/collection"]).length : 0;
    }
  },
  methods: {
    lociList() {
      this.$router.push({ path: `/loci/list` });
    },
    
    locus0() {
      if(this.$store.getters["loc/collection"]) {
        this.$router.push({ path: `/loci/${(this.$store.getters["loc/collection"])[0].id}/show` });
      }
    }
  }
};
</script>

