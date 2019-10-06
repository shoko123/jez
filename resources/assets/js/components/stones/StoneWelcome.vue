<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome to the Stones section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card-title primary-title>
              <div>
                <h3
                  class="headline mb-0"
                >{{this.stonesCount}} items recorded. Check those options:</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="stoneList">stone List</v-btn>
              <v-btn @click="stone0">stone explorer</v-btn>
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
    stonesCount() {
      return this.$store.getters["stn/collection"] ? (this.$store.getters["stn/collection"]).length : 0;
    }
  },
  methods: {
    stoneList() {
      this.$router.push({ path: `/finds/stones/list` });
    },
    
    stone0() {
      if(this.$store.getters["stn/collection"]) {
        this.$router.push({ path: `/finds/stones/${(this.$store.getters["stn/collection"])[0].id}/show` });
      }
    }
  }
};
</script>

