<template>
  <v-layout fill-height>
    <!--<v-text-field
      class="pr-1"
      v-model="myLocus.tag"
      box
      slot="activator"
      label="new locus tag"
      @click="openAreaSelector()"v-if="myLocus"
    ></v-text-field>
    -->
    <v-btn
      v-if="myLocus"
      slot="activator"
      label="locus tag"
      @click="openLocusSelectorDialog()"
    >{{myLocus.tag}}</v-btn>
    
    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="headline">Choose locus tag (identifier)</v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex v-if="areasWithLoci" xs12 sm6 class="px-1">
                <v-select
                  :items="areasWithLoci"
                  v-model="new_area"
                  name="area tag"
                  item-text="year"
                  item-value="id"
                  single-line
                  box
                  @change="newAreaSelected"
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
                  :items="loci_for_area"
                  v-model="new_locus"
                  v-validate="'required'"
                  :error-messages="errors.collect('locus no')"
                  name="locus no"
                  item-text="locus_no"
                  item-value="id"
                  single-line
                  box
                  @change="newlocusSelected"
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
      /*
      console.log(
        "locusPicker.watch() locus id changed to: " +
          this.myLocus.locus_id +
          " tag: " +
          this.myLocus.tag
      );
      */
      //this.$router.push({ path: `/loci/${this.mymyLocus.id}` });
    }
  },

  data() {
    return {
      dialog: false,

    //myLocus: null,
    
      myLocus: {
        locus_id: null,
        area_id: null,
        area_name: null,
        dig_year: null,
        tag: null,
        loci_for_area: {},
      },
      
      areasWithLoci: null,
      //myLocus: {},

      myArea: undefined,
      myAreas: undefined,
      newLocusTag: undefined,
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
    //area() {
    //  return this.$store.getters.area;
    //},
    locus_tag: {
      get() {
        return this.locus.tag;
      },
      set(value) {
        //done via dialog
        //this.$store.commit("updateMessage", value);
      }
    }
  },
  methods: {
    openAreaSelector() {
      this.dialog = true;
    },
    openLocusSelectorDialog() {
      this.dialog = true;
      getAreasWithLoci();
      /*
      this.new_area = this.areas.find(x => x.id === this.locus.area_id);
      this.new_locus = this.locus;
      this.loci_for_area = this.loci.filter(
        lo => lo.area_id === this.new_area.id
      );
      */
      //this.newAreaSelected(this.new_area.id);
    },
    getAreasWithLoci() {
      axios.get("/api/areas/areasWithLoci").then(response => {
        this.areasWithLoci = response.data;
      });
    },
    newAreaSelected(id) {
      //copy selected area object by id
      this.new_area = this.areas.find(x => x.id === id);
      //console.log("my area:\n" + JSON.stringify(this.area));
      //get list of loci for selected area
      this.loci_for_area = this.loci.filter(
        lo => lo.area_id === this.new_area.id
      );

      //if creating a new locus set new_locus_no to max locus_no + 1 and return
      if (this.is_create_new_locus) {
        this.new_locus_no = Math.max.apply(
          Math,
          loci_for_area.map(function(lo) {
            return lo;
          })
        );
        return;
      }
      //if existing locus and same area, keep locus no
      if (this.new_area.id === this.locus.area_id) {
        return;
      }
      //new area - choose first locus
      this.new_locus = this.loci_for_area.find(lo => lo === lo);
    },

    newlocusSelected(locus_id) {
      this.new_locus = this.loci_for_area.find(lo => lo.id === locus_id);
    },
    onSubmit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          //this.$store.commit('area', this.new_area);
          this.$store.commit("locus", this.new_locus);
          //this.locus = this.new_locus;
          this.dialog = false;
          //console.log("new area:\n" + JSON.stringify(this.area));
          console.log("new locus:\n" + JSON.stringify(this.locus));
          // eslint-disable-next-line
          //alert('Form Submitted!');
          //this.sendToServer();

          //alert ('before router push');
          this.$router.push({ path: `/loci/${this.locus.id}` });
          //const locus_id = '48'
          //this.$router.push({ path: '/loci/48' });
          //this.$router.push({ path: '/loci', params: {new_locus.id}} ); // -> /user/123
          //this.$router.push({ path: `/loci/48` });
          return;
        }
        alert("Correct them errors!");
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





