<template>
  <v-container fluid>
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
      <v-card-text>
        <v-tabs v-model="activeTab" class="primary">
          <v-tab v-for="item in filterTabs" :key="item.id" >{{ item.text }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="activeTab">
          <v-tab-item v-for="item in filterTabs" :key="item.id">
            <v-card flat>
              <v-row justify="space-around">
                <v-col cols="12" sm="10" md="8" lg="8">
                  <v-sheet elevation="10" class="pa-4">
                    <v-chip-group multiple column>
                      <v-chip v-for="(tag, index) in tagsForTab" :key="tag.id" @click="toggleTag(tag, index)" :color="tag.selected ? 'primary' : ''" large>{{ tag.name }}</v-chip>
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
</template>

<script>
export default {
  data() {
    return {
      activeTab: null,
     
    };
  },
  created() {
    this.activeTab = 0;
  },
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} query manager`;
    },
    tags() {
      //return this.$store.getters[`${this.$store.getters["mgr/moduleInfo"].storeModuleName}/tags`];
      return this.$store.getters[`tag/allTags`];
    },

    tagsForTab() {
      if(!this.filterTabs || this.filterTabs.length < 1 ) {
        return [];
      }
      return this.tags.filter(x => x.type == this.filterTabs[this.activeTab].text);
    },
    filterTabs() {
      return this.$store.getters[`tag/categories`];
    }
  },
  methods: {
  
    toggleTag(tag, index){
      //console.log("toggle: tag: " + JSON.stringify(tag, null, 2) + "\nindex: " + index);
      
      //Make reactive thru store->slice
      this.$store.dispatch(`tag/toggleTag`, tag);
    }
  }
};
</script>
