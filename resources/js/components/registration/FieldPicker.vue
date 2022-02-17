<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field v-model="tag" :label="label" filled v-bind="attrs" v-on="on">
      </v-text-field>
    </template>

    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-chip
            v-for="(item, index) in collection"
            :key="index"
            class="font-weight-normal ma-2 body-1"
            @click="select(item)"
            >{{ item.text }}</v-chip
          >
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    label: String,
    title: String,
    collectionName: String,
    fieldName: String,
  },

 created() {
    console.log(`FieldPicker.created() collectionName: ${this.collectionName} fieldName: ${this.fieldName}`  );
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: { 
    collection() {
      return this.$store.getters[`regs/lists`] !== null ? this.$store.getters[`regs/lists`][this.collectionName] : [];    
    },

    isSelected() {
      return this.$store.getters[`regs/flags`] !== null ? this.$store.getters[`regs/flags`].isSelected[this.fieldName] : false;
    },
  
    tag() {
      return this.isSelected ? this.$store.getters[`regs/selected`][this.fieldName].text : "Choose";
    },
  },

  methods: {
    select(item) {
      this.$store.dispatch(`regs/p/${this.fieldName}Selected`, item);
      this.dialog = false;
    },
  },
};
</script>