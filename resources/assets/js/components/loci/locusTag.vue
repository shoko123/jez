<template>
  <v-layout>
    <v-text-field
      class="pr-1"
      v-model="areaTag"
      box
      slot="activator"
      label="Locus tag"
      @click="openAreaSelector()"
    ></v-text-field>

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
                item-value="id"
                single-line
                box
                @change="newAreaSelected"
                label="select the area this locus belongs to"
              ></v-select>
            </v-flex>

            <v-flex xs12 sm6 class="px-1">
              <v-text-field
                class="pr-1"
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
      dialog: "",
      area: "",
      areaId: "",
      locusNumber: "",
      localAreas: [],
      myArea: {
        id: "",
        area: "",
        year: ""
      },
      loci: [],
    };
  },

  computed: {
    areas() {
      return this.$store.getters.areas;
    },

    areasFormatted() {
      return this.areas.map(ar => ({
        tag: ar.year + "." + ar.area,
        year: ar.year,
        area: ar.area,
        id: ar.id
      }));
    },
    areaTag() {
      return this.myArea.year + "." + this.myArea.area + "." + this.myArea.id;
    },
    lociForArea() {
      return this.$store.getters.lociForAreas;
    }
  },
  methods: {
    openAreaSelector() {
      this.dialog = true;
      this.$store.dispatch("AreasList");
    },
    newAreaSelected() {
      //copy area locally
      this.myArea = Object.assign(
        {},
        this.$store.getters.getAreaById(this.areaId)
      );

      console.log(this.myArea);

      //get list of loci ids for this area
      this.$store.dispatch("lociForArea", this.myArea.id);
    },

    selectedArea() {
      return this.$store.getters.getAreaById(this.areaId);
    },
    OnCloseSelector() {
      this.dialog = false;
      console.log(this.areasFormatted);
      console.log("selected area: " + this.myArea);
    }
  }
};
</script>

