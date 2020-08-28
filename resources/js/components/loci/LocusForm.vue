<template>

  <v-card class="elevation-5 flex d-flex flex-column">
    <template v-if="locus">
      <v-card-title class="grey py-0 mb-4">Locus Details</v-card-title>
      <v-card-text class="flex">
        <v-row wrap no-gutters>
          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="locus.square" readonly label="Square" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="locus.locus_above" readonly label="Locus Above" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="locus.locus_below" readonly label="Locus Below" filled></v-text-field>
          </v-col>
          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="locus.locus_co_existing" readonly label="Co-Existing" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="date_opened" readonly label="Date Opened" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="date_closed" readonly label="Date Closed" filled></v-text-field>
          </v-col>

          <v-col md4 lg2 class="px-1">
            <v-text-field v-model="locus.level_opened" readonly label="Level Opened" filled></v-text-field>
          </v-col>

          <v-col md4 lg2 class="px-1">
            <v-text-field v-model="locus.level_closed" readonly label="Level Closed" filled></v-text-field>
          </v-col>

          <v-col md4 lg1 class="px-1">
            <v-text-field v-model="locus.clean" readonly label="Clean" filled></v-text-field>
          </v-col>
        </v-row>

        <v-row wrap no-gutters>
          <v-col md6 lg4 class="px-1">
            <v-textarea
              v-model="locus.description"
              rows="1"
              auto-grow
              readonly
              label="Description"
              filled
            ></v-textarea>
          </v-col>

          <v-col md6 lg4 class="px-1">
            <v-textarea v-model="locus.deposit" rows="1" auto-grow readonly label="Deposit" filled></v-textarea>
          </v-col>

          <v-col md6 lg4 class="px-1">
            <v-textarea
              v-model="locus.registration_notes"
              rows="1"
              auto-grow
              readonly
              label="Registration Notes"
              filled
            ></v-textarea>
          </v-col>
        </v-row>
      </v-card-text>
    </template>
  </v-card>

</template>

<script>
export default {
  computed: {
    locus() {
      return this.$store.getters["mgr/item"];
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