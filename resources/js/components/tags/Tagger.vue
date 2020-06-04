<template>
  <form name="tags">
    <v-container fluid><v-row>
        <StepButtons v-on:nextClicked="nextClicked" v-on:prevClicked="prevClicked"></StepButtons>
      </v-row>
      <v-row>
        <v-tabs v-model="activeTab" class="primary">
          <v-tab
            v-for="(tab, index) in tabHeaders"
            :key="index"
            @click="initTabData(index)"
            :disabled="disbaleTabs"
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
      </v-row>
    </v-container>
  </form>
</template>

<script>
import StepButtons from "../stepper/StepButtons";
export default {
  components: { StepButtons },
  data() {
    return {
      activeTab: null
    };
  },
  created() {
    this.activeTab = 0;
    this.initTabData(0);
  },

  computed: {
    tabHeaders() {
      return this.$store.getters[`tag/typesWithTagsShowInNewItem`].map(
        x =>
          `${x.header}${
            x.newTags.noSelected > 0 ? `(${x.newTags.noSelected})` : ``
          }`
      );
    },
    tabs() {
      return this.$store.getters[`tag/typesWithTagsShowInNewItem`]; 
    },

    tagsForTab() {
      return this.$store.getters[`tag/tags`].filter(
        x => x.type == this.tabs[this.activeTab].type
      );
    },

    disbaleTabs() {
      return this.$store.getters[`mgr/status`].isCreate;
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
    }
  },

  methods: {
    initTabData() {
      this.$store.dispatch(`tag/typeTabSelected`, this.tabs[this.activeTab].type);
    },

    toggleTag(tag) {
      this.$store.dispatch(`tag/toggleTag`, tag);
    },

    nextClicked() {
      if (this.activeTab === this.tabs.length - 1) {
        this.$store.commit("stp/moveToStep", "next");
      } else {
        this.activeTab++;
        this.initTabData(this.activeTab);
      }
    },

    prevClicked() {
      if (this.activeTab === 0) {
        this.$store.commit("stp/moveToStep", "prev");
      } else {
        this.activeTab--;
      }
    },

    handleNextButton() {}
  }
};
</script>
