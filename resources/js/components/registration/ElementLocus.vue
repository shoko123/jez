<template>
  <v-dialog v-model="dialog" width="800">
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-model="tag"
        label="Locus"
        filled
        v-bind="attrs"
        v-on="on"
      >
      </v-text-field>
    </template>

    <v-card>
      <v-card-title>Pick an Locus</v-card-title>
      <v-card-text>
        <v-row wrap>
          <v-chip
            v-for="(item, index) in collection"
            :key="item.value"
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
  data() {
    return {
      dialog: false,
    };
  },

  computed: {
    collection() {
      return this.$store.getters["regs/loci"];
    },

    index() {
      return this.$store.getters["regs/newItem"].locusIndex;
    },
    tag() {
      return  this.index !== null && this.collection.length ? this.collection[this.index].text : "Choose";
    },
  },

  methods: {
    openModal(val) {
      this.dialog = val;
    },

    select(index) {
      console.log(
        "setting locusIndex to: " +
          index +
          "\nValue: " +
          JSON.stringify(this.collection[index], null, 2)
      );
      this.$store.dispatch("regs/locusSelected", index);
      this.openModal(false);
    },
  },
};
</script>