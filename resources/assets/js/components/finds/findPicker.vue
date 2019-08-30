<template>
  <v-layout fill-height>
    <v-btn v-if="tag" slot="activator" label="tag" @click="openModal()">{{tag}}</v-btn>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-container>
        <v-layout align-center justify-center>
          <v-flex xs12>
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>Pick a Find</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-layout row wrap>
                  <v-flex xs12 sm6 class="px-1">
                    <v-select
                      :items="areas"
                      v-model="area"
                      single-line
                      box
                      @change="seasonAreaSelected"
                      label="season/area"
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
                  
                  <v-flex xs12 md6 lg3 v-for="item in itemsForLocus" :key="item.id">
                    <v-btn @click="goTo(item.id)">{{item.tag}}</v-btn>
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
    console.log("findPicker.created");
  },
  destroyed() {
    console.log("findPicker.destroyed");
  },

  data() {
    return {
      dialog: false,
      area: null,
      locus: null
    };
  },

  computed: {
    moduleBaseURL() {
      return this.$store.getters["mgr/moduleBaseURL"];
    },
    collection() {
      return this.$store.getters["mgr/collection"];
    },
    item() {
      return this.$store.getters["mgr/item"];
    },

    tag() {
      return this.item ? this.item.tag : null;
    },

    //we do not load areas from DB, but from current collection
    areas() {
      return this.collection
        ? [
            ...new Set(
              this.collection.map(item => {
                let str = item.id_string.toString();
                let sections = str.split(".");
                return sections[0] + "." + sections[1];
              })
            )
          ]
        : null;
    },

    loci() {
      return this.collection
        ? this.collection
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
    },

    itemsForLocus() {
      return this.collection
        ? this.collection
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
            })
        : null;
    }
  },

  methods: {
    seasonAreaSelected() {
      console.log("area selescted");
    },
    locusSelected(locus) {
      console.log("locus selescted: " + locus);
    },

    openModal() {
      this.dialog = true;
    },

    goTo(id) {
      this.dialog = false;     
      let path = '/' + this.moduleBaseURL + '/' + id + '/show';
      //console.log("findPicker.goto: " + path);
      this.$router.push({ path: `${path}` });     
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
