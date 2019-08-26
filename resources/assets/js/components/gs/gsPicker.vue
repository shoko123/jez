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
                      v-model="area"
                      single-line
                      box
                      @change="season_areaSelected"
                      label="seasn/area"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 sm6 class="px-1">
                    <v-select
                      label="locus no"
                      :items="loci"
                      v-model="locus"
                      name="locus no"
                      single-line
                      box
                      @change="locusSelected(locus)"
                    ></v-select>
                  </v-flex>
                </v-layout>
                 <v-layout row wrap>
                  
                  <v-flex xs12 md6 lg3 v-for="gs in groundstonesForLocus" :key="gs.id">
                    <v-btn @click="goTo(gs.id)">{{gs.tag}}</v-btn>
                  </v-flex>
                  
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
    console.log("gsPicker.created");
  },
  destroyed() {
    console.log("picker.destroyed");
  },

  data() {
    return {
      dialog: false,
      message: "Please select area and locus",
      area: null,
      //loci: [{ id: 1, tag: "ggg" }, { id: 2, tag: "hhh" }],
      locus: null
    };
  },

  computed: {
    groundstones() {
      return this.$store.getters["gss/groundstones"];
    },
    groundstone() {
      return this.$store.getters["gss/groundstone"];
    },
    tag() {
      return this.groundstone ? this.groundstone.id_string : null;
      //return this.groundstone ? this.groundstone.tag : null;
    },

    areas() {
      return this.groundstones
        ? [
            ...new Set(
              this.groundstones.map(item => {
                let str = item.id_string.toString();
                let sections = str.split(".");
                return sections[0] + "." + sections[1];
              })
            )
          ]
        : null;
      //return this.picker.areas;
    },
    loci() {
      return this.groundstones
        ? this.groundstones
            .filter(item => {
              let str = item.id_string.toString();
              let sections = str.split(".");
              return sections[0] + "." + sections[1] === this.area;
            })
            .map(item => {
              let str = item.id_string.toString();
              let sections = str.split(".");
              return sections[2];
            })
        : null;
      //return this.picker.areas;
    },
    groundstonesForLocus() {
      return this.groundstones
        ? this.groundstones
            .filter(item => {
              let str = item.id_string.toString();
              let sections = str.split(".");
              return (
                sections[0] + "." + sections[1] == this.area &&
                sections[2] == this.locus
              );
            })
            .map(item => {
              let str = item.id_string.toString();
              let sections = str.split(".");
              let tokens = str.split(".").slice(3);
              return ({id: item.id, tag: tokens.join(".")});
              //return sections[2];
            })
        : null;
      //return this.picker.areas;
    }
  },

  methods: {
    season_areaSelected() {
      console.log("area selescted");
    },
    locusSelected(locus) {
      console.log("locus selescted: " + locus);
    },

    openModal() {
      //this.getAreasWithLoci();
      this.dialog = true;
    },

    goTo(id) {
      this.dialog = false;
      
      //NOTICE - must keep the first 'home push', else we get a double concactanated path 
      //(finds/groundstones/${old id}/show/finds/groundstones/${new id}/show) on router.beforeEach(to)
      //vue-router problem???
      this.$router.push(`/`);
      this.$router.push(`finds/groundstones/${id}/show`);
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
