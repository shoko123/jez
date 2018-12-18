<template>
  <v-form>
    <v-container fluid>
      <template v-if="locus !== null">
        <v-layout row wrap>
          <v-flex xs12 sm2>
            <v-text-field v-model="locus.tag" label="tag" box></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <v-text-field v-model="locus.square" label="square" box></v-text-field>
          </v-flex>

          <v-flex xs12 sm2>
            <v-text-field v-model="date_opened_formatted" label="date opened" box></v-text-field>
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
      </template>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "locus-show",

  created() {
    this.$store.dispatch("LocusGet", this.$route.params.id);
  },

  data() {
    return {
      items: ["Foo", "Bar", "Fizz", "Buzz"],
      first: "John",
      last: "Doe"
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },

    loci() {
      return this.$store.getters.loci;
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
    },
    locus_id() {
      return this.$route.params.id;
    },
    locus() {
      return this.$store.getters.locus;
    }
  },
  methods: {
    deleteLocus() {
      alert("delete locus.id: " + this.locus.id);
      axios
        .delete(`/api/loci/${this.locus.id}`)
        .then(res => alert("locus deleted"))
        .catch(err => console.log(err));
    }
  }
};
</script>


