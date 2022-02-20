<template>
  <v-card v-if="showSelector" class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{ header }}</v-card-title>
    <v-card-text>
      <v-btn color="orange" @click="prevClicked" :disabled="overallFirst"
        >prev</v-btn
      >
      <v-btn :color="nextButtonColor" @click="nextClicked">{{
        nextButtonText
      }}</v-btn>
      <v-divider vertical></v-divider>
      <v-btn v-if="!overallLast" class="ml-4" color="green" @click="submit"
        >Submit</v-btn
      >
      <v-btn color="red" @click="cancel">cancel</v-btn>

      <v-tabs v-model="categoryTabIndex" class="primary">
        <v-tab v-for="(cat, index) in categories" :key="index">{{
          cat.text
        }}</v-tab>
      </v-tabs>

      <v-tabs v-model="groupTabIndex" class="primary">
        <v-tab v-for="(tab, index) in groups" :key="index">{{
          tab.text
        }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="groupTabIndex">
        <v-tab-item v-for="(tab, index) in groups" :key="index">
          <v-row justify="space-around">
            <v-col cols="12" sm="10" md="8" lg="8">
              <v-sheet elevation="10" class="pa-4">
                <v-subheader>{{ tabRestrictions }}</v-subheader>
                <v-chip-group multiple column>
                  <v-chip
                    v-for="param in params"
                    :key="param.id"
                    @click="toggleParam(param)"
                    :color="param.selectedIn.newParams ? 'orange' : ''"
                    large
                    >{{ param.name }}</v-chip
                  >
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      categoryTabIndex: 0,
      groupTabIndex: 0,
    };
  },

  computed: {
    showSelector() {
      return this.$store.getters["mgr/status"].isTags;
    },

    header() {
      return `(${this.$store.getters["mgr/module"]}) ${this.$store.getters["mgr/item"].tag} Tag selector`;
    },

    categories() {
      return this.$store.getters["aux/categories"](false).map((x) => ({
        ...x,
        text: `${x.name}${x.selectedCount > 0 ? `(${x.selectedCount})` : ``}`,
      }));
    },

    groups() {
      return this.$store.getters["aux/groupsForCategory"](
        this.categories[this.categoryTabIndex].name,
        false
      ).map((x) => ({
        ...x,
        text: `${x.display_name}${x.count > 0 ? `(${x.count})` : ``}`,
      }));
    },

    safeGroupTabIndex() {
      //As groups changes length according to visibility of members,
      //(and groupTabIndex is unaware of this) we must protect array access.
      return this.groupTabIndex >= this.groups.length ? 0 : this.groupTabIndex;
    },

    params() {
      return this.groups[this.safeGroupTabIndex].params;
    },

    tabRestrictions() {
      return (
        (this.groups[this.safeGroupTabIndex].required ? "" : "not ") +
        "required, " +
        (this.groups[this.safeGroupTabIndex].multiple ? "multi" : "single") +
        "-selection"
      );
    },

    isLastCategory() {
      return this.categoryTabIndex === this.categories.length - 1;
    },
    isLastGroup() {
      return this.groupTabIndex === this.groups.length - 1;
    },
    overallFirst() {
      return this.categoryTabIndex === 0 && this.groupTabIndex === 0;
    },
    overallLast() {
      return this.isLastCategory && this.isLastGroup;
    },

    nextButtonText() {
      return this.overallLast ? "submit" : "next";
    },
    nextButtonColor() {
      return this.overallLast ? "green" : "orange";
    },
  },

  methods: {
    toggleParam(param) {
      this.$store.dispatch(`aux/toggleOneParam`, {
        key: param.key,
        isFilter: false,
      });
    },

    nextClicked() {
      if (this.overallLast) {
        this.submit();
      } else {
        if (this.isLastGroup) {
          this.groupTabIndex = 0;
          this.categoryTabIndex++;
        } else {
          this.groupTabIndex++;
        }
      }
    },

    prevClicked() {
      //Assume that it will not be called with overallFirst (disabled at html level)
      if (this.groupTabIndex === 0) {
        this.categoryTabIndex--;
        this.groupTabIndex = this.groups.length - 1;
      } else {
        this.groupTabIndex--;
      }
    },

    submit() {
      this.$store.dispatch(`aux/sync`).then((res) => {
        console.log(`NewParamSelector.after sync, going back to item.show()`);
        this.$store.dispatch("mgr/goToRoute", {
          module: this.$store.getters["mgr/module"],
          action: "show",
          dot: this.$store.getters["mgr/item"].dot
        });
        //this.$store.dispatch("mgr/goToRoute", "back");
      });
    },

    cancel() {
      this.$store.dispatch("mgr/goToRoute", "back");
    },
  },
};
</script>


