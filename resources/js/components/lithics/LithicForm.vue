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
          <v-checkbox v-model="item.burnt" readonly label="Burnt" class="ml-2"></v-checkbox>
        </v-row>
        <v-row>
          <v-checkbox v-model="item.rolled" readonly label="Rolled" class="ml-2"></v-checkbox>
        </v-row>
        <v-row>
          <v-checkbox v-model="item.hinge" readonly label="Hinge" class="ml-2"></v-checkbox>
        </v-row>
      </v-col>
    </v-row>

    <template v-if="showTags">
      <v-row wrap no-gutters>
        <div v-for="tag in tags" :key="tag.id" class="font-weight-normal ml-1 text-subtitle-1">
          {{tag.display_name}}:
          <v-chip
            v-for="param in tag.params"
            :key="param.id"
            class="font-weight-normal pa-1 mb-1 body-1"
          >{{param.name}}</v-chip>
        </div>
      </v-row>
    </template>
  </v-container>
</template>
<script>
export default {
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



