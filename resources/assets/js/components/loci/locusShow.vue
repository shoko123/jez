<template>
  <v-form>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-text-field v-model="locus.tag" label="tag" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="locus.square" label="square" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="locus.date_opened"
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
            <v-date-picker v-model="locus.date_opened">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(locus.date_opened)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="date_closed_formatted" label="date closed" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="locus.level_opened" label="level opened" box></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field v-model="locus.level_closed" label="level closed" box></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-textarea v-model="locus.description" label="description" box></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea v-model="locus.deposit" label="deposit" box></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea v-model="locus.registration_notes" label="registration notes" box></v-textarea>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-btn color="success" to="/loci">Edit</v-btn>
        <v-btn @click="deleteLocus()" color="error">Delete</v-btn>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "locus-show",

  created() {
    this.my_locus_id = this.$route.params.id;
    this.my_locus = this.$store.getters.findLocusById(this.my_locus_id);

    //find() returns undefined on failure
    if (typeof this.my_locus === "undefined") {
      alert(
        "Locus Show - Cant find locus from URL: " +
          this.$route.params.id +
          " back to previous page."
      );
      this.$router.go(-1);
    }
  },
  /*
  watch: {
    lociPageReady(val, old_val) {
      if (!val) {
        return;
      }
      this.my_locus = this.$store.getters.findLocusById(this.my_locus_id);

      if (
        typeof this.$store.getters.findLocusById(this.my_locus_id) ===
        "undefined"
      ) {
        alert(
          "Watch - Cant find locus from URL; " +
            this.$route.params.id +
            " back to last page"
        );
        this.$router.go(-1);
      }
    }
  },
  */
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
    currentUser() {
      return this.$store.getters.currentUser;
    },

    loci() {
      return this.$store.getters.loci;
    },

    locus() {
      //return this.$store.getters.locus;
      return this.my_locus;
    },

    date_opened_formatted() {
      return !!this.locus
        ? new Date(this.locus.date_opened).toISOString().substring(0, 10)
        : "";
    },

    date_closed_formatted() {
      return !!this.locus
        ? new Date(this.locus.date_closed).toISOString().substring(0, 10)
        : "";
    }
  },
  methods: {
    deleteLocus() {
      //alert("delete locus.id: " + this.locus.id);
      axios
        .delete(`/api/loci/${this.locus.id}`)
        .then(res => {
          alert("locus " + this.locus.id + " deleted");
          this.$store.commit("setLocus", {});
          //NEED erase from loci list
          this.$router.push({ path: `/loci` });
        })
        .catch(err => console.log(err));
    }
  }
};
</script>



