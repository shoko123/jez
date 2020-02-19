<template>
      <v-select
        label="main typology"
        :items="TypologiesMain"
        v-model="stone_typology_main_id"
        item-text="name"
        return-object
        name="typology"
        filled
        @change="mainTypologySelected"
      ></v-select>
</template>

<script>
export default {


  data: () => ({
    disableSubmit: false
  }),

  computed: {
 
    stone_typology_main_id: {
      get() {
        return this.$store.getters["stones/stone_typology_main_id"];
      },
      set(data) {
        this.$store.commit("stones/stone_typology_main_id", data);
      }
    },
  },

  methods: {
 
  }
};
</script>


