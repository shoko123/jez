<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
    <v-card-text>
      <v-tabs v-model="categoryTabIndex" class="primary">
        <v-tab
          v-for="(cat, index) in categories"
          :key="index"
          @click="categoryClicked(index)"
        >{{ cat }}</v-tab>
      </v-tabs>

      <v-tabs v-model="activeTabIndex" class="primary">
        <v-tab v-for="(tab, index) in tabHeaders" :key="index">{{ tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTabIndex">
        <v-tab-item v-for="(type, index) in filters" :key="index">
          <v-card flat>
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="param in paramsForTab"
                      :key="param.id"
                      @click="toggleParam(param.id)"
                      :color="param.selected ? 'primary' : ''"
                      large
                    >{{ param.name }}</v-chip>
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
      categories: ["General", "Artifact Specific", "Period"],
      categoryTabIndex: 0,
      activeTabIndex: 0,
    };
  },
  created() {
    this.categoryTabIndex = 0;
    this.activeTabIndex = 0;
  },

  computed: {
    filters() {
       let filters = this.$store.getters[`aux/filters`];
      switch (this.categoryTabIndex) {
        case 0:
          return filters.filter(
            (x) => x.type_category === "General"
          );
         
        case 1:
          return filters.filter(
            (x) => x.type_category === "Module"
          );
          break;
        case 2:
          return filters.filter(
            (x) => x.type_category === "Period"
          );
          break;
      }
    },

    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Filter Selector`;
    },

    paramsForTab() {
      return this.filters[this.activeTabIndex].params;
    },

    tabHeaders() {         
      return this.filters.map(x => `${x.display_name}${x.noSelected > 0 ? `(${x.noSelected})` : ``}`);
    },
  },

  methods: {
    categoryClicked(index) {
      //console.log("categoryClicked index: " + index);
      //if(index !== this.categoryTabIndex) {
        this.activeTabIndex = 0;
      //}
    },

    toggleParam(paramId) {
      //console.log("FilterSelect.toggleParam");
      this.$store.dispatch(`aux/toggleParam`, paramId);
    },
  },
};
</script>


