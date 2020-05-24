<template>
  <div>
    <SubMenuFilter />
    <v-container fluid>
      <v-card class="elevation-12">
        <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
        <v-card-text>
          <v-tabs v-model="activeTab" class="primary">
            <v-tab v-for="(tab, index) in tabHeaders" :key="index">{{ tab }}</v-tab>
          </v-tabs>
          <v-tabs-items v-model="activeTab">
            <v-tab-item v-for="(category, index) in tabs" :key="index">
              <v-card flat>
                <v-row justify="space-around">
                  <v-col cols="12" sm="10" md="8" lg="8">
                    <v-sheet elevation="10" class="pa-4">
                      <v-chip-group multiple column>
                        <v-chip
                          v-for="(tag, tagIndex) in tagsForTab"
                          :key="tag.id"
                          @click="toggleTag(tag, tagIndex)"
                          :color="tag.selectedInFilter ? 'primary' : ''"
                          large
                        >{{ tag.name }}</v-chip>
                      </v-chip-group>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SubMenuFilter from "./SubMenuFilter";

export default {
  components: {
    SubMenuFilter
  },
  data() {
    return {
      activeTab: null
    };
  },
  created() {
    this.activeTab = 0;
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} query manager`;
    },

    tagsForTab() {
      return this.$store.getters[`tag/tags`].filter(x => x.type == this.tabs[this.activeTab]);
    },

    tabHeaders() {
      return this.$store.getters[`filters/filtersByType`].map(
        x => `${x.header}${x.filters.noSelected > 0 ? `(${x.filters.noSelected})` : ``}`
      );
    },

    tabs() {
      return this.$store.getters[`filters/filtersByType`].map(x => x.type);
    }
  },
  
  methods: {
    toggleTag(tag, index) {
      this.$store.dispatch(`tag/toggleTag`, {tag: tag, isFilterNotNewItem: true});
    }
  }
};

</script>
