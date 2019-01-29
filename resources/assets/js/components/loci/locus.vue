<template>

  <v-form>
    <template v-show="locus">
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
    </template>
  </v-form>
</template>

<script>

export default {
  name: "locus",

  created() {
      /*
      if(this.locus.keys.length === 0)

    if (this.$store.getters.locus) {
      console.log("locusMain hydrate - already hydrates");
      return;
    },
    */
  },
  
  data() {
    return {
      my_locus_id: undefined,
      my_locus: {},
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      first: "John",
      last: "Doe",
      modal: false,
      modal2: false,
      menu: "",
      menu2: ""
    };
  },
  computed: {
    
    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
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
  },
  methods: {
    deleteLocus() {
    },
  }
};
</script>



