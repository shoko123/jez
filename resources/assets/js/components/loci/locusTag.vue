<template>
  <v-layout>
    <v-text-field
      class="pr-1"
      v-model="locusTag"
      box
      slot="activator"
      label="new locus tag"
      @click="openAreaSelector()"
    ></v-text-field>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="headline">Choose new locus tag (identifier)</v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  :items="myAreas"
                  v-model="myArea"
                  name="area tag"
                  item-text="tag"
                  item-value="id"
                  single-line
                  box
                  @change="newAreaSelected"
                  label="select the area this locus belongs to"
                ></v-select>
              </v-flex>

              <v-flex xs12 sm6 class="px-1">
                <v-text-field
                  class="pr-1"
                  name="locus no"
                  v-model="locus_no"
                  v-validate="'required|min_value:1|max_value:999'"
                  :error-messages="errors.collect('locus no')"
                  label="locus number"
                  box
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn type="submit" primary>submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
export default {
  created() {
    this.loadAreas();

    //this.$validator.extend('truthy', {
    //getMessage: field => 'The ' + field + ' value is not truthy.',
    //validate: value => !! value
    //});
  },
  data() {
    return {
      dialog: true,

      myArea: {},
      locus_no: "",
      myAreas: undefined,
      newLocusTag: undefined
    };
  },

  computed: {
    locusTag() {
      if (this.myArea) {
        return this.myArea.year + "." + this.myArea.area + "." + this.locus_no;
      } else {
        return null;
      }
    }
  },
  methods: {
    openAreaSelector() {
      this.dialog = true;
    },

    loadAreas() {
      this.dialog = true;

      //load all areas and format them to display in select box
      axios
        .get(`/api/areas`)
        .then(res => {
          this.myAreas = res.data.areas.map(ar => ({
            tag: ar.year + "." + ar.area,
            year: ar.year,
            area: ar.area,
            id: ar.id
          }));

          //set default area
          this.myArea = this.myAreas[0];

          //set default locus no
          this.getLikelyLocusNo(this.myArea.id);
        })
        .catch(err => {
          console.log(err);
        });
    },

    newAreaSelected(id) {
      //copy selected area object by id
      this.myArea = this.myAreas.find(x => x.id === id);

      //get the max locus number (new locus is likely to be max+1)
      this.getLikelyLocusNo(id);
    },

    getLikelyLocusNo(area_id) {
      axios
        .get(`/api/areas/${area_id}/max-locus`)
        .then(res => {
          this.locus_no = res.data.maxLocusNoForArea + 1;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getLocusByTag(tag) {
      axios
        .get(`/api/loci/locus-by-tag`)
        .then(res => {
          this.locus_no = res.data;
          alert("locus by tag");
        })
        .catch(err => {
          console.log(err);
        });

/*
      axios({
        method: "get",
        url: "/api/loci/locus-by-tag",
        data: {
          tag: 22,
          lastName: "Flintstone"
        }
        })
        .then(res => {
          this.locus_no = res.data;
          alert("locus by tag");
        })
        .catch(err => {
          console.log(err);
        });
        */
    },

    clear() {
      this.locus_no = "";
      //this.areaTag = "";
      this.$validator.reset();
    },

    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (!result) {
          // eslint-disable-next-line
          alert("Correct them errors!!");
          return;
        } else {
          //validate that tag doesn't already exists in DB
        }
      });

      alert("after validate");
    }
  }
};
</script>

