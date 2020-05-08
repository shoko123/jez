<template>
  <form name="tags">
    <v-container fluid>
      <v-row wrap>
        <v-tabs v-model="activeTab" class="primary">
          <v-tab
            v-for="(tab, index) in tabHeaders"
            :key="index"
            @click="tabClicked(index)"
          >{{ tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="(tab, index) in tabs" :key="index">
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="(tag, tagIndex) in tagsForTab"
                      :key="tag.id"
                      @click="toggleTag(tag)"
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
    this.tabClicked(0);
  },

  computed: {
    tabHeaders() {
      return this.$store.getters[`tag/tagsByType`].map(
        x => `${x.type}${x.noSelected > 0 ? `(${x.noSelected})` : ``}`
      );
    },
    tabs() {
      return this.$store.getters[`tag/tagsByType`];
    },

    tagsForTab() {
      return this.$store.getters[`tag/tags`].filter(
        x => x.type == this.tabs[this.activeTab].type
      );
    }
  },

  methods: {
    tabClicked(index) {
      console.log("tab " + index + " clicked");
      return;
      
      if (
        this.tabs[this.activeTab].mandatory &&
        this.tabs[this.activeTab].noSelected === 0
      ) {
        this.toggleTag(this.tabs[this.activeTab].tags[0]);
      }
    },

    toggleTag(tag) {
      this.$store.dispatch(`tag/toggleTag`, tag);
      return;
      
      let tab = this.tabs[this.activeTab];
      let tags = this.tabs[this.activeTab].tags;

      if (tab.mandatory) {
        if (tab.noSelected === 0) {
          this.$store.dispatch(`tag/toggleTag`, tag);
        }

        if (tab.noSelected === 1) {
          let index = tags.findIndex(x => x.id == tag.id);
          if (index == -1) {
            //this.$store.dispatch(`tag/toggleTag`, tags[index]);
            this.$store.dispatch(`tag/toggleTag`, tag);
          } else {
            //already chosen
            return;
          }
        }
      }
    },

    nextClicked() {
      
      if (this.activeTab === this.tabs.length - 1) {
        this.$store.commit("stp/moveToStep", "next");
      } else {
        this.activeTab++;
      }
    },

    handleNextButton() {}
  }
};
</script>
