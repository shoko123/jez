<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Welcome to the Groundstones section</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">Check those options:</h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn @click="groundstoneList">groundstone List</v-btn>
              <v-btn @click="groundstone0">groundstone explorer</v-btn>
              <v-btn flat color="orange">Explore</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
export default {
  name: "groundstoneWelcome",
  data() {
    return {};
  },

  computed: {},
  methods: {
    groundstoneList() {
      this.$router.push("/groundstones/list");
    },
    groundstone0() {
      let groundstones = this.$store.getters["gs/groundstones"];
      let id = groundstones[0].id;

      this.$router.push({ path: `/groundstones/${id}` });
    }
  }
};
</script>

