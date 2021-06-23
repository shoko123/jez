<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{ header }}</v-card-title>
    <v-card-text>
      <v-tabs v-model="categoryTabIndex" class="primary">
        <v-tab
          v-for="(cat, index) in categories"
          :key="index"
          @click="categoryClicked(index)"
          >{{ cat.text }}</v-tab
        >
      </v-tabs>

      <v-tabs v-model="groupTabIndex" class="primary">
        <v-tab
          v-for="(tab, index) in groups"
          :key="index"
          class="no-uppercase"
          >{{ tab.text }}</v-tab
        >
      </v-tabs>

      <v-tabs-items v-model="groupTabIndex">
        <v-tab-item v-for="(type, index) in groups" :key="index">
          <v-card flat>
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="param in params"
                      :key="param.id"
                      @click="toggleParam(param.key)"
                      :color="param.selectedIn.filters ? 'primary' : ''"
                      large
                      >{{ param.name }}</v-chip
                    >
                  </v-chip-group>
                </v-sheet>
              </v-col>
            </v-row>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
  </v-card>
</template>

<script>
import SubMenuFilter from "./SubMenuFilter";

export default {
  components: {
    SubMenuFilter,
  },
  data() {
    return {
      categoryTabIndex: 0,
      groupTabIndex: 0,
    };
  },

  computed: {
    header() {
      return `${this.$store.getters["mgr/module"]} Filter Selector`;
    },
    ready() {
      return this.$store.getters["mgr/ready"].collection;
    },

    categories() {
      return this.$store.getters["aux/categoriesFilter"].map((x) => ({
        ...x,
        text: `${x.name}${x.selectedCount > 0 ? `(${x.selectedCount})` : ``}`,
      }));
    },

    safeCategoryTabIndex() {
      //As categories changes length according to visibility of members,
      //(and categoryTabIndex is unaware of this) we must protect array access.
      return this.categoryTabIndex >= this.categories.length
        ? 0
        : this.categoryTabIndex;
    },

    safeGroupTabIndex() {
      //As groups changes length according to visibility of members,
      //(and groupTabIndex is unaware of this) we must protect array access.
      return this.groupTabIndex >= this.groups.length ? 0 : this.groupTabIndex;
    },
    
    groups() {
      //console.log(`FilterSelect categories: ${JSON.stringify(this.categories, null, 2)} \nsafeIndex: ${this.safeCategoryTabIndex}`);//(groups) ${JSON.stringify(payload, null, 2)}`);
      return this.$store.getters["aux/groupsForCategory"](
        this.categories[this.safeCategoryTabIndex].name,
        true
      ).map((x) => ({
        ...x,
        text: `${x.display_name}${x.count > 0 ? `(${x.count})` : ``}`,
      }));
    },

    params() {
      return this.groups[this.safeGroupTabIndex].params; //
    },
  },

  methods: {
    categoryClicked(index) {
      this.groupTabIndex = 0;
    },

    toggleParam(key) {
      this.$store.dispatch(`aux/toggleOneParam`, { key: key, isFilter: true });
    },
  },
};
</script>
<style scoped>
.no-uppercase {
  text-transform: none !important;
}
</style>


