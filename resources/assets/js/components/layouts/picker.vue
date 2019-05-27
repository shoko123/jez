<template>
  <v-layout fill-height>
    <v-btn v-if="tag" slot="activator" label="locus tag" @click="openModal()">{{tag}}</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Pick a Groundstone</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="px-1">
                    <v-select
                      :items="areas"
                      v-model="area_id"
                      name="area tag"
                      item-text="tag"
                      item-value="id"
                      single-line
                      box
                      @change="areaSelected"
                      label="area"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 class="px-1">
                    <v-select
                      label="locus no"
                      :items="loci"
                      v-model="locus_id"
                      name="locus no"
                      item-text="locus"
                      item-value="id"
                      single-line
                      box
                      @change="locusSelected"
                    ></v-select>
                  </v-flex>
                </v-layout>
                <v-layout row wrap>
                  <template v-if="locusHasGroundstones">
                  <v-flex xs12 md6 lg3 v-for="gs in finds" :key="gs.id">
                    <v-btn @click="goTo(gs.id)">{{gs.tag}}</v-btn>
                  </v-flex>
                  </template>
                  <template v-else>
                     <h1>{{message}}</h1>
                  </template>
                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="cancel" primary>Cancel</v-btn>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  created() {
    console.log("picker.created");
  },
  destroyed() {
    console.log("picker.destroyed");
  },

  data() {
    return {
      dialog: false,
      message: "Please select area and locus",
    };
  },

  computed: {
    picker() {
      return this.$store.getters["pk/picker"];
    },

    tag() {
      return this.$store.getters["gs/groundstoneFormatted"]
        ? this.$store.getters["gs/groundstoneFormatted"].tag
        : null;
    },

    areas() {
      return this.picker.areas;
    },
    loci() {
      return this.picker.loci;
    },
    
    finds: {
      get() {
      return this.picker.finds;
      },
      set(data) {
        this.$store.commit("pk/dataSetter", {
          name: "finds",
          data: data
        });
      }
    },
    area_id: {
      get() {
        return this.picker.area_id;
      },
      set(data) {
        this.$store.commit("pk/dataSetter", {
          name: "area_id",
          data: data
        });
      }
    },

    locus_id: {
      get() {
        return this.picker.locus_id;
      },
      set(data) {
        this.$store.commit("pk/dataSetter", {
          name: "locus_id",
          data: data
        });
      }
    },
    locusHasGroundstones() {
      if(! this.finds) {
        return false;
      }
      return (this.finds.length > 0);
    }
  },

  methods: {
    getAreasWithLoci() {
      this.$store.commit("isLoading", {
        value: true,
        message: "loading areas into picker"
      });

      this.$store
        .dispatch("pk/areas")
        .then(res => {
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          console.log("picker failed to get areas" + err);
          this.$store.commit("isLoading", { value: false });
        });
    },

    areaSelected(id) {
      this.area_id = id; //store we will set loci for this area
      this.finds = [];
      this.message = "Please select locus"
    },

    locusSelected() {
      //console.log("locusSelected()");
      //return;
      this.$store.commit("isLoading", {
        value: true,
        message: "loading locus into picker"
      });
      this.$store
        .dispatch("pk/locus", this.locus_id)
        .then(res => {
          //console.log("picker.vue locusSelected() finds: " + JSON.stringify(this.finds, null, 2));
          this.$store.commit("isLoading", { value: false });
          this.message = (this.finds.length > 0) ? "" : "No groundstones found in this locus";
        })
        .catch(err => {
          console.log("picker failed to get locus" + err);
          this.$store.commit("isLoading", { value: false });
        });
    },

    openModal() {
      this.getAreasWithLoci();
      this.dialog = true;
    },

    goTo(id) {
      this.dialog = false;

      this.$router.push({ path: `/groundstones/${id}` });
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
