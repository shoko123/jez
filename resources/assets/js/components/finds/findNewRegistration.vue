<template>
  <form @submit.prevent="submitForm('find-locator')" data-vv-scope="find-locator">
    <v-container grid-list-md text-xs-center class="ma-0 pa-0">
      <v-layout row wrap>
        <v-flex xs4>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="px-1">
              <v-select
                label="area"
                :items="areas"
                v-model="area_id"
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
                v-model="locus_id"
                v-validate="'required'"
                :error-messages="errors.collect('find-locator.locus_id')"
                name="locus_no"
                item-text="locus"
                item-value="id"
                single-line
                box
                @change="locusSelected"
              ></v-select>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12 sm4 class="px-1">
              <v-select
                label="category"
                :items="registrationCategories"
                v-model="registration_category"
                name="category"
                single-line
                box
                @change="categorySelected"
              ></v-select>
            </v-flex>

            <template v-if="showBasketNumberBox">
              <v-flex xs12 sm4 class="px-1">
                <v-text-field
                  label="Basket no"
                  v-model="basket_no"
                  v-validate="'required|between:1,999'"
                  :error-messages="errors.collect('find-locator.basketNo')"
                  name="basketNo"
                  box
                  @change="setDefaults"
                ></v-text-field>
              </v-flex>
            </template>
            <template v-if="showItemNumberBox">
              <v-flex xs12 sm4 class="px-1">
                <v-text-field
                  label="Item no"
                  v-model="item_no"
                  v-validate="'required|between:1,999'"
                  :error-messages="errors.collect('find-locator.artifactNo')"
                  name="artifactNo"
                  box
                ></v-text-field>
              </v-flex>
            </template>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>

    <v-layout>
      <v-btn flat @click.native="cancel">Cancel</v-btn>
      <v-btn type="submit" :disabled="!enableNextButton" color="primary">Continue</v-btn>
    </v-layout>
  </form>
</template>

<script>
export default {
  created() {
    console.log("findNewRegistration(). isCreate:" + this.isCreate);
    this.areaSelected(this.area_id);
    this.locusSelected(this.locus_id);
  },
  destroyed() {
    console.log("findNewRegistration.destroyed");
  },

  data() {
    return {
      //locusHydrated: false,
      ARs: [],
      GSs: [],
      existingTypeForLocus: []
    };
  },

  computed: {
    isCreate() {
      return this.$store.getters["mg/isCreate"];
    },

    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },

    areas() {
      return this.$store.getters["fn/areas"];
    },
    loci() {
      //loci are read from DB at areaSelected();
      return this.$store.getters["fn/loci"];
    },

    finds() {
      //finds are read from DB at locusSelected();
      return this.$store.getters["fn/findListForLocus"];
    },
    findType() {
      return this.$store.getters["mg/moduleItemName"];
      //return this.$store.getters["fn/findType"];
    },

    registrationCategories() {
      return this.$store.getters["fn/registrationCategories"];
    },

    area_id: {
      get() {
        return this.$store.getters["fn/area_id"];
      },
      set(data) {
        this.$store.commit("fn/area_id", data);
      }
    },
    locus_id: {
      get() {
        return this.$store.getters["fn/locus_id"];
      },
      set(data) {
        this.$store.commit("fn/locus_id", data);
      }
    },

    registration_category: {
      get() {
        return this.$store.getters["fn/registration_category"];
      },
      set(data) {
        this.$store.commit("fn/registration_category", data);
      }
    },

    basket_no: {
      get() {
        return this.$store.getters["fn/basket_no"];
      },
      set(data) {
        this.$store.commit("fn/basket_no", data);
      }
    },

    item_no: {
      get() {
        return this.$store.getters["fn/item_no"];
      },
      set(data) {
        this.$store.commit("fn/item_no", data);
      }
    },
    showItemNumberBox() {
      return this.registration_category !== "PT";
    },
    showBasketNumberBox() {
      return (
        this.registration_category === "PT" ||
        this.registration_category === "GS"
      );
    }
  },

  methods: {
    areaSelected(id) {
      this.$store.dispatch("fn/lociListForArea", id);
    },

    locusSelected(id) {
      this.basket_no = null;
      this.item_no = null;
      this.$store.dispatch("fn/findListForLocus", id).then(res => {
        // http success, call the mutator and change something in state

        this.existingTypeForLocus = this.finds.filter(find => {
          return find.findable_type === this.findType;
        });

        console.log(
          "existingTypeForLocus: " +
            JSON.stringify(this.existingTypeForLocus, null, 2)
        );
        this.setDefaults();
      });
    },
    categorySelected() {
      this.setDefaults();
    },

    setDefaults() {

      switch (this.registration_category) {
        case "PT":
          //set basket_no to 1 + max(basket_no in existingTypeForLocus)
          let PTs = this.existingTypeForLocus
            .filter(el => {
              return el.registration_category === "PT";
            });
            this.basket_no = (PTs.length == 0) ? 1 : PTs.reduce((max, p) => (p.basket_no > max ? p.basket_no : max), 0);
            this.item_no = 0;
          break;

        case "GS":
          //groundsteones have both basket and item numbers
          //invoked on change in category or basket_no.
          //set to some existing basket_no
          let GSs = this.existingTypeForLocus.filter(el => {
            return el.registration_category === "GS";
          });

          if(!this.basket_no) {
            this.basket_no = (GSs.length == 0) ? 1 : GSs.reduce((max, p) => (p.basket_no > max ? p.basket_no : max), 1);
          }
          //set item_no to 1 + highest existing  item_no for this basket_no
          this.item_no =
            1 +
            GSs.filter(el => {
                return (el.basket_no === this.basket_no);
              })
              .reduce((max, p) => (p.item_no > max ? p.item_no : max), 0);

          break;

        default:
          //set item_no to 1 + max(item_no in existingTypeForLocus)
          this.item_no =
            1 +
            this.existingTypeForLocus.reduce(
              (max, p) => (p.item_no > max ? p.item_no : max),
              this.existingTypeForLocus[0].item_no
            );
          this.basket_no = 0;
      }

      console.log(
        "setDefault basket: " + this.basket_no + " item: " + this.item_no
      );
    },

    enableNextButton() {
      return true;
    },

    submitForm(scope) {
      console.log(
        "locator.submit. Cat: '" +
          this.registration_category +
          "' B: " +
          this.basket_no +
          "I:" +
          this.item_no +
          " Errors: " +
          JSON.stringify(this.errors)
      );

      let exists = false;
      let findId = null;
      switch (this.registration_category) {
        case "AR":
          if (this.existingTypeForLocus.some(el => el.item_no == this.item_no)) {
            console.log(`AR` + this.item_no + ` already exists`);
            exists = true;
            findId = find.id;
          } else {
            console.log(`AR` + this.item_no + ` doesn't exist`);
            exists = false;
          }
          break;

        case "GS":
          if (
            this.existingTypeForLocus.some(
              el => el.item_no == this.item_no && el.basket_no == this.basket_no
            )
          ) {
            console.log(
              `GS basket ` +
                this.basket_no +
                `item ` +
                this.item_no +
                ` already exists`
            );

            exists = true;
            findId = find.id;
          } else {
            console.log(
              `GS B` + this.basket_no + ` I` + this.item_no + ` doesn't exist`
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

            this.step++;

            return;
          }
          console.log("Errors: " + JSON.stringify(this.errors));
          // alert("Correct them errors!");
        });
      }
    },
    cancel() {
      console.log("cancel");
      this.$store.commit("fn/clear", null);
      this.$router.go(-1);
    }
  }
};
</script>
