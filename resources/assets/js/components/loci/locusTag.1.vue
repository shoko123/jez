<template>
  <v-layout>
    <v-text-field
      class="pr-1"
      v-model="locus_tag"
      box
      slot="activator"
      label="new locus tag"
      @click="openAreaSelector()"
    ></v-text-field>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="headline">Choose new locus tag (identifier)</v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  v-if="myArea"
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

            <v-btn type="submit" :disabled="!valid" primary>submit</v-btn>
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
    this.tag_ok = false;
    //this.$validator.extend('truthy', {
    //getMessage: field => 'The ' + field + ' value is not truthy.',
    //validate: value => !! value
    //});
  },
  data() {
    return {
      dialog: true,

      myArea: undefined,
      locus_no: "",
      myAreas: undefined,
      newLocusTag: undefined,
      tag_ok: false
    };
  },

  watch: {
    tag_ok: function(val) {
      //alert('watcher called')
      this.dialog = !val;
    }
  },
  computed: {
    locus_tag() {
      return this.$store.getters.locus.area.year + '.' + this.$store.getters.locus.area.area + '.' + this.$store.getters.locus.locus;
      /*
      if (this.myArea) {
        return this.myArea.year + "." + this.myArea.area + "." + this.locus_no;
      } else {
        return null;
      }
      */
    },
    valid() {
      return this.errors.items.length <= 0;
    }
  },

  methods: {
    openAreaSelector() {
      this.dialog = true;
    },

    loadAreas() {
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
          //var cloneOfA = JSON.parse(JSON.stringify(a));
          //this.myArea = this.myAreas[0];
          this.myArea = JSON.parse(JSON.stringify(this.myAreas[0]));

          //set default locus no
          this.getLikelyLocusNo(this.myArea.id);

          //console.log("load areas myArea: " + this.myArea.year);
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

    getLocusByTag() {
      //axios.get("/api/loci/locus-by-tag");

      axios({
        method: "get",
        url: "/api/loci/locus-by-tag",
        params: {
          year: this.myArea.year,
          area: this.myArea.area,
          locus_no: this.locus_no
        }
      })
        .then(res => {
          if (!res.data.exists) {
            //locus doesn't exist - OK
            this.clear();
            
            this.$store.dispatch("newLocusTag", {
              year: this.myArea.year,
              area_id: this.myArea.id,
              locus_no: this.locus_no,
              area: this.myArea.area
            });

            this.tag_ok = true;
          } else {
            //this.tag_ok = false;
            alert("Locus already exists - Please change!!!");
          }
          //this.locus_no = res.data;
          //alert("locus by tag");
        })
        .catch(err => {
          console.log(err);
        });
    },

    clear() {
      //this.locus_no = "";
      //this.areaTag = "";
      this.$validator.reset();
    },

    onSubmit() {
      this.$validator.validateAll();
      this.tag_ok = false;
      this.getLocusByTag();

      /*
      this.$validator.validateAll().then(result => {
        if (!result) {
          // eslint-disable-next-line
          alert("Correct them errors!!");
          return;
        } else {
          //validate that tag doesn't already exists in DB

          //alert("before checking tag look at console");
          this.getLocusByTag();
        }
      });

      */
    }
  }
};
</script>

