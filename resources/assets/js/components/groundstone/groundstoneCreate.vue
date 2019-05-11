<template>
  <form @submit.prevent="onSubmit">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>{{headerMessage}}</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
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
                              v-model="regLocus"
                              v-validate="'required'"
                              :error-messages="errors.collect('locus no')"
                              name="locus no"
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
                                  v-model="arItemNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('artifactNo')"
                                  name="artifactNo"
                                  box
                                ></v-text-field>
                              </v-flex>
                            </template>

                            <template v-else-if="registrationCategory == 'GS'">
                              <v-flex xs12 sm4 class="px-1">
                                <v-text-field
                                  label="GS Basket"
                                  v-model="gsBasketNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('GsBasket')"
                                  name="GsBasket"
                                  box
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 sm4 class="px-1">
                                <v-text-field
                                  label="GS no"
                                  v-model="gsItemNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('GsNo')"
                                  name="GsNo"
                                  box
                                ></v-text-field>
                              </v-flex>
                            </template>
                          </v-layout>

                          <div>DEBUG finds{{finds}}</div>
                        </template>
                      </v-card-text>
                      <v-card-actions></v-card-actions>
                    </v-card>
                  </v-flex>

                  <v-flex xs8>
                    <v-card>
                      <v-card-title primary-title>
                        <v-flex xs12 sm6 class="px-1">
                          <v-textarea
                            label="description"
                            v-model="groundstone.description"
                            v-validate="'required'"
                            :error-messages="errors.collect('description')"
                            name="description"
                            box
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm6 class="px-1">
                          <v-textarea
                            label="notes"
                            v-model="groundstone.notes"
                            v-validate="'required'"
                            :error-messages="errors.collect('notes')"
                            name="notes"
                            box
                          ></v-textarea>
                        </v-flex>
                        <v-flex xs12 sm2 class="px-1">
                          <v-text-field
                            label="type"
                            v-model="groundstone.type"
                            v-validate="'required'"
                            :error-messages="errors.collect('type')"
                            name="type"
                            box
                          ></v-text-field>
                        </v-flex>
                      </v-card-title>

                      <v-card-actions></v-card-actions>
                    </v-card>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn type="submit" primary>submit</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
