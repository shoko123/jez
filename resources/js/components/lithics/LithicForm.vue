<template>
  <v-container v-if="item" fluid>
    <v-row>
      <v-col :col="10">
        <v-row>
          <v-textarea
            v-model="item.description"
            label="Description"
            rows="1"
            auto-grow
            readonly
            filled
            class="ml-1"
          ></v-textarea>
        </v-row>

        <v-row>
          <v-text-field
            label="Width"
            v-model="item.width"
            class="ml-1"
            name="width"
            filled
          ></v-text-field>

          <v-text-field
            label="Length"
            v-model="item.length"
            class="ml-1"
            name="length"
            filled
          ></v-text-field>

          <v-text-field
            label="Thickness"
            v-model="item.thickness"
            name="thickness"
            class="ml-1"
            filled
          ></v-text-field>

          <v-text-field
            label="Weight"
            v-model="item.weight"
            name="weight"
            class="ml-1"
            filled
          ></v-text-field>
        </v-row>
      </v-col>

      <v-col :cols="2">
        <v-row>
          <v-checkbox
            v-model="item.burnt"
            readonly
            label="Burnt"
            class="ml-2"
          ></v-checkbox>
        </v-row>
        <v-row>
          <v-checkbox
            v-model="item.rolled"
            readonly
            label="Rolled"
            class="ml-2"
          ></v-checkbox>
        </v-row>
        <v-row>
          <v-checkbox
            v-model="item.hinge"
            readonly
            label="Hinge"
            class="ml-2"
          ></v-checkbox>
        </v-row>
      </v-col>
    </v-row>

    <template v-if="showTags">
      <TagList />
    </template>
  </v-container>
</template>
<script>
import TagList from "../tags/TagList";
export default {
  components: {
    TagList,
  },
  props: {
    showTags: Boolean,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
  },
};
</script>



