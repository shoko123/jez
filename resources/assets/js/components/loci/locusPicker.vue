<template>
  
    <v-layout height="100%">
      <v-btn
        class="pr-1"
        v-model="locus.tag"
        box
        slot="activator"
        label="locus tag"       
        @click="openLocusSelectorDialog()"
      >{{locus.tag}}
      </v-btn>

      <v-dialog v-model="dialog" persistent max-width="600">
        <v-card>
          <v-form @submit.prevent="onSubmit">
            <v-card-title class="headline">Choose locus tag (identifier)</v-card-title>

            <v-card-text>
              <v-layout row wrap>
                <v-flex xs12 sm6 class="px-1">
                  <v-select
                    :items="areas"
                    v-model="new_area"
                    name="area tag"
                    item-text="tag"
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

  data() {
    return {
      dialog: false,

      new_area: {},
      new_locus: {},
      new_locus_no: 0,
      loci_for_area: [],
      tag_ok: false
    };
  },

  created() {
    //this.my_area = this.areas[0];
    //this.my_locus = this.loci[0];
    //alert("in created " + JSON.stringify(this.$store.getters.areas));
    //console.log("areas:\n" + JSON.stringify(this.areas));
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
        //alert('Locus tag get()')
        /*
        return (
          this.area.year +
          "." +
          this.area.area +
          "." +
          this.locus.locus_no
        );
        */
        return this.$store.state.locus.tag
      },
      set(value) {
        //done via dialog
        //this.$store.commit("updateMessage", value);
      }
    }
  },
  methods: {
    openLocusSelectorDialog() {
      this.dialog = true;
      this.new_area = this.areas.find(x => x.id === this.locus.area_id);
      this.new_locus = this.locus;
      this.loci_for_area = this.loci.filter(
        lo => lo.area_id === this.new_area.id
      );
      //this.newAreaSelected(this.new_area.id);
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
        this.new_locus_no = Math.max.apply(Math, loci_for_area.map(function(lo) { return lo; }));
        return;
      }
      //if existing locus and same area, keep locus no
      if(this.new_area.id === this.locus.area_id) {
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
          this.$store.commit('locus', this.new_locus);
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





