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
        <v-tab v-for="(tab, index) in groups" :key="index">{{ tab.text }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="groupTabIndex">
        <v-tab-item v-for="(type, index) in groups" :key="index">
          <v-card flat>
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="param in paramsForGroup"
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
  created() {
    this.categoryTabIndex = 0;
    this.groupTabIndex = 0;
  },

  computed: {
    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Filter Selector`;
    },

    categories() {
      return this.$store.getters["aux/categoriesFilters"].map((x) => ({
        ...x,
        text: `${x.name}${x.selectedCount > 0 ? `(${x.selectedCount})` : ``}`,
      }));
    },

    groups() {
      return this.$store.getters["aux/groupsForCategory"](
        this.categories[this.categoryTabIndex].name,
        true
      ).map((x) => ({
        ...x,
        text: `${x.display_name}${x.count > 0 ? `(${x.count})` : ``}`,
      }));
    },

    paramsForGroup() {
      return this.groups[this.groupTabIndex]
        ? this.groups[this.groupTabIndex].params
        : [];
    },
  },

  methods: {
    categoryClicked(index) {
      //console.log("categoryClicked index: " + index);
      //if(index !== this.categoryTabIndex) {
      this.groupTabIndex = 0;
      //}
    },

    toggleParam(key) {
      //console.log(`FilterSelectForm.toggleParam(key: ${JSON.stringify(key, null, 2)}`);
      //console.log(`FilterSelectForm.toggleParam(key: ${key}`);

      this.$store.dispatch(`aux/toggleOneParam`, { key: key, isFilter: true });
    },
  },
};
</script>


