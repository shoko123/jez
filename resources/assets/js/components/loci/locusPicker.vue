<template>
  <v-layout fill-height>
    <v-btn
      v-if="myLocus"
      slot="activator"
      label="locus tag"
      @click="openLocasSelectorModal()"
      >{{myLocus.tag}}
    </v-btn>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="headline">Choose locus tag (identifier)</v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  :items="areasWithTags"
                  v-model="myAreaId"
                  name="area tag"
                  item-text="tag"
                  item-value="id"
                  single-line
                  box
                  @change="areaSelected"
                  label="area"
                ></v-select>
              </v-flex>

              <template v-if="is_create_new_locus">
                <v-flex xs12 sm6 class="px-1">
                  <v-text-field
                    class="pr-1"
                    name="locus no"
                    v-model="my_locus_no"
                    v-validate="'required|min_value:1|max_value:999'"
                    :error-messages="errors.collect('locus no')"
                    label="locus number"
                    box
                  ></v-text-field>
                </v-flex>
              </template>

              <template v-else>
                <v-select
                  :items="myLociForArea"
                  v-model="myLocusId"
                  v-validate="'required'"
                  :error-messages="errors.collect('locus no')"
                  name="locus no"
                  item-text="locus"
                  item-value="id"
                  single-line
                  box
                  @change="locusSelected"
                  label="locus no"
                ></v-select>
              </template>

            </v-layout>
          </v-card-text>
          <v-card-actions>

            <v-spacer></v-spacer>

            <v-btn type="submit" primary>OK</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

  


<script>
export default {
  name: "locus-picker",
  props: {
    is_create_new_locus: {
      type: Boolean,
      default: false
    }
  },

  created() {
    //alert("in created " + JSON.stringify(this.$store.getters.areas));
    //console.log("areas:\n" + JSON.stringify(this.areas));
  },
  watch: {
    locus(newLocus, oldLocus) {
      //console.log("locusPicker.watch()");

      this.myLocus.locus_id = newLocus.id;
      this.myLocus.locus_no = newLocus.locus;
      this.myLocus.area_id = newLocus.area.id;
      this.myLocus.area_name = newLocus.area.area;
      this.myLocus.dig_year = newLocus.area.year;
      this.myLocus.tag =
        this.myLocus.dig_year +
        "." +
        this.myLocus.area_name +
        "." +
        this.myLocus.locus_no;
    }
  },

  data() {
    return {
      dialog: false,

      myLocus: {
        locus_id: null,
        area_id: null,
        area_name: null,
        dig_year: null,
        tag: null
      },
      loci_for_area: {},
      selectedAreaId: null,
      myAreaId: null,
      myArea: null,
      myLociForArea: null,
      myLocusId: null,
      areasWithLoci: null,
      areasWithTags: null,
      tag_ok: false
    };
  },

  computed: {
    loci() {
      return this.$store.getters.loci;
    },
    areas() {
      return this.$store.getters.areas;
    },
    locus() {
      return this.$store.getters.locus;
    },
  },

  methods: {
    openLocasSelectorModal() {
      this.getAreasWithLoci();
      this.dialog = true;
    },

    getAreasWithLoci() {
      axios.get("/api/areas/areasWithLoci").then(response => {
        this.areasWithLoci = response.data.areas;
        this.areasWithTags = this.areasWithLoci.map(area => ({
          id: area.id,
          year: area.name,
          tag: area.year + "." + area.area,
          loci: area.loci
        }));
        //set default area
        this.myAreaId = this.myLocus.area_id;
        this.setLociForArea();
        //console.log("setting default myAreaId: " + this.myAreaId);
      });
    },
    
    setLociForArea() {
      this.myLociForArea = this.areasWithLoci.find(
        area => area.id === this.myAreaId
      ).loci;
      //console.log("setLociForArea() myLociForArea: " + JSON.stringify(this.myLociForArea));
    },
    areaSelected() {
      //copy selected area object by id
      //console.log("areaSelected myAreaId: " + this.myAreaId);
      this.setLociForArea();
    },

    newlocusSelected(locus_id) {
      this.new_locus = this.loci_for_area.find(lo => lo.id === locus_id);
    },
    locusSelected() {
      //console.log("locusSelected() myLocusId: " + this.myLocusId);
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch("locus", this.myLocusId);
          this.dialog = false;
        } else {
          alert("Correct them errors!");
        }
      });
    }
  }
};
</script>


<style scoped>
.btn-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
</style>





