<template>
 <!--v-layout fill-height>
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
  </v-layout-->
    <form @submit.prevent="submitForm('find-locator')" data-vv-scope="find-locator">
      <v-container grid-list-md text-xs-center class="ma-0 pa-0">
        <v-layout row wrap>
          <v-flex xs4>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  label="area"
                  :items="areas"
                  v-model="areaId"
                  name="area tag"
                  item-text="tag"
                  item-value="id"
                  single-line
                  box
                  @change="areaSelected"
                ></v-select>
              </v-flex>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  label="locus no"
                  :items="loci"
                  v-model="locus"
                  v-validate="'required'"
                  :error-messages="errors.collect('find-locator.locus_no')"
                  name="locus_no"
                  item-text="locus"
                  item-value="id"
                  single-line
                  box
                  @change="locusSelected"
                ></v-select>
              </v-flex>
            </v-layout>
            <template v-if="locusHydrated">
              <v-layout row wrap>
                <v-flex xs12 sm3 class="px-1">
                  <v-select
                    label="category"
                    :items="registrationCategories"
                    v-model="registrationCategory"
                    name="category"
                    item-text="name"
                    item-value="name"
                    single-line
                    box
                    @change="categorySelected"
                  ></v-select>
                </v-flex>
                <template v-if="registrationCategory == 'AR'">
                  <v-flex xs12 sm6 class="px-1">
                    <v-text-field
                      label="artifact no"
                      v-model="itemNo"
                      v-validate="'required|between:1,999'"
                      :error-messages="errors.collect('find-locator.artifactNo')"
                      name="artifactNo"
                      box
                    ></v-text-field>
                  </v-flex>
                </template>

                <template v-else-if="registrationCategory == 'GS'">
                  <v-flex xs12 sm4 class="px-1">
                    <v-text-field
                      label="GS Basket"
                      v-model="basketNo"
                      v-validate="'required|between:1,999'"
                      :error-messages="errors.collect('find-locator.basketNo')"
                      name="basketNo"
                      box
                    ></v-text-field>
                  </v-flex>

                  <v-flex xs12 sm4 class="px-1">
                    <v-text-field
                      label="GS no"
                      v-model="itemNo"
                      v-validate="'required|between:1,999'"
                      :error-messages="errors.collect('find-locator.itemNo')"
                      name="itemNo"
                      box
                    ></v-text-field>
                  </v-flex>
                </template>
              </v-layout>

              <div>DEBUG finds{{findsString}}</div>
            </template>
          </v-flex>
        </v-layout>
      </v-container>
    </form>

</template>

<script>
export default {
  created() {
    console.log("picker.created");
    this.getAreasWithLoci();
  },
  destroyed() {
    console.log("picker.destroyed");
  },

 data() {
    return {};
  },

  computed: {
   
    locusHydrated: {
      get() {
        return this.findFormData.locusHydrated;
      },
      set(data) {
        this.$store.commit("locusHydrated", data);
      }
    },

    areas: {
      get() {
        return this.findFormData.registration.areas;
      },
      set(data) {
        this.$store.commit("findRegistrationAreas", data);
      }

      //return this.findFormData.registration.areas;
    },
    areaId: {
      get() {
        return this.findFormData.registration.areaId;
      },
      set(data) {
        this.$store.commit("findRegistrationAreaId", data);
      }
    },

    loci: {
      get() {
        return this.findFormData.registration.loci;
      },
      set(data) {
        this.$store.commit("findRegistrationLoci", data);
      }
    },
    locus: {
      get() {
        return this.findFormData.registration.locus;
      },
      set(data) {
        this.$store.commit("findRegistrationLocusId", data.id);
      }
    },
    locusId: {
      get() {
        return this.findFormData.registration.locusId;
      },
      set(value) {
        this.locusSelected(value);
      }
    },
    findId: {
      get() {
        return this.findFormData.registration.id;
      },
      set(value) {
        this.$store.commit("findRegistrationFindId", value);
      }
    },

    findsForLocus() {
      return this.findFormData.registration.locus.finds;
    },

    findsString() {
      let findString = "(" + this.findFormData.registration.finds.length + ") ";
      findString += this.findFormData.registration.finds.reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.tag + "(" + currentValue.findType + "); ",
        ""
      );
      return findString;
    },

    registrationCategory: {
      get() {
        return this.findFormData.registration.registrationCategory;
      },
      set(value) {
        this.$store.commit("findRegistrationRegistrationCategory", value);
      }
    },

    basketNo: {
      get() {
        return this.findFormData.registration.basketNo;
      },
      set(value) {
        this.$store.commit("findRegistrationBasketNo", value);
      }
    },
    itemNo: {
      get() {
        return this.findFormData.registration.itemNo;
      },
      set(value) {
        this.$store.commit("findRegistrationItemNo", value);
      }
    }
  },

  methods: {
    
    getAreasWithLoci() {
      this.$store.commit("isLoading", {
        value: true,
        message: "loading areas"
      });

      this.$store
        .dispatch("areasWithLoci")
        .then(res => {
          this.areas = res.map(area => ({
            id: area.id,
            year: area.name,
            tag: area.year + "." + area.area,
            loci: area.loci
          }));
          //set areasList in vuex
          //this.$store.commit("areasList", res);

          //set default area
       
            this.areaId = 2;
            this.areaSelected(this.areaId);

          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          console.log("Failed to retreive areas err: " + err);
          this.$store.commit("isLoading", { value: false });
        });
    },

    areaSelected(id) {
      this.loci = this.areas.find(area => area.id === id).loci;
      //this.$store.commit("setLociForArea");
      //console.log("areaSelected() loci: " + JSON.stringify(this.registration.loci));
    },

    locusSelected(locusId) {
      //console.log("locusSelected() myLocusId: " + this.myLocusId);
      //let payload = { locus_id: this.registration.locusId, mutate: false };
      //let payload = { locus_id: locusId, mutate: false };
      this.$store.dispatch("findRegistrationLocusId", locusId).then(
        res => {
          // http success, call the mutator and change something in state
          this.locusHydrated = true;
          
        },
        err => {
          // http failed, let the calling function know that action did not work out
          console.log("Failed in dispatch locus err: " + err);
          this.locusHydrated = false;
        }
      );
    },
   
    submitForm(scope) {
     
      
    },
  }
};
</script>
