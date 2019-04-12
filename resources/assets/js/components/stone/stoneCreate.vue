<template>
  <v-container fluid>
    <v-layout align-center justify-center>
      <v-flex xs12 sm10 md8>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>Create/Update Stone</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submit">
              <v-container grid-list-md text-xs-center class="ma-0 pa-0">
                <v-layout row wrap>
                  <v-flex xs4>
                    <v-card>
                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline mb-0">Registration</h3>
                        </div>
                      </v-card-title>
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
                          <v-flex xs12 sm6 class="px-1">
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
                          </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                          <v-flex xs12 sm4 class="px-1">
                            <v-select
                              :items="registrationCategories"
                              v-model="myRegistrationCategory"
                              name="category"
                              item-text="name"
                              item-value="id"
                              single-line
                              box
                              label="category"
                            ></v-select>
                          </v-flex>
                          <template v-if="myRegistrationCategory">
                            <v-flex xs12 sm6 class="px-1">
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
                            </v-flex>
                          </template>
                          <template v-else></template>
                        </v-layout>
                      </v-card-text>
                      <v-card-actions></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs8>
                    <v-card>
                      <v-card-title primary-title>
                        <div>
                          <h3 class="headline mb-0">Description</h3>
                          <div>{{ card_text }}</div>
                        </div>
                      </v-card-title>

                      <v-card-actions>
                        <v-btn flat color="orange">Share</v-btn>
                        <v-btn flat color="orange">Explore</v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn type="submit" primary>submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  created() {
    console.log("stoneCreate.created()");
    this.getAreasWithLoci();
  },
  data() {
    return {
      card_text: "RRRRRRRRR",
      myLocus: {
        locus_id: null,
        area_id: null,
        area_name: null,
        dig_year: null,
        tag: null
      },
      loci_for_area: {},
      myAreaId: null,
      myArea: null,
      myLociForArea: null,
      myLocusId: null,
      myAreas: null,
      areasWithTags: null,
      registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }],
      myRegistrationCategory: 0,
      myArtifactsForLocus: [],
      myArtifactId: null,
      myGroundstonesForLocus: [],
      myGroundstoneId: null,
      tag_ok: false
    };
  },
  computed: {
    areas() {
      return this.$store.getters.areasWithLoci;
    },

    loci() {
      return this.$store.getters.loci;
    },

    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    }
  },

  methods: {
    submit() {
      console.log("submit()");
      if (this.$refs.form.validate()) {
        //this.$store.dispatch("userJoin", {
        // email: this.email,
        //  password: this.password
        //});
      }
    },

    getAreasWithLoci() {
      this.$store
        .dispatch("areasWithLoci")
        .then(res => {
          //copy retreived data to local var
          this.myAreas = res;
          this.areasWithTags = this.myAreas.map(area => ({
            id: area.id,
            year: area.name,
            tag: area.year + "." + area.area,
            loci: area.loci
          }));
          //set default area
          this.myAreaId = 2;
          this.areaSelected();
        })
        .catch(err => {
          console.log("Failed to retreive areas err: " + err);
        });
    },

    areaSelected() {
      this.myLociForArea = this.areasWithTags.find(
        area => area.id === this.myAreaId
      ).loci;
      //console.log("setLociForArea() myLociForArea: " + JSON.stringify(this.myLociForArea));
    },

    newlocusSelected(locus_id) {
      this.new_locus = this.loci_for_area.find(lo => lo.id === locus_id);
    },
    locusSelected() {

      //console.log("locusSelected() myLocusId: " + this.myLocusId);
      let payload = { locus_id: this.myLocusId,
                mutate: false};

            //this.$store.dispatch("locus", payload);
            context.dispatch('locus', payload)
      //this.$store.dispatch("locus", this.myLocusId);
    },
    onSubmit() {
      console.log("submit()");
    }
  }
};
</script>
