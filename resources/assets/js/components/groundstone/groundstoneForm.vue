<template>
  <v-container fluid>
    <template v-if="groundstone">
      <v-card class="elevation-12">
        <v-card-text>
          <v-card-title>
            <h2>Groundstone details:</h2>
          </v-card-title>
          <v-layout row wrap>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="groundstone_type" readonly label="gs type" box></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="material" readonly label="material" box></v-text-field>
            </v-flex>
            <v-flex xs12 sm2 class="px-1">
              <v-text-field v-model="groundstone.weight" readonly label="weight" box></v-text-field>
            </v-flex>
          </v-layout>

          <v-layout row wrap>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="groundstone.notes" readonly label="notes" box></v-textarea>
            </v-flex>
            <v-flex xs12 lg4 class="px-1">
              <v-textarea v-model="groundstone.measurements" readonly label="measurements" box></v-textarea>
            </v-flex>
          </v-layout>
        </v-card-text>
      </v-card>
    </template>
  </v-container>
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
    }
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
    }
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
          
          console.log(
            "groundstoneForm received error upon dispatch" + err.response
          );

          this.$store.commit("isLoading", { value: false });
          /*
          this.$store.commit("snackbar", {
            value: true,
            message: "Failed to retreive groundstone. Please login",
            timeout: 5000,
            color: "red",
            mode: ""
          });
          this.$router.push({ path: "/login" });
          */
         
        });
    }
  }
};
</script>



