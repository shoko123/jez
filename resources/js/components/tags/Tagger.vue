<template>
  <form name="tags">
    <v-container fluid>
      <v-row wrap>
        <v-tabs v-model="activeTab" class="primary">
          <v-tab
            v-for="(tab, index) in tabHeaders"
            :key="index"
            @click="initTabData(index)"
            disabled
          >{{ tab }}</v-tab>
        </v-tabs>

        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="(tab, index) in tabs" :key="index">
            <v-row justify="space-around">
              <v-col cols="12" sm="10" md="8" lg="8">
                <v-sheet elevation="10" class="pa-4">
                  <v-subheader>{{limitationsHeader}}</v-subheader>
                  <v-chip-group multiple column>
                    <v-chip
                      v-for="tag in tagsForTab"
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
        <StepButtons v-on:nextClicked="nextClicked" v-on:prevClicked="prevClicked"></StepButtons>
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
    },
    limitationsHeader() {
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
    initTabData(index) {
      /*
      console.log(
        "initTabData: " + JSON.stringify(this.tabs[this.activeTab], null, 2)
      );
      console.log("tags: " + JSON.stringify(this.tagsForTab, null, 2));
      */
      if (
        this.tabs[this.activeTab].mandatory &&
        this.tabs[this.activeTab].noSelected === 0
      ) {
        this.toggleTag(this.tagsForTab[0]);
      }
      if (
        this.tabs[this.activeTab].multiple &&
        this.tabs[this.activeTab].noSelected > 1
      ) {
        for (var i = 1; i < this.tagsForTab.length; i++) {
          this.toggleTag(this.tagsForTab[i]);
        }
      }
    },

    toggleTag(tag) {
      let tab = this.tabs[this.activeTab];
      //let tab.tags = this.tabs[this.activeTab].tags;
      let index = null;

      console.log(
        "toggleTag()\nTab: " +
          JSON.stringify(tab, null, 2) +
          "\nsclickedTag: " +
          JSON.stringify(tag, null, 2)
      );

      if (tab.noSelected !== 1) {
        this.$store.dispatch(`tag/toggleTag`, tag);
        return;
      }

      index = tab.tags.map(x => x.id).indexOf(tag.id);
      if (index !== -1) {
        //same tag
        if (tab.mandatory) {
          return;
        } else {
          this.$store.dispatch(`tag/toggleTag`, tag);
        }
      } else {
        //different tag
        if (tab.multiple) {
          this.$store.dispatch(`tag/toggleTag`, tag);
        } else {
          //currentSelectedTag
          console.log(
            "\nindex: " +
              index +
              "\nunselect: " +
              JSON.stringify(tab.tags[0], null, 2) +
              "\nselect: " +
              JSON.stringify(tag, null, 2)
          );
          //turn current selected->off, new->on.
          this.$store.dispatch(`tag/toggleTag`, tag);
          this.$store.dispatch(`tag/toggleTag`, tab.tags[0]);
        }
      }
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
