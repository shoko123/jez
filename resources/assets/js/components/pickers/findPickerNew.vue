<template>
  <div>
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
  </div>
</template>

<script>
export default {
  created() {
    console.log("findPickerNew.created()");
    //this.areaSelected(this.area_id);
    //this.locusSelected(this.locus_id);
  },
  destroyed() {
    console.log("findPickerNew.destroyed");
  },

  data() {
    return {
      //locusHydrated: false,
      existingTypeForLocus: []
    };
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

    finds() {
      //finds are read from DB at locusSelected();
      return this.$store.getters["pkr/finds"];
    },
    findType() {
      return this.$store.getters["mgr/moduleItemName"];
      //return this.$store.getters["fnd/findType"];
    },

    registrationCategories() {
      return this.$store.getters["fnd/registrationCategories"];
    },

    registration_category: {
      get() {
        return this.$store.getters["fnd/registration_category"];
      },
      set(data) {
        this.$store.commit("fnd/registration_category", data);
      }
    },

    basket_no: {
      get() {
        return this.$store.getters["fnd/basket_no"];
      },
      set(data) {
        this.$store.commit("fnd/basket_no", data);
      }
    },

    item_no: {
      get() {
        return this.$store.getters["fnd/item_no"];
      },
      set(data) {
        this.$store.commit("fnd/item_no", data);
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
      this.$store.dispatch("fnd/lociListForArea", id);
    },

    locusSelected(id) {
      this.basket_no = null;
      this.item_no = null;
      this.$store.dispatch("fnd/findListForLocus", id).then(res => {
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
      console.log(`setDefaults called category: ${this.registration_category}, Basket: ${this.basket_no}, Item:  ${this.item_no}`);
      switch (this.registration_category) {
        case "PT":
          //set basket_no to 1 + max(basket_no in existingTypeForLocus)
          let PTs = this.existingTypeForLocus
            .filter(el => {
              return el.registration_category === "PT";
            });
            this.basket_no = (PTs.length == 0) ? 1 : 1 + PTs.reduce((max, p) => (p.basket_no > max ? p.basket_no : max), 0);
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
            //this.basket_no = (GSs.length == 0) ? 1 : GSs.reduce((max, p) => (p.basket_no > max ? p.basket_no : max), 1);
            let forBasket = GSs.find(p => { return p.basket_no == this.basket_no});
            this.basket_no = forBasket ? forBasket.basket_no : 1;
            //this.basket_no = (GSs.length === 0) ? 1 : GSs.find(p => { return p.basket_no == this.basket_no}).basket_no;
          }
          //set item_no to 1 + highest existing  item_no for this basket_no

          //let forBasketArray = GSs.filter(p => { return p.basket_no == this.basket_no});
          //this.basket_no = (forBasketArray.length === 0) ? 1 : 1 + forBasketArray.reduce((max, p) => (p.item_no > max ? p.item_no : max), 0);
          //console.log(`after setting basket to ${this.basket_no}, gs for basket: ${JSON.stringify(forBasketArray, null, 2)}`);
          this.item_no =
            1 +
            GSs.filter(el => {
                return (el.basket_no == this.basket_no);
              })
              .reduce((max, p) => (p.item_no > max ? p.item_no : max), 0);

          break;

        default:
          //set item_no to 1 + max(item_no in existingTypeForLocus)
          this.item_no =
            1 +
            this.existingTypeForLocus.reduce((max, p) => (p.item_no > max ? p.item_no : max), 0);
          this.basket_no = null;
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
        "locator.submit. Cat: " + 
          this.registration_category +
          " Basket: " +
          this.basket_no +
          " Item: " +
          this.item_no +
          " Errors: " +
          JSON.stringify(this.errors)
      );

      let exists = false;

      //make sure that this locator does not already exist.
      switch (this.registration_category) {
        case "AR":
          exists = this.existingTypeForLocus.some(el => el.item_no == this.item_no)
          break;

        case "GS":
          exists = this.existingTypeForLocus.some(el => el.item_no == this.item_no && el.basket_no == this.basket_no);
          break;
      }
      if (exists) {
        console.log("already exist");
        alert(`this ${this.findType} 'locator' already exists`);
        return;
      }

      //validate
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.step++;
          return;
        }
        console.log("Errors: " + JSON.stringify(this.errors));
        // alert("Correct them errors!");
      });
      
    },
    cancel() {
      console.log("cancel");
      this.$store.commit("fnd/clear", null);
      this.$router.go(-1);
    }
  }
};
</script>
