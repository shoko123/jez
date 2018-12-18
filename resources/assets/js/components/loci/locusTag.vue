<template>
  <v-layout>
    <v-text-field
      class="pr-1"
      box
      slot="activator"
      label="Locus tag"
      @click="openAreaSelector()"
    >Open Dialog</v-text-field>

    <v-dialog v-model="dialog" max-width="800">
      <v-card>
        <v-card-title class="headline">Choose Locus Tag (identifier)</v-card-title>

        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 sm6 class="px-1">
              <v-select 
              :items="areasFormatted"
              v-model="areaId"
              item-text="tag"
              item-value="area_id"
              single-line
              box 
              label="select the area this locus belongs to"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 class="px-1">
              <v-text-field class="pr-1"
            name="locus number"
            v-model="locusNumber"
            :error-messages="errors.collect('locusNumber')"
            label="locus number"
            box
          ></v-text-field>
            </v-flex>
          </v-layout>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn flat="flat" @click="OnCloseSelector()">OK</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>


<script>
export default {
  data() {
    return {
      dialog: '',
      area: '',
      areaId: '',
      locusNumber: '',
      localAreas: [],
      myArea: {
        id: '',
        name: '',
        year: '',
      }
    };
  },
  
  computed: {
    areas() {
      return this.$store.getters.areas;
    },
    
    areasFormatted() {
      return this.areas.map(ar => ({ tag: ar.year + "." + ar.area, area_year: ar.year, area_name: ar.area, area_id: ar.id}));
      //return this.areas.map(ar => ar.year + "." + ar.area);
    },
    
  },
  methods: {
    openAreaSelector() {
      this.dialog = true;
      //alert("locus tag opened");
      this.$store.dispatch("AreasList");
    },

selectedArea() {
      return this.$store.getters.getAreaById(this.areaId);
    },
    OnCloseSelector() {
      this.dialog = false;
      console.log(this.areasFormatted);
      console.log("selected areaId: " + this.areaId);
      


      console.log(this.$store.getters.getAreaById(this.areaId));
      console.log("selected area: " + this.selectedArea().year + '.' + this.selectedArea().area);
    },
  },

};
</script>

