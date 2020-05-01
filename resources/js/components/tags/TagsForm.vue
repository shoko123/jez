<template>
  <v-card class="elevation-12">
    <v-card-title class="grey py-0 mb-1">{{header}}</v-card-title>
    <v-card-text>
      <!--v-list subheader><v-subheader>Recent chat</v-subheader-->
      <v-list>
        <v-list-item v-for="type in tagsByType" :key="type.type">
          <v-list-item-content>
            <v-list-item-title>{{type.type}}</v-list-item-title>

            <!--v-text-field readonly filled>{{typeAndTagsString(type)}}</v-text-field-->
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
    tagsByType() {
      return this.$store.getters[`tag/activeTagsByType`];
    },
    noOfTags() {
      return this.$store.getters[`tag/noSelected`];
    }
  },
  methods: {
    tagsForType(type) {
      return type.tags.map(x => x.name);
    },

    typeAndTagsString(type) {
      let str = type.type + ": ";
      type.tags.forEach(x => (str += ", " + x.name));
      return str;
    }
  }
};
</script>
