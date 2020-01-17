
<template>
  <div>
    <template v-if="finds">
      <template v-if="isCreate">
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

      <template v-else>
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
    isCreate() {
      return this.$store.getters["mgr/status"].isCreate;
    },
    ///////////////////
    //existing find
    ///////////////////
    find: {
      get() {
        return this.$store.getters["reg/find"];
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
      return this.$store.getters["reg/registrationCategories"];
    },
    basketNos() {
      return this.$store.getters["reg/basketNos"];
    },
    itemNos() {
      return this.$store.getters["reg/itemNos"];
    },

    registration_category: {
      get() {
        return this.$store.getters["reg/registration_category"];
      },
      set(data) {
        this.$store.commit("reg/registration_category", data);
      }
    },

    basket_no: {
      get() {
        return this.$store.getters["reg/basket_no"];
      },
      set(data) {
        this.$store.commit("reg/basket_no", data);
      }
    },

    item_no: {
      get() {
        return this.$store.getters["reg/item_no"];
      },
      set(data) {
        this.$store.commit("reg/item_no", data);
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
      return this.$store.getters["reg/locusFinds"];
    }
  },
  methods: {
    basketNoSelected() {},
    itemNoSelected() {},
    categorySelected() {
      this.$store.dispatch("reg/registrationCategorySelected", null);
    },
    findSelected(id) {
      console.log("ElementFind selected find: " + JSON.stringify(this.find, null, 2));
    }
  }
};
</script>

