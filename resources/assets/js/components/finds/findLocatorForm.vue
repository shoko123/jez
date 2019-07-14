<template>
  <v-stepper-content step="1">
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

      <v-layout>
         <v-btn flat @click.native="cancel">Cancel</v-btn>
         <v-btn type="submit" :disabled="!locusHydrated" color="primary">Continue</v-btn>       
      </v-layout>

      <!--v-btn type="submit" primary>submit</v-btn-->
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    console.log("findLocatorForm.created(). isCreate:" + this.isCreate);
    if (!this.isCreate) {
      this.basketNo = this.groundstone.find.basket_no;
      this.itemNo = this.groundstone.find.item_no;
      this.registrationCategory = this.groundstone.find.registration_category;
      this.findId = this.groundstone.find.id;
    }
   
    this.getAreasWithLoci();
  },
  destroyed() {
    console.log("findLocatorForm.destroyed");
  },

  data: () => ({
    //locusHydrated: false,
    ARs: null,
    GSs: null,
    //data() {
    //  return {

    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    findFormData() {
      return this.$store.getters['fn/findFormData'];
    },
    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("fn/step", data);
      }
    },
    locusHydrated: {
      get() {
        return this.findFormData.locusHydrated;
      },
      set(data) {
        this.$store.commit("fn/locusHydrated", data);
      }
    },

    isCreate() {
        return this.findFormData.isCreate;
    },

    headerMessage() {
      return this.findFormData.headerMessage;
    },

    groundstone() {
      return this.$store.getters["gs/groundstone"];
    },

    areas: {
      get() {
        return this.findFormData.registration.areas;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationAreas", data);
      }

      //return this.findFormData.registration.areas;
    },
    areaId: {
      get() {
        return this.findFormData.registration.areaId;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationAreaId", data);
      }
    },

    loci: {
      get() {
        return this.findFormData.registration.loci;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationLoci", data);
      }
    },
    locus: {
      get() {
        return this.findFormData.registration.locus;
      },
      set(data) {
        this.$store.commit("fn/findRegistrationLocusId", data.id);
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
        this.$store.commit("fn/findRegistrationFindId", value);
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
        this.$store.commit("fn/findRegistrationRegistrationCategory", value);
      }
    },

    basketNo: {
      get() {
        return this.findFormData.registration.basketNo;
      },
      set(value) {
        this.$store.commit("fn/findRegistrationBasketNo", value);
      }
    },
    itemNo: {
      get() {
        return this.findFormData.registration.itemNo;
      },
      set(value) {
        this.$store.commit("fn/findRegistrationItemNo", value);
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
          if (this.isCreate) {
            this.areaId = 2;
            this.areaSelected(this.areaId);
          } else {
            //console.log("findRegistration update groundstone is: " + JSON.stringify(this.groundstone));
            //this.areaId = this.groundstone.find.locus.areaId;
            //console.log("findRegistration update setting areaId to: " + this.groundstone.find.locus.area_id);

            //if update, copy areaId from currently displayed find
            this.areaId = this.groundstone.find.locus.area_id;
            this.areaSelected(this.areaId);
            //retreive locus
            this.locusSelected(this.groundstone.find.locus.id);
            this.step = 2;
          }

          //this.$store.commit("areaId", 2);

          //console.log("areas: " + JSON.stringify(res));

          //if (this.isCreate) {
          //  this.locusSelected(this.locus.id);
          //}

          this.$store.commit("isLoading", { value: false });
        })
        .catch(err => {
          console.log("Failed to retreive areas err: " + err);
          this.$store.commit("isLoading", { value: false });
        });
    },

    areaSelected(id) {
      this.loci = this.areas.find(area => area.id === id).loci;
      this.locusHydrated = false;
      //this.$store.commit("setLociForArea");
      //console.log("areaSelected() loci: " + JSON.stringify(this.registration.loci));
    },

    locusSelected(locusId) {
      //console.log("locusSelected() myLocusId: " + this.myLocusId);
      //let payload = { locus_id: this.registration.locusId, mutate: false };
      //let payload = { locus_id: locusId, mutate: false };
      this.$store.dispatch("fn/findRegistrationLocusId", locusId).then(
        res => {
          // http success, call the mutator and change something in state
          this.locusHydrated = true;
          this.GSs = this.findFormData.registration.finds.filter(find => {
            return (
              find.findType == "Groundstone" &&
              find.registrationCategory == "GS"
            );
          });

          this.ARs = this.findFormData.registration.finds.filter(find => {
            return (
              find.findType == "Groundstone" &&
              find.registrationCategory == "AR"
            );
          });

          if (this.isCreate) {
            this.setDefaultsForGroundgroundstone();
          } else {
            this.basketNo = this.groundstone.find.basket_no;
            this.itemNo = this.groundstone.find.item_no;
            this.registrationCategory = this.groundstone.find.registration_category;
            this.findId = this.groundstone.find.id;
          }
          /*
          console.log(
            "locus selected ARS: " +
              JSON.stringify(this.ARs, null, 2) +
              "\nGSs: " +
              JSON.stringify(this.GSs, null, 2)
          );
          */
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
    },
    categorySelected() {
      this.setDefaultsForGroundgroundstone();
    },

    setDefaultsForGroundgroundstone() {
      //console.log("finds: " + JSON.stringify(this.registration.finds));
      //this.registration.registrationCategory = "GS";

      switch (this.registrationCategory) {
        case "AR":
          this.setDefaultsForGroundgroundstoneAR();
          break;

        case "GS":
          this.setDefaultsForGroundgroundstoneGS();
          break;
      }
    },

    setDefaultsForGroundgroundstoneAR() {
      if (this.ARs.length == 0) {
        this.itemNo = 1;
      } else {
        this.itemNo =
          1 +
          this.ARs.reduce(
            (max, p) => (p.itemNo > max ? p.itemNo : max),
            this.ARs[0].itemNo
          );
      }
    },
    setDefaultsForGroundgroundstoneGS() {
      if (this.GSs.length == 0) {
        console.log("setting GS defaults to 1,1");
        this.basketNo = 1;
        this.itemNo = 1;
      } else {
        //choose max basket, item = 1 + max for basket
        console.log("GSs length: " + this.GSs.length);
        this.basketNo = this.GSs.reduce(
          (max, p) => (p.basketNo > max ? p.basketNo : max),
          this.GSs[0].basketNo
        );
        //this.registration.gsItemNo = 99;

        //filter to basket
        let gsForBasket = this.GSs.filter(gs => {
          return gs.basketNo == this.basketNo;
        });
        //console.log("gsForBasket: " + JSON.stringify(gsForBasket));
        //find max item no
        this.itemNo =
          1 +
          gsForBasket.reduce(
            (max, p) => (p.itemNo > max ? p.itemNo : max),
            gsForBasket[0].itemNo
          );

        //this.registration.gsItemNo = 5;
        //registration.itemNo = GSs.reduce((max, p) => p.y > max ? p.y : max, GSs[0].itemNo);
      }
    },
    submitForm(scope) {
      console.log(
        "locator.submit. Cat: '" +
          this.registrationCategory +
          "' B: " +
          this.basketNo +
          "I:" +
          this.itemNo +
          " Errors: " + JSON.stringify(this.errors)
          );
     
      let exists = false;
      let findId = null;
      switch (this.registrationCategory) {
        case "AR":
          if (this.ARs.some(ar => ar.itemNo == this.itemNo)) {
            console.log(`AR` + this.itemNo + ` already exists`);
            exists = true;
            findId = find.id;
          } else {
            console.log(`AR` + this.itemNo + ` doesn't exist`);
            exists = false;
          }
          break;

        case "GS":
          if (
            this.GSs.some(
              gs => gs.itemNo == this.itemNo && gs.basketNo == this.basketNo
            )
          ) {
            console.log(
              `GS basket ` +
                this.basketNo +
                `item ` +
                this.itemNo +
                ` already exists`
            );

            exists = true;
            findId = find.id;
          } else {
            console.log(
              `GS B` + this.basketNo + ` I` + this.itemNo + ` doesn't exist`
            );
            exists = false;
          }
          break;
      }
      if (exists) {
        alert("this Groundstone 'locator' already exists");
        return;
      } else {
        this.$validator.validateAll(scope).then(result => {
          if (result) {
            //make sure that this locator does not already exist.

            this.step = 2;

            return;
          }
          console.log("Errors: " + JSON.stringify(this.errors));
         // alert("Correct them errors!");
        });
      }
    },
    cancel() {
      //console.log("cancel");
      this.$store.commit("fn/findRegistrationClear", null);
      this.$router.go(-1);
    }
  }
};
</script>
