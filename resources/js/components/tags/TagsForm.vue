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
      return this.$store.getters[`tag/itemTags`];
    },
    noOfTags() {
      return this.tags ? this.tags.length : 0;
    },
    types() {
      if (!this.tags) { return [];}
      return [...new Set(this.tags.map(x => x.type))];
    }
  },
  methods: {
    tagsForType(type) {
      if (!this.tags || this.tags < 1) { return []; }
      
      return this.tags.filter(x => x.type == type).map(x => x.name);
    }
  }
};
</script>
