<template>
  <form name="tags">
    <v-container fluid>
      <v-row wrap>
        <v-tabs v-model="activeTab" class="primary">
          <v-tab v-for="(category, index) in tabs" :key="index">{{ category }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="(category, index) in tabs" :key="index">
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="(tag, tagIndex) in tagsForTab"
                      :key="tag.id"
                      @click="toggleTag(tag, tagIndex)"
                      :color="tag.selected ? 'primary' : ''"
                      large
                    >{{ tag.name }}</v-chip>
                  </v-chip-group>
                </v-sheet>
              </v-col>
            </v-row>
          </v-tab-item>
        </v-tabs-items>
      </v-row>
      <v-row>
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
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
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} tag manager`;
    },

    tags() {
      //return this.$store.getters[`${this.$store.getters["mgr/moduleInfo"].storeModuleName}/tags`];
      return this.$store.getters[`tag/tags`];
    },

    tagsForTab() {
      if (!this.tags || !this.tabs || this.tabs.length < 1) {
        return [];
      }
      return this.tags.filter(x => x.type == this.tabs[this.activeTab]);
    },
    tabs() {
      return this.$store.getters[`tag/categories`];
    }
  },
  methods: {
    toggleTag(tag, index) {
      this.$store.dispatch(`tag/toggleTag`, tag);
    },
      nextClicked() {
      console.log(
        "Tagger.nextClicked() newTags: " + JSON.stringify(this.$store.getters["tag/newTags"], null, 2)
      );
    },

    handleNextButton() {
     
    }
  }
 
};
</script>
