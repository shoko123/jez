<template>
  <v-container fluid>
    <template v-if="locus">
      <v-card class="elevation-12">
        <v-card-title class="grey">Locus details</v-card-title>
        <v-card-text>
          <v-layout row wrap class="ma-0 pa-0">
            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="locus.square" readonly label="square" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="locus.locus_above" readonly label="locus above" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="locus.locus_below" readonly label="locus below" filled></v-text-field>
            </v-flex>
            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="locus.locus_co_existing" readonly label="co existing" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="date_opened" readonly label="date opened" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="date_closed" readonly label="date closed" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg2 class="px-1">
              <v-text-field v-model="locus.level_opened" readonly label="level opened" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg2 class="px-1">
              <v-text-field v-model="locus.level_closed" readonly label="level closed" filled></v-text-field>
            </v-flex>

            <v-flex xs12 lg1 class="px-1">
              <v-text-field v-model="locus.clean" readonly label="clean" filled></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap ma-0 pa-0>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea
                v-model="locus.description"
                rows="1"
                auto-grow
                readonly
                label="description"
                filled
              ></v-textarea>
            </v-flex>

            <v-flex xs12 lg4 class="px-1">
              <v-textarea
                v-model="locus.deposit"
                rows="1"
                auto-grow
                readonly
                label="deposit"
                filled
              ></v-textarea>
            </v-flex>

            <v-flex xs12 lg4 class="px-1">
              <v-textarea
                v-model="locus.registration_notes"
                rows="1"
                auto-grow
                readonly
                label="registration notes"
                filled
              ></v-textarea>
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

  data() {
    return {};
  },

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