<template>
  <v-form v-if="groundstone">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-text-field v-model="groundstone_type" readonly label="gs type" box></v-text-field>
        </v-flex>
        <v-flex xs12 sm2>
          <v-text-field v-model="material" readonly label="material" box></v-text-field>
        </v-flex>
        <v-flex xs12 sm2 class="px-1">
          <v-text-field v-model="groundstone.weight" readonly label="weight" box></v-text-field>
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 lg4>
          <v-textarea v-model="groundstone.notes" label="notes" box></v-textarea>
        </v-flex>
        <v-flex xs12 lg4>
          <v-textarea v-model="groundstone.measurements" readonly label="measurements" box></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "groundstone-form",

  created() {
    //console.log("groundstoneForm.created() groundstone id:" + this.$route.params.id);
    this.getGroundstone(this.$route.params.id);
  },
  watch: {
    $route(to, from) {
      //console.log('gsForm.watch($route) to: ' + to.path + '\n' + JSON.stringify(to.params));
      this.getGroundstone(to.params.id);
    },
  },
  
  data() {
    return {};
  },
  computed: {
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    },
    groundstone_type() {
      return this.groundstone.groundstone_type
        ? this.groundstone.groundstone_type.name
        : "";
    },
    material() {
      return this.groundstone.material ? this.groundstone.material.name : "";
    },

    changeGroundstone: function() {
      return this.getGroundstone(this.$store.state.route.params);
    },
  },
  methods: {
    getGroundstone(id) {
      //console.log("groundstoneForm.getGroundstone() id:" + id);
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
    }
  }
};
</script>



