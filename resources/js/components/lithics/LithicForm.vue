<template>
  <v-container v-if="ready" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-col xs12 lg9 class="px-1">
        <v-row wrap no-gutters>
          <v-textarea
            v-model="item.description"
            label="Description"
            rows="1"
            auto-grow
            readonly
            filled
          ></v-textarea>
        </v-row>
      </v-col>
      <v-col xs12 lg3 class="px-1">
        <v-row wrap no-gutters>
          <v-text-field v-model="item.no_of_items" label="Count" readonly filled></v-text-field>
          <v-checkbox v-model="item.burnt" readonly label="Burnt"></v-checkbox>
          <v-checkbox v-model="item.rolled" readonly label="Rolled"></v-checkbox>
          <v-checkbox v-model="item.hinge" readonly label="Hinge"></v-checkbox>
        </v-row>
        <v-row wrap no-gutters>
          <v-text-field
            label="Width"
            v-model="item.width"
            v-show="item.width"
            class="mr-1"
            name="width"
            filled
          ></v-text-field>
          <v-col xs12 lg3 class="px-1">
            <v-row wrap dense>
              <v-text-field
                label="Length"
                v-model="item.length"
                v-show="item.length"
                class="mr-1"
                name="length"
                filled
              ></v-text-field>
              <v-text-field
                label="Thickness"
                v-model="item.thickness"
                v-show="item.thickness"
                name="thickness"
                class="mr-1"
                filled
              ></v-text-field>

              <v-text-field
                label="Weight"
                v-model="item.weight"
                v-show="item.weight"
                name="weight"
                class="mr-1"
                filled
              ></v-text-field>
            </v-row>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    showTags: Boolean,
  },
  computed: {
    ready() {
      return !this.$store.getters["mgr/xhrStatus"].loadingItem;
    },
    item() {
      return this.$store.getters["mgr/item"];
    },
  },
};
</script>



