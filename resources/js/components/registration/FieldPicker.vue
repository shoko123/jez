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
            @click="select(index)"
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
    //console.log(`FieldPicker.created() collectionName: ${collectionName}. fieldName: ${fieldName}`  );
  },
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    collection() {
      return this.$store.getters[`regs/${this.collectionName}`];
    },
    index() {
      return this.$store.getters["regs/newItem"][`${this.fieldName}Index`];
    },
    tag() {
      return this.index !== null && this.collection && this.collection.length
        ? this.collection[this.index].text
        : "Choose";
    },
  },

  methods: {
    openModal(val) {
      this.dialog = val;
    },

    select(index) {
      console.log(
        `setting ${this.fieldName}Index to: ${index}\nValue: ${JSON.stringify(
          this.collection[index],
          null,
          2
        )}`
      );
      this.$store.dispatch(`regs/${this.fieldName}Selected`, index);
      this.openModal(false);
    },
  },
};
</script>