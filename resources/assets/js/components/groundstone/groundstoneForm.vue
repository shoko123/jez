<template>
  <v-form v-if="groundstone">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-text-field v-model="groundstone.groundstone_type_id" readonly label="gs type" box></v-text-field>
        </v-flex>
        <v-flex xs12 sm2>
          <v-text-field v-model="groundstone.material_id" readonly label="material" box></v-text-field>
        </v-flex>


        <v-flex xs12 sm2 class="px-1">
          <v-text-field v-model="groundstone.weight" readonly label="weight" box></v-text-field>
        </v-flex>
      </v-layout>


      <v-layout row wrap>
        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.notes" label="notes" box></v-text-field>
        </v-flex>
        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.measurements" readonly label="measurements" box></v-text-field>
        </v-flex>

        <v-flex xs12 lg4>
          <v-text-field v-model="groundstone.type" readonly label="type" box></v-text-field>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "groundstone-form",

  created() {
    console.log(
      "groundstoneForm.created() groundstone id:" + this.$route.params.id
    );

    this.$store.commit("isLoading", {
      value: true,
      message: "loading groundstone"
    });

    this.$store
      .dispatch("gs/groundstone", this.$route.params.id)
      .then(res => {
        this.$store.commit("isLoading", { value: false });
      })
      .catch(err => {
        this.$store.commit("isLoading", { value: false });
        console.log(
          "groundstoneForm received error upon dispatch" + err.response
        );
      });
  },

  data() {
    return {};
  },
  computed: {
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    }
  },
  methods: {}
};
</script>



