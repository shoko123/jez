<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome to the Pottery section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card-title primary-title>
              <div>
                <h3
                  class="headline mb-0"
                >{{this.potteryCount}} items recorded. Check those options:</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="potteryList">pottery List</v-btn>
              <v-btn @click="pottery0">pottery explorer</v-btn>
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
    potteryCount() {
      return this.$store.getters["ptr/collection"] ? (this.$store.getters["ptr/collection"]).length : 0;
    }
  },
  methods: {
    potteryList() {
      this.$router.push({ path: `/finds/pottery/list` });
    },
    
    pottery0() {
      if(this.$store.getters["ptr/collection"]) {
        this.$router.push({ path: `/finds/pottery/${(this.$store.getters["ptr/collection"])[0].id}/show` });
      }
    }
  }
};
</script>

