<template>
  <form @submit.prevent="onSubmit">
    <v-container fluid>
      <v-layout align-center justify-center>
        <v-flex xs12 sm10 md8>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Create/Update groundstone</v-toolbar-title>
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
                              :items="registration.areas"
                              v-model="registration.areaId"
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
                              :items="registration.loci"
                              v-model="registration.locusId"
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
                        <template v-if="registration.locusId">
                          <v-layout row wrap>
                            <v-flex xs12 sm3 class="px-1">
                              <v-select
                                label="category"
                                :items="registrationCategories"
                                v-model="registration.registrationCategory"
                                name="category"
                                item-text="name"
                                item-value="name"
                                single-line
                                box
                              ></v-select>
                            </v-flex>
                            <template v-if="registration.registrationCategory == 'AR'">
                              <v-flex xs12 sm6 class="px-1">
                                <v-text-field
                                  label="artifact no"
                                  v-model="registration.arItemNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('artifactNo')"
                                  name="artifactNo"
                                  box
                                ></v-text-field>
                              </v-flex>
                            </template>

                            <template v-else-if="registration.registrationCategory == 'GS'">
                              <v-flex xs12 sm4 class="px-1">
                                <v-text-field
                                  label="GS Basket"
                                  v-model="registration.gsBasketNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('GsBasket')"
                                  name="GsBasket"
                                  box
                                ></v-text-field>
                              </v-flex>

                              <v-flex xs12 sm4 class="px-1">
                                <v-text-field
                                  label="GS no"
                                  v-model="registration.gsItemNo"
                                  v-validate="'required'"
                                  :error-messages="errors.collect('GsNo')"
                                  name="GsNo"
                                  box
                                ></v-text-field>
                              </v-flex>
                            </template>
                          </v-layout>

                          <div>DEBUG locus has the following "Baskets":</div>
                          <v-layout
                            v-for="basket in registration.finds"
                            :key="basket.id"
                          >{{ basket.tag }}</v-layout>
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
      arItemNo: null
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

   
    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }],
  }),

  computed: {
    groundstonesForLocus() {
      if (!this.myFinds) {
        return null;
      }
      let groundstones = this.myFinds
        //.filter(find => {
        //  return find.findable_type == "groundstone";
        //})
        .map(find => ({
          id: find.id,
          tag:
            find.registration_category +
            ".B:" +
            find.basket_no +
            ".N:" +
            find.item_no
        }));
      return groundstones;
    },
    isCreate() {
      return this.$store.getters.isCreate;
    },
  },

  methods: {
    getAreasWithLoci() {
      this.$store
        .dispatch("areasWithLoci")
        .then(res => {
          this.registration.areas = res.map(area => ({
            id: area.id,
            year: area.name,
            tag: area.year + "." + area.area,
            loci: area.loci
          }));
          //set default area
          this.registration.areaId = 2;

          //console.log("areas: " + JSON.stringify(this.registration.areas));
          this.areaSelected();
        })
        .catch(err => {
          console.log("Failed to retreive areas err: " + err);
        });
    },

    areaSelected() {
      this.registration.loci = this.registration.areas.find(
        area => area.id === this.registration.areaId
      ).loci;
      //console.log("areaSelected() loci: " + JSON.stringify(this.registration.loci));
    },

    locusSelected() {
      //console.log("locusSelected() myLocusId: " + this.myLocusId);
      let payload = { locus_id: this.registration.locusId, mutate: false };

      //this.$store.dispatch("locus", payload);
      let promise = this.$store.dispatch("locus", payload);

      promise.then(res => {
        this.myLocus = JSON.parse(res);
        this.myFinds = JSON.parse(res)["finds"];

        this.registration.locus = JSON.parse(res);
        this.registration.locusId = this.registration.locus.id;

        this.registration.finds = JSON.parse(res)["finds"].map(
          this.formatBasketTag
        );

        this.setDefaultsForGroundgroundstone();
        //console.log(
        // "groundstoneCreate Got locus with these finds: " +
        //    JSON.stringify(this.registration.finds)
        //);
        //console.log("Groundgroundstones: " + JSON.stringify(this.groundstonesForLocus));
      });
      promise.catch(err => {
        console.log(
          "Failed to retrieve locus " + this.registration.locusId + " err: " + err
        );
      });
    },

    formatBasketTag(basket) {
      let tag = basket.registration_category;
      switch (basket.registration_category) {
        case "AR":
          tag += ".N" + basket.item_no;
          break;
        case "PT":
          tag += ".B" + basket.basket_no;
          break;
        case "FL":
          tag += ".N" + basket.item_no;
          break;
        case "GS":
          tag += ".N" + basket.basket_no;
          break;
        case "LB":
          tag += ".N" + basket.item_no;
          break;
      }
      let basketFormatted = {
        registrationCategory: basket.registration_category,
        id: basket.id,
        basketNo: basket.basket_no,
        itemNo: basket.item_no,
        tag: tag
      };
      return basketFormatted;
    },

    setDefaultsForGroundgroundstone() {
      console.log("finds: " + JSON.stringify(this.registration.finds));
      this.registration.registrationCategory = 'GS';
      let GSs = this.registration.finds.filter(find => {
        return find.registrationCategory == "GS";
      });
      if (GSs.length == 0) {
        this.registration.gsBasketNo = 1;
        this.registration.gsItemNo = 1;
      } else {
        this.registration.gsBasketNo = GSs[0].basketNo;
        this.registration.gsItemNo = 5;
        //registration.itemNo = GSs.reduce((max, p) => p.y > max ? p.y : max, GSs[0].itemNo);
      }

      let ARs = this.registration.finds.filter(find => {
        return find.registrationCategory == "AR";
      });
      if (ARs.length == 0) {
        this.registration.arBasketNo = 1;
      } else {
        this.registration.arItemNo =
          1 +
          ARs.reduce(
            (max, p) => (p.itemNo > max ? p.itemNo : max),
            ARs[0].itemNo
          );
      }

      /*
      console.log("GSs: " + JSON.stringify(GSs));
      console.log(
        "Default GS- basket: " +
          this.registration.gsBasketNo +
          " item: " +
          this.registration.gsItemNo
      );
      console.log("ARs: " + JSON.stringify(ARs));
      console.log("Default AR: " + this.registration.arItemNo);
      */
    },
    onSubmit() {
      console.log("onSubmit()");

      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          //alert('Form Submitted!');
          this.sendToServer();
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
        locus_id: this.registration.locusId,
        registration_category: this.registration.registrationCategory,
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
        findable_type: 'Groundstone',
        findable_id: null,
      };

      if (this.registration.registrationCategory == "GS") {
        find.basket_no = this.registration.gsBasketNo;
        find.item_no = this.registration.gsItemNo;
      } else if (this.registration.registrationCategory == "AR") {
        find.basket_no = null;
        find.item_no = this.registration.arItemNo;
      }

      let new_groundstone = {
        groundstone: this.groundstone,
        find: find,
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
            color: "green",
          });
          //alert("groundstone + find created! id: " + res.data.id);
          //router.push({ path: `/user/${userId}` }) // -> /user/123
          this.$router.push({ path: `/groundstones/${res.data.groundstone.id}` });
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("groundstoneCreate failed\n" + err);
        });
    }
  }
};
</script>
