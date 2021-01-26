<template>
  <v-card class="elevation-12">
    <template v-if="render">
    <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
    <v-card-text>
      <v-btn text color="orange" @click="prevClicked" :disabled="activeTab === 0">prev</v-btn>
      <v-btn color="orange" @click="nextClicked">{{nextButtonText()}}</v-btn>
      <v-btn text color="orange" @click="cancel">cancel</v-btn>

      <v-tabs v-model="activeTab" class="primary">
        <v-tab v-for="(tab, index) in tabHeaders" :key="index" @click="initTabData(index)">{{ tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="(tab, index) in typesAndParams" :key="index">
          <v-row justify="space-around">
            <v-col cols="12" sm="10" md="8" lg="8">
              <v-sheet elevation="10" class="pa-4">
                <v-subheader>{{tabRestrictions}}</v-subheader>
                <v-chip-group multiple column>
                  <v-chip
                    v-for="param in paramsForTab"
                    :key="param.id"
                    @click="toggleParam(param)"
                    :color="param.selectedIn.newParams ? 'orange' : ''"
                    large
                  >{{ param.name }}</v-chip>
                </v-chip-group>
              </v-sheet>
            </v-col>
          </v-row>
        </v-tab-item>
      </v-tabs-items>
    </v-card-text>
    </template>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      activeTab: 0,
    };
  },
  created() {
    this.activeTab = 0;
    this.initTabData(0);
  },

  computed: {
    render() {
      return this.$store.getters[`mgr/status`].isTags;
    },
    typesAndParams() {
      return this.$store.getters[`aux/visibleNewParams`];
    },
    header() {
      return `${this.$store.getters["mgr/appStatus"].module} Tag selector`;
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

    paramsForTab() {
      return this.render ? this.typesAndParams[this.activeTab].params : [];
    },

    tabRestrictions() {
      return this.typesAndParams[this.activeTab]
        ? (this.typesAndParams[this.activeTab].required
            ? "required, "
            : "not required, ") +
            (this.typesAndParams[this.activeTab].multiple
              ? " multi-selection"
              : "single-selection")
        : "";
    },
  },

  methods: {
    initTabData() {
      this.$store.dispatch(
        `aux/newItemTabInit`,
        this.typesAndParams[this.activeTab].id
      );
    },

    toggleParam(param) {
      //console.log(`NewParamSelector.toggleParam() param: ${JSON.stringify(param, null, 2)}`);
      this.$store.dispatch(`aux/toggleOneParam`, {key:param.key, isFilter: false});
    },
    nextButtonText() {
      return this.activeTab === this.typesAndParams.length - 1
        ? "submit"
        : "next";
    },
    nextClicked() {
      if (this.activeTab === this.typesAndParams.length - 1) {
        this.$store.dispatch(`aux/sync`).then((res) => {
         console.log(`NewParamSelector.after sync, going back to item.show()`);
        this.$router.go(-1);
        this.activeTab = 0;   
        });
            
      } else {
        this.activeTab++;
        this.initTabData(this.activeTab);
      }
    },

    prevClicked() {
      this.activeTab--;
    },

    cancel() {
      this.$router.push({
        path: `${this.$router.currentRoute.path.replace("tags", "show")}`,
      });
    },
  },
};
</script>


