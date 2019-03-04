<template>
  <v-form v-if="my_locus">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-text-field v-model="my_locus.tag" label="tag" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="my_locus.square" label="square" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
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

        <v-flex xs12 sm2>
          <v-text-field v-model="date_closed_formatted" label="date closed" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="my_locus.level_opened" label="level opened" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="my_locus.level_closed" label="level closed" box></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-textarea v-model="my_locus.description" label="description" box></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea v-model="my_locus.deposit" label="deposit" box></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea v-model="my_locus.registration_notes" label="registration notes" box></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "Locus",

  created() {
    //this.$store.commit('locus', this.$store.getters.loci[0]);
    this.my_locus = this.$store.getters.locus;
  },

  watch: {
    locus(newLocus, oldLocus) {
      this.my_locus = newLocus;
    }
  },

  data() {
    return {
      my_locus: {},
      modal: false,
      modal2: false,
      menu: "",
      menu2: ""
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },

    loci() {
      return this.$store.getters.loci;
    },

    locus: {
      get() {
        return this.$store.getters.locus;
      },
      set(value) {
        //this.$store.commit('updateMessage', value)
      }
    },

    date_opened_formatted() {
      return "date";
      //return !!this.my_locus
      //  ? new Date(this.my_locus.date_opened).toISOString().substring(0, 10)
      //  : "";
    },

    date_closed_formatted() {
      return "date";
      //return !!this.my_locus
      //  ? new Date(this.my_locus.date_closed).toISOString().substring(0, 10)
      //  : "";
    }
  },
  methods: {
    deleteLocus() {}
  }
};
</script>



