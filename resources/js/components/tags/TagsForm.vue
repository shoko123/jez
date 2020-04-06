<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-4">{{header}}</v-card-title>
    <v-card-text>
      <!--v-list subheader><v-subheader>Recent chat</v-subheader-->
      <v-list>
        <v-list-item v-for="type in types" :key="type">
          <v-list-item-content>
            <v-list-item-title v-text="type"></v-list-item-title>
            <v-row>
              <v-chip v-for="tag in tagsForType(type)" :key="tag" class="ml-3">{{tag}}</v-chip>
            </v-row>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    header() {
      return `${this.$store.getters["mgr/moduleInfo"].itemName} tags (${this.noOfTags})`;
    },
    tags() {
      //return this.$store.getters[`${this.$store.getters["mgr/moduleInfo"].storeModuleName}/tags`];
      return this.$store.getters[`tag/itemTags`];
    },
    noOfTags() {
      //return this.$store.getters[`${this.$store.getters["mgr/moduleInfo"].storeModuleName}/tags`];
      return this.tags ? this.tags.length : 0;
    },
    types() {
      if (!this.tags) {
        return [];
      }
      //let tabs = [...new Set(payload.map(x => x.type))].map(function (x, index) { return { text: x, index: index } });
      return [...new Set(this.tags.map(x => x.short_type))]; //['type', 'material'];//
      //console.log("stone.submit() dirtyTypes: " + JSON.stringify(dirtyTypes, null, 2));
      //let tagQueryParams = dirtyTypes.map(x => { return { type: x.text, tags: (rootGetters["tag/selectedTags"].filter(y => (x.text == y.type)).map(y => { return { id: y.id, name: y.name } })) } });
    }
  },
  methods: {
    tagsForType(type) {
      if (!this.tags || this.tags < 1) {
        return [];
      }
      return this.tags.filter(x => x.short_type == type).map(x => x.short_name);
    }
  }
};
</script>
