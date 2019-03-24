<template>
  <v-form v-if="my_locus">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-text-field v-model="locus_tag" label="tag" box></v-text-field>
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
          <v-text-field v-model="my_locus.date_closed_formatted" label="date closed" box></v-text-field>
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

/*
<v-layout row wrap>
        <v-btn color="success" to="/loci">Edit</v-btn>
        <v-btn @click="deleteLocus()" color="error">Delete</v-btn>
      </v-layout>
      */

export default {
  name: "locus-show",

  created() {
    //this.my_locus_id = this.$route.params.id;
    //this.my_locus = this.$store.getters.findLocusById(this.my_locus_id);
    //this.$store.commit('locus', this.my_locus);
  console.log('locusShow.created() locus id:' + this.$route.params.id)
  this.$store.dispatch('locus', this.$route.params.id);
  },


  watch: {
    locus (newLocus, oldLocus) {
      
      this.my_locus = newLocus;
      this.$router.push({ path: `/loci/${this.my_locus.id}` });
      //console.log('locusShow.watch(locus) pushing path: ' + this.$router.currentRoute.path + ' Name: ' + this.$router.currentRoute.name);
    }
  },

  
  data() {
    return {
      my_locus_id: null,
      my_locus: null,
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
    currentUser() {
      return this.$store.getters.currentUser;
    },

    loci() {
      return this.$store.getters.loci;
    },
  
    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    },
    
    locus_tag() {
      return this.my_locus.area.year + '.' + this.my_locus.area.area + '.' + this.my_locus.locus;
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
      
    }
  }
};
</script>