export default {
  created() {
    console.log("groundstoneCreate.created(). isCreate:" + this.isCreate);
    this.getAreasWithLoci();
  },

  data: () => ({
    locusHydrated: false,
    //data() {
    //  return {
      
    registration: {
      areas: [],
      loci: [],
      finds: [],
      areaId: null,
      areaTag: null,
      locusId: null,
      locus: null,
      locusFormatted: null,
      registrationCategory: null,
      gsBasketNo: null,
      gsItemNo: null,
      arItemNo: null,
      formHeader: null
    },
  
    groundstone: {
      description: null,
      notes: null,
      type: null
    },

    details: {
      description: null,
      material: null
    },

    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    isCreate() {
      return this.$store.getters.isCreate;
    },

    headerMessage() {
      return this.$store.getters.headerMessage;
    },
    gsCreateUpdate() {
      return this.$store.getters.gsCreateUpdate;
    },
    areas: {
      get() {
        return this.$store.getters.areasList;
      },
      set(data) {
        //this.$store.commit("areasList", data);
      }
    },

    areaId: {
      get() {
        return this.gsCreateUpdate.registration.areaId
        //return this.$store.getters.areaId;
      },
      set(value) {
        this.$store.commit("areaId", value);
      }
    },

    loci: {
      get() {
        return this.$store.getters.lociForArea;
      },
      set(value) {
        //this.$store.commit("setLo", value);
      }
    },
    regLocus: {
      get () {
      return this.$store.getters.regLocus;
      },
      set(value) {
        //Do nothing, set in regLocusId() action
      }
    },
    regLocusId: {
      get() {
        return this.gsCreateUpdate.registration.locusId
      },
      set(value) {
        this.locusSelected(value);
      }
    },
    finds() {
      let findString = '(' + this.$store.getters.regFindsForLocus.length + ') ';
      findString += this.$store.getters.regFindsForLocus.reduce(
        (accumulator, currentValue) => accumulator  + currentValue.tag + "; ", "");
        return findString;
    },
   
    registrationCategory: {
    get() {
        return this.gsCreateUpdate.registration.registrationCategory;
      },
      set(value) {        
        this.$store.commit("gsRegCategory", value);
      } 
    },

    gsBasketNo: {
      get() {
        return this.gsCreateUpdate.registration.gsBasketNo;
      },
      set(value) {
        this.$store.commit("gsBasketNo", value);
      }
    },
      gsItemNo: {
      get() {
        return this.gsCreateUpdate.registration.gsItemNo;
      },
      set(value) {
        this.$store.commit("gsItemNo", value);
      }
    },
      arItemNo: {
      get() {
        return this.gsCreateUpdate.registration.arItemNo;
      },
      set(value) {
        this.$store.commit("arItemNo", value);
      }
    },


  },

  methods: {
    getAreasWithLoci() {

      this.$store.commit("isLoading", { value: true, message: "loading areas" });
      this.$store
        .dispatch("areasWithLoci")
        .then(res => {
          this.registration.areas = res.map(area => ({
            id: area.id,
            year: area.name,
            tag: area.year + "." + area.area,
            loci: area.loci
          }));
          //set areasList in vuex
          this.$store.commit("areasList", res);

          //set default area
          if(this.isCreate){
          this.registration.areaId = 2;
          
          } else {
            this.registration.areaId = this.locus.areaId;
          }
          //this.$store.commit("areaId", 2);
          //console.log("areas: " + JSON.stringify(res));

          
          this.areaSelected();
           if(this.isCreate){ 
             this.locusSelected(this.locus.id);
           }
          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          console.log("Failed to retreive areas err: " + err);
          this.$store.commit("isLoading", { value: false });
        });
    },

    areaSelected() {
      this.registration.loci = this.registration.areas.find(
        area => area.id === this.registration.areaId
      ).loci;
      this.$store.commit("setLociForArea");
      //console.log("areaSelected() loci: " + JSON.stringify(this.registration.loci));
    },

    locusSelected(locusId) {
      if(this.isCreate){
      this.$store.dispatch("regLocusId", locusId).then(
        res => {
          // http success, call the mutator and change something in state
          this.locusHydrated = true;
          this.setDefaultsForGroundgroundstone();
          //console.log('store.locus data: ' + JSON.stringify(response.data.locus));
          //console.log('store.dispatch locus returned from axios ' + response.data.locus);
          //resolve(JSON.stringify(response.data.locus));
          //resolve(response.data.locus); //resolve(response);  // Let the calling function know that http is done. You may send some data back
        },
        err => {
          // http failed, let the calling function know that action did not work out
          console.log("Failed in dispatch locus err: " + err);
          this.locusHydrated = false;
        }
      );
      } else {
        this.gsBasketNo = 1;
        this.gsItemNo = 1;
        this.locusHydrated = true;
      }
    },
    categorySelected() {

    },

    setDefaultsForGroundgroundstone() {
      //console.log("finds: " + JSON.stringify(this.registration.finds));
      //this.registration.registrationCategory = "GS";
      
      
      let GSs = this.$store.getters.regFindsForLocus.filter(find => {
        return find.registrationCategory == "GS";  });
      if (GSs.length == 0) {
        //console.log("setting GS defaults to 1,1");
        this.gsBasketNo = 1;
        this.gsItemNo = 1;
      } else {
        //choose max basket, item = 1 + max for basket
        //console.log("GSs length: " + GSs.length);
        this.gsBasketNo = GSs.reduce((max, p) => p.gsBasketNo > max ? p.gsBasketNo : max, GSs[0].gsBasketNo);
        //this.registration.gsItemNo = 99;


        //filter to basket
        let gsForBasket = GSs.filter(gs => { return gs.gsBasketNo == this.gsBasketNo });
        //console.log("gsForBasket: " + JSON.stringify(gsForBasket));
        //find max item no
        this.gsItemNo =
          1 +
          gsForBasket.reduce(
            (max, p) => (p.itemNo > max ? p.itemNo : max),
            gsForBasket[0].itemNo
          );

      }




      let ARs = this.$store.getters.regFindsForLocus.filter(find => {
        return find.registrationCategory == "AR";
      });

      if (ARs.length == 0) {
        this.registration.arItemNo = 1;
      } else {
        
        this.arItemNo =
          1 +
          ARs.reduce(
            (max, p) => (p.itemNo > max ? p.itemNo : max),
            ARs[0].itemNo
          );
      }
    //console.log("default arItem: " + this.arItemNo + ' gsBasket: ' + this.gsBasketNo + ' gsItem: ' + this.gsItemNo );
     
    },
    onSubmit() {
      console.log("onSubmit()");

      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          //alert('Form Submitted!');
          //this.sendToServer();
          return;
        }
        alert("Correct them errors!");
      });
    },

    clear() {
      /*
      this.locus.locus_no = "";
      this.locus.square = "";
      this.locus.date_opened = null;
      this.locus.date_closed = null;
      this.locus.level_opened = "";
      this.locus.level_closed = "";
      this.locus.locus_above = "";
      this.locus.locus_below = "";
      this.locus.locus_co_existing = "";
      this.locus.description = "";
      this.locus.deposit = "";
      this.locus.registration_notes = "";
      this.loculs.clean = "";
      this.$validator.reset();
      */
    },

    sendToServer() {
      console.log("sendToServer()");

      let find = {
        locus_id: this.regLocusId,
        registration_category: this.registrationCategory,
        basket_no: null,
        item_no: null,
        related_pottery_basket: null,
        date: null,
        description: null,
        notes: null,
        square: null,
        periods: null,
        keep: null,
        level_top: null,
        level_bottom: null,
        quantity: null,
        weight: null,
        findable_type: "Groundstone",
        findable_id: null
      };

      if (this.gsCreateUpdate.registration.registrationCategory == "GS") {
        find.basket_no = this.gsBasketNo;
        find.item_no = this.gsItemNo;
      } else if (this.gsCreateUpdate.registration.registrationCategory == "AR") {
        find.basket_no = null;
        find.item_no = this.arItemNo;
      }

      let new_groundstone = {
        groundstone: this.groundstone,
        find: find
      };
      console.log("before create " + JSON.stringify(new_groundstone));
      
      axios
        .post("/api/groundstones/create", new_groundstone)
        .then(res => {
          console.log("success!\n" + JSON.stringify(res));
          this.$store.commit("snackbar", {
            value: true,
            message: "groundstone created",
            timeout: 4000,
            color: "green"
          });
          //alert("groundstone + find created! id: " + res.data.id);
          //router.push({ path: `/user/${userId}` }) // -> /user/123
          this.$router.push({
            path: `/groundstones/${res.data.groundstone.id}`
          });
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("groundstoneCreate failed\n" + err);
        });
        
    }
  }
};
</script>
