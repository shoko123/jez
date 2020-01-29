
<template>
  <div v-if="registration">
    <template v-if="isPicker">
      <v-select
        label="find"
        :items="finds"
        v-model="find"
        item-text="tag"
        return-object
        name="find"
        filled
        @change="findSelected"
      ></v-select>
    </template>

    <template v-else>
      <v-row>
        <v-col xs12 sm4 class="px-1">
          <v-select
            label="category"
            :items="registrationCategories"
            v-model="registration_category"
            name="category"
            filled
            @change="categorySelected"
          ></v-select>
        </v-col>

        <template v-if="showBasketNumberBox">
          <v-col xs12 sm4 class="px-1">
            <v-select
              label="basket no."
              :items="basketNos"
              v-model="basket_no"
              name="basket_no"
              filled
              @change="basketNoSelected"
            ></v-select>
          </v-col>
        </template>
        <template v-if="showItemNumberBox">
          <v-col xs12 sm4 class="px-1">
            <v-select
              label="item no."
              :items="itemNos"
              v-model="item_no"
              name="item_no"
              filled
              @change="itemNoSelected"
            ></v-select>
          </v-col>
        </template>
      </v-row>
    </template>
  </div>
</template>

<script>
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
    registration() {
      return this.$store.getters["reg/registration"];
    },
    isPicker() {
      return this.$store.getters["mgr/status"].isPicker;
    },
    ///////////////////
    //existing find
    ///////////////////
    find: {
      get() {
        return this.registration.find;
        //return { locus_id: this.$store.getters["reg/locus_id"], locus_no: this.$store.getters["reg/locus_no"]};
      },
      set(data) {
        this.$store.commit("reg/findable_id", data.id);
      }
    },
    ///////////////////
    //create new find
    ///////////////////

    registrationCategories() {
      return this.registration.registrationCategories;
    },
    basketNos() {
      return this.registration.basketNos;
    },
    itemNos() {
      return this.registration.itemNos;
    },

    registration_category: {
      get() {
        return this.registration.registration_category;
      },
      set(data) {
        this.$store.commit("reg/registration_category", data);
      }
    },

    basket_no: {
      get() {
        return this.registration.basket_no;
      },
      set(data) {
        this.$store.commit("reg/basket_no", data);
      }
    },

    item_no: {
      get() {
        return this.registration.item_no;
      },
      set(data) {
        this.$store.commit("reg/item_no", data);
      }
    },
    showItemNumberBox() {
      return this.registration.showItem;
    },
    showBasketNumberBox() {
      return this.registration.showBasket;
    },
    finds() {
      return this.registration.locusFinds;
    }
  },
  methods: {
    basketNoSelected() {},
    itemNoSelected() {},
    categorySelected() {
      this.$store.dispatch("reg/registrationCategorySelected", null);
    },
    findSelected(id) {
      console.log(
        "ElementFind selected find: " + JSON.stringify(this.find, null, 2)
      );
    }
  }
};
</script>

