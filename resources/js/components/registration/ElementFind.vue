<template>
  <div>
    <template v-if="isPicker">
      <v-select
        label="find"
        :items="finds"
        v-model="find"
        item-text="tag"
        return-object
        name="find"
        filled
      ></v-select>
    </template>

    <template v-else>
      <v-row>
        <v-col xs12 sm4 class="px-1">
          <v-select
            label="category"
            :items="registrationOptions"
            v-model="registrationOption"
            item-text="registration_category"
            item-value="registration_category"
            return-object
            name="category"
            filled
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
            ></v-select>
          </v-col>
        </template>
        <template v-if="showItemNumberBox">
          <v-col xs12 sm4 class="px-1">
            <v-select label="item no." :items="itemNos" v-model="item_no" name="item_no" filled></v-select>
          </v-col>
        </template>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  created() {
    //console.log("findPickerExisting.created()");
  },
  destroyed() {
    //console.log("findPickerExisting.destroyed");
  },

  data() {
    return {};
  },

  computed: {
    regs() {
      return this.$store.getters["regs/regs"];
    },
    isPicker() { 
      return this.$store.getters["mgr/appStatus"].isPicker;
    },
    ///////////////////
    //existing find
    ///////////////////
    finds() {
      return this.regs.finds;
    },
    find: {
      get() {
        return this.regs.find;
        //return { locus_id: this.$store.getters["reg/locus_id"], locus_no: this.$store.getters["reg/locus_no"]};
      },
      set(data) {
        this.$store.dispatch("regs/findSelected", data);
      }
    },
    ///////////////////
    //create new find
    ///////////////////

    registrationOptions() {
      return this.regs.registrationOptions;
    },

    basketNos() {
      return this.regs.basketNos;
    },
    itemNos() {
      return this.regs.itemNos;
    },

    registrationOption: {
      get() {
        return this.$store.getters["regs/registrationOption"];
      },
      set(data) {
        this.$store.dispatch("regs/registrationOptionSelected", data);
      }
    },

    basket_no: {
      get() {
        return this.$store.getters["regs/basket_no"];
      },
      set(data) {
        this.$store.dispatch("regs/basketNoSelected", data);
      }
    },

    item_no: {
      get() {
        return this.$store.getters["regs/item_no"];
      },
      set(data) {
        this.$store.dispatch("regs/itemNoSelected", data);
      }
    },
    showItemNumberBox() {
      return this.regs.showItem;
    },
    showBasketNumberBox() {
      return this.regs.showBasket;
    }
  }
};
</script>

