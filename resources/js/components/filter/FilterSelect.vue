<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
    <v-card-text>
      <v-tabs v-model="activeTabIndex" class="primary">
        <v-tab v-for="(tab, index) in tabHeaders" :key="index">{{ tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTabIndex">
        <v-tab-item v-for="(type, index) in typesAndParams" :key="index">
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
      activeTabIndex: 0,
    };
  },
  created() {
    this.activeTabIndex = 0;
  },

  computed: {
    typesAndParams() {
      return this.$store.getters[`aux/filters`];
    },

    header() {
      return `"${this.$store.getters["mgr/moduleInfo"].itemName}" filters selector`;
    },

    paramsForTab() {
      return this.typesAndParams[this.activeTabIndex].params;
    },

    tabHeaders() {
      return this.typesAndParams.map(function (x, index) {
        let noSelected = x.params.reduce(
          (accumulator, param) => accumulator + (param.selected ? 1 : 0),
          0
        );
        return `${x.display_name}${noSelected > 0 ? `(${noSelected})` : ``}`;
      });
    },
  },

  methods: {
    toggleParam(paramId) {
      //console.log("FilterSelect.toggleParam");
      this.$store.dispatch(`aux/toggleParam`, paramId);
    },
  },
};
</script>


