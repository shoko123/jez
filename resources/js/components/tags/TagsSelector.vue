<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">Manage tags</v-card-title>
    <v-card-text>
      <v-btn text color="orange" @click="prevClicked" :disabled="activeTab === 0">prev</v-btn>
      <v-btn color="orange" @click="nextClicked">{{nextButtonText()}}</v-btn>
      <v-btn text color="orange" @click="cancel">cancel</v-btn>
      <v-tabs v-model="activeTab" class="primary">
        <v-tab
          v-for="(tab, index) in tabHeaders"
          :key="index"
          @click="initTabData(index)"
          :disabled=true
        >{{ tab }}</v-tab>
      </v-tabs>

      <v-tabs-items v-model="activeTab">
        <v-tab-item v-for="(tab, index) in tabs" :key="index">
          <v-row justify="space-around">
            <v-col cols="12" sm="10" md="8" lg="8">
              <v-sheet elevation="10" class="pa-4">
                <v-subheader>{{tabRestrictions}}</v-subheader>
                <v-chip-group multiple column>
                  <v-chip
                    v-for="tag in tagsForTab"
                    :key="tag.id"
                    @click="toggleTag(tag)"
                    :color="tag.selectedInNewItem ? 'primary' : ''"
                    large
                  >{{ tag.name }}</v-chip>
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
      activeTab: 0,
    };
  },
  created() {
    this.activeTab = 0;
    this.initTabData(0);
  },

  computed: {
    props() {
      return {
        isFilterNotNewItem: false,
        source: "NewTags",
      };
    },

    tabHeaders() {
      return this.$store.getters[`tag/newItemTagsByType`].map(
        (x) =>
          `${x.header}${
            x.newTags.noSelected > 0 ? `(${x.newTags.noSelected})` : ``
          }`
      );
    },
    tabs() {
      return this.$store.getters[`tag/newItemTagsByType`];
    },

    tagsForTab() {
      return this.$store.getters[`tag/tags`].filter(
        (x) => x.type == this.tabs[this.activeTab].type
      );
    },

    tabRestrictions() {
      return (
        (this.tabs[this.activeTab].mandatory
          ? "required, "
          : "not required, ") +
        (this.tabs[this.activeTab].multiple
          ? " multi-selection"
          : "single-selection")
      );
    },
  },

  methods: {
    initTabData() {
      this.$store.dispatch(
        `tag/typeTabSelected`,
        this.tabs[this.activeTab].type
      );
    },

    toggleTag(tag) {
      this.$store.dispatch(`tag/toggleTag`, tag);
    },
    nextButtonText() {
      return this.activeTab === this.tabs.length - 1 ? "submit" : "next";
    },
    nextClicked() {
      if (this.activeTab === this.tabs.length - 1) {
        this.$store.dispatch(`tag/sync`);
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


