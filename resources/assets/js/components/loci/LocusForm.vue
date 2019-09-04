<template>
  <v-container fluid>
    <template v-if="my_locus">
      <v-card class="elevation-12">
        <v-card-text>
      <v-layout row wrap class="ma-0 pa-0">
        <v-flex xs12 lg2 class="px-1">
          <v-text-field v-model="my_locus.square" label="square" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg2 class="px-1">
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="my_locus.date_opened"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              class="pr-1"
              slot="activator"
              v-model="date_opened_formatted"
              label="date opened"
              prepend-icon="event"
              readonly
              box
            ></v-text-field>
            <v-date-picker v-model="my_locus.date_opened">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(my_locus.date_opened)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
        </v-flex>

        <!--
        <v-flex xs12 lg2>
          <v-text-field v-model="my_locus.date_closed_formatted" label="date closed" box></v-text-field>
        </v-flex>
        -->

        <v-flex xs12 lg2 class="px-1">
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="my_locus.date_closed"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              class="pr-1"
              slot="activator"
              v-model="date_closed_formatted"
              label="date closed"
              prepend-icon="event"
              readonly
              box
            ></v-text-field>
            <v-date-picker v-model="my_locus.date_closed">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(my_locus.date_closed)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
        </v-flex>

        <v-flex xs12 lg3 class="px-1">
          <v-text-field v-model="my_locus.level_opened" label="level opened" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg3 class="px-1">
          <v-text-field v-model="my_locus.level_closed" label="level closed" box></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap ma-0 pa-0>
        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="my_locus.description" label="description" box></v-textarea>
        </v-flex>

        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="my_locus.deposit" label="deposit" box></v-textarea>
        </v-flex>

        <v-flex xs12 lg4 class="px-1">
          <v-textarea v-model="my_locus.registration_notes" label="registration notes" box></v-textarea>
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
    return {
      menu: "",
      menu2: ""
    };
  },
  computed: {
    my_locus() {
      return this.$store.getters["loc/item"];
    },

    date_opened_formatted() {
      return !!this.my_locus
        ? new Date(this.my_locus.date_opened).toISOString().substring(0, 10)
        : "";
    },

    date_closed_formatted() {
      return !!this.my_locus
        ? new Date(this.my_locus.date_closed).toISOString().substring(0, 10)
        : "";
    }
  }
};
</script>