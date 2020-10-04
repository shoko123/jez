<template>
  <div>
    <template v-if="isPicker">
      <v-dialog v-model="dialog" width="800">
        <template v-slot:activator="{ on, attrs }">
          <v-text-field
            v-model="tag"
            label="Finds"
            filled
            v-bind="attrs"
            v-on="on"
          >
          </v-text-field>
        </template>

        <v-card>
          <v-card-title>Pick a Find</v-card-title>
          <v-card-text>
            <v-row wrap>
              <v-chip
                v-for="(item, index) in collection"
                :key="item.value"
                class="font-weight-normal ma-2 body-1"
                @click="select(index)"
                >{{ item.text }}</v-chip
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-dialog>
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
            <v-select
              label="artifact no."
              :items="artifactNos"
              v-model="artifact_no"
              name="artifact_no"
              filled
            ></v-select>
          </v-col>
        </template>
      </v-row>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
  
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
      },
    },

    collection() {
      return this.$store.getters["regs/finds"];
    },

    index() {
      return this.$store.getters["regs/newItem"].findIndex;
    },
    tag() {
      return  (this.index && this.collection) ? this.collection[this.index].text : "Choose";
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
    artifactNos() {
      return this.regs.artifactNos;
    },

    registrationOption: {
      get() {
        return this.$store.getters["regs/registrationOption"];
      },
      set(data) {
        this.$store.dispatch("regs/registrationOptionSelected", data);
      },
    },

    basket_no: {
      get() {
        return this.$store.getters["regs/basket_no"];
      },
      set(data) {
        this.$store.dispatch("regs/basketNoSelected", data);
      },
    },

    artifact_no: {
      get() {
        return this.$store.getters["regs/artifact_no"];
      },
      set(data) {
        this.$store.dispatch("regs/artifactNoSelected", data);
      },
    },
    showItemNumberBox() {
      return this.regs.showItem;
    },
    showBasketNumberBox() {
      return this.regs.showBasket;
    },
  },
  methods: {
    openModal(val) {
      this.dialog = val;
    },

    select(index) {
      console.log(
        "setting findIndex to: " +
          index +
          "\nValue: " +
          JSON.stringify(this.collection[index], null, 2)
      );
      this.$store.dispatch("regs/findSelected", index);
      this.openModal(false);
    },
  },
};
</script>

