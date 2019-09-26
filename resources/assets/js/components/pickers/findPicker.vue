
<template>
  <div>
    <template v-if="finds">
      <template v-if="(!isCreate)">
        <v-select
          label="find"
          :items="finds"
          v-model="find"
          item-text="id_string"
          return-object
          name="find"
          single-line
          box
          @change="findSelected"
        ></v-select>
      </template>

      <template v-else>
        <v-layout row wrap>
          <v-flex xs12 sm4 class="px-1">
            <v-select
              label="category"
              :items="registrationCategories"
              v-model="registration_category"
              name="category"
              single-line
              box
              @change="categoryChanged"
            ></v-select>
          </v-flex>

          <template v-if="showBasketNumberBox">
            <v-flex xs12 sm4 class="px-1">
              <v-select
                label="basket no."
                :items="basketNos"
                v-model="basket_no"
                name="basket_no"
                single-line
                box
                @change="basketNoChanged"
              ></v-select>
            </v-flex>
          </template>
          <template v-if="showItemNumberBox">
            <v-flex xs12 sm4 class="px-1">
              <v-select
                label="item no."
                :items="itemNos"
                v-model="item_no"
                name="item_no"
                single-line
                box
                @change="itemNoChanged"
              ></v-select>
            </v-flex>
          </template>
        </v-layout>
      </template>
    </template>
  </div>
</template>

    
    <!--v-flex xs12 md6 lg3 v-for="x in finds" :key="x.id">
      <v-btn @click="findSelected(x.id)">{{x.tag}}</v-btn>
    </v-flex-->



<script>
//import findPickerNew from "./findPickerNew";
//import findPickerExisting from "./findPickerExisting";

export default {
  //components: { findPickerNew },
  created() {
    console.log("findPickerExisting.created()");
  },
  destroyed() {
    console.log("findPickerExisting.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },
    ///////////////////
    //existing find
    ///////////////////
    find: {
      get() {
        return this.$store.getters["pkr/find"];
        //return { locus_id: this.$store.getters["pkr/locus_id"], locus_no: this.$store.getters["pkr/locus_no"]};
      },
      set(data) {
        this.$store.commit("pkr/findable_id", data.id);
      }
    },
    ///////////////////
    //create new find
    ///////////////////

    registrationCategories() {
      return this.$store.getters["pkr/registrationCategories"];
    },
    basketNos() {
      return this.$store.getters["pkr/basketNos"];
    },
    itemNos() {
      return this.$store.getters["pkr/itemNos"];
    },

    registration_category: {
      get() {
        return this.$store.getters["pkr/registration_category"];
      },
      set(data) {
        this.$store.commit("pkr/registration_category", data);
      }
    },

    basket_no: {
      get() {
        return this.$store.getters["pkr/basket_no"];
      },
      set(data) {
        this.$store.commit("pkr/basket_no", data);
      }
    },

    item_no: {
      get() {
        return this.$store.getters["pkr/item_no"];
      },
      set(data) {
        this.$store.commit("pkr/item_no", data);
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
    },
    finds() {
      return this.$store.getters["pkr/finds"];
    }
  },
  methods: {
    basketNoChanged() {},
    itemNoChanged() {},
    categoryChanged() {},
    findSelected(id) {
      //this.dialog = false;
      //let path = '/' + this.moduleBaseURL + '/' + this.locus_id + '/show';
      console.log("findPicker.vue find: " + JSON.stringify(this.find, null, 2));
      //this.$router.push({ path: `/loci/${this.locus_id}/show` });
    }
  }
};
</script>

