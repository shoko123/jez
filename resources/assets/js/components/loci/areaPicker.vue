<template>
  <v-flex class="px-1">
    <v-select
      v-if="area"
      :items="areas"
      v-model="area"
      name="area tag"
      item-text="tag"
      item-value="id"
      single-line
      box
      @change="newAreaSelected"
      label="select area"
    ></v-select>
  </v-flex>
</template>




<script>
export default {
  name: "area-picker",
        created() {
            if (typeof this.$store.getters.area === 'undefined') {
                return;
            }
            
            //this.$store.dispatch('area', this.$store.getters.areas[0] );
            

        }, 
  computed: {
    areas() {
      return this.$store.getters.areas;
    },
    area() {
      return this.$store.getters.area;
    }
  },
  methods: {
    newAreaSelected(id) {
      //copy selected area object by id
      this.myArea = this.myAreas.find(x => x.id === id);

      //get the max locus number (new locus is likely to be max+1)
      this.getLikelyLocusNo(id);
    }
  }
};
</script>


<style scoped>
.btn-wrapper {
  text-align: right;
  margin-bottom: 20px;
}
</style>

