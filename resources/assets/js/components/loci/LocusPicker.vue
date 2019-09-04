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
                      :items="loci"
                      v-model="locus_id"
                      item-text="locus_no"
                      item-value="locus_id"
                      label="locus no"
                      name="locus no"
                      single-line
                      box
                      @change="locusSelected"
                    ></v-select>
                  </v-flex>
                </v-layout>
                 <v-layout row wrap>

                </v-layout>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn @click="goTo()" :disabled="disableButton">select</v-btn>
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
    console.log("LocusPicker.created");
  },
  destroyed() {
    console.log("LocusPicker.destroyed");
  },

  data() {
    return {
      dialog: false,
      area: null,
      locus_id: null
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
      if(!this.item) {
        return null;
      }
      let sections = this.item.id_string.split('.');
      let tag = sections[0] + '/' + sections[1] + '/' + parseInt(sections[2], 10);
      return tag;
    },
    disableButton() {
      return !this.locus_id;
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
              return {locus_id: item.id, locus_no: parseInt(sections[2], 10) };
            })
        : null;
    },
  },

  methods: {
    seasonAreaSelected() {
      console.log("area selescted");
    },
    locusSelected() {
      console.log("locus selescted id: " + this.locus_id);
      //this.locus = locus;
    },

    openModal() {
      this.dialog = true;
    },

    goTo() {
      this.dialog = false;     
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      //console.log("findPicker.goto: " + path);
      this.$router.push({ path: `/loci/${this.locus_id}/show` });     
    },

    cancel() {
      this.dialog = false;
    }
  }
};
</script>
