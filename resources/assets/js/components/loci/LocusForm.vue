<template>
  <v-container fluid>
    <template v-if="locus">
      <v-card class="elevation-12">
        <v-card-text>
      <v-layout row wrap class="ma-0 pa-0">
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="locus.square" label="square" box></v-text-field>
        </v-flex>


        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="locus.locus_above" label="locus above" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="locus.locus_below" label="locus below" box></v-text-field>
        </v-flex>
        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="locus.locus_co_existing" label="co existing" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="date_opened" readonly label="date opened" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="date_closed" readonly label="date closed" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg2 class="px-1">
          <v-text-field v-model="locus.level_opened" label="level opened" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg2 class="px-1">
          <v-text-field v-model="locus.level_closed" label="level closed" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg1 class="px-1">
          <v-text-field v-model="locus.clean" label="clean" box></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap ma-0 pa-0>
        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="locus.description" rows="1" auto-grow label="description" box></v-textarea>
        </v-flex>

        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="locus.deposit" rows="1" auto-grow label="deposit" box></v-textarea>
        </v-flex>

        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="locus.registration_notes" rows="1" auto-grow label="registration notes" box></v-textarea>
        </v-flex>
      </v-layout>
      </v-card-text>
      </v-card>
    </template>
  </v-container>
</template>

<script>
export default {
  created() {
    console.log("locusForm.created() locus id:" + this.$route.params.id);
  },

  data() { return {}; },
  
  computed: {
    locus() {
      return this.$store.getters["loc/item"];
    },

    date_opened() {
      return this.locus.date_opened
        ? new Date(this.locus.date_opened).toISOString().substring(0, 10)
        : "";
    },

    date_closed() {
      return this.locus.date_closed
        ? new Date(this.locus.date_closed).toISOString().substring(0, 10)
        : "";
    }
  }
};
</script>