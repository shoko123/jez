<template>
  <v-layout>
    <v-text-field
      class="pr-1"
      v-model="myLocus.tag"
      box
      slot="activator"
      label="new locus tag"
      @click="openAreaSelector()"
    ></v-text-field>

    <v-dialog v-model="dialog" persistent max-width="600">
      <v-card>
        <v-form @submit.prevent="onSubmit">
          <v-card-title class="headline">Choose new locus tag (identifier)</v-card-title>

          <v-card-text>
            <v-layout row wrap>
              <v-flex xs12 sm6 class="px-1">
                <v-select
                  v-if="myArea"
                  :items="myAreas"
                  v-model="myArea"
                  name="area tag"
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
                  name="locus no"
                  v-model="locus_no"
                  v-validate="'required|min_value:1|max_value:999'"
                  :error-messages="errors.collect('locus no')"
                  label="locus number"
                  box
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn type="submit" :disabled="!valid" primary>submit</v-btn>
            <v-btn @click="clear">clear</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>



<script>
export default {
  name: "locus-tag",

  created() {
    //this.loadAreas();
    //this.tag_ok = false;
    console.log("locusTag.created() locus id:" + this.$route.params.id);
    //this.$store.dispatch("locus", this.$route.params.id);
  },


  data() {
    return {
      dialog: true,
      myLocus: {
        locus_id: null,
        locus_no: null,
        area_id: null,
        area_name: null,
        dig_year: null,
        tag: null
      },
      myArea: undefined,
      locus_no: "",
      myAreas: undefined,
      newLocusTag: undefined,
      tag_ok: false
    };
  },

  computed: {
    locus() {
      //  return this.$store.getters.locus;
      return this.myLocus;
    },

    valid() {
      return this.errors.items.length <= 0;
    }
  },
  methods: {
    openAreaSelector() {
      this.dialog = true;
    },

    loadAreas() {
      //load all areas and format them to display in select box
     
    },

 

    clear() {
      //this.locus_no = "";
      //this.areaTag = "";
      this.$validator.reset();
    },

    onSubmit() {
      this.$validator.validateAll();
      this.tag_ok = false;
      this.getLocusByTag();

      /*
      this.$validator.validateAll().then(result => {
        if (!result) {
          // eslint-disable-next-line
          alert("Correct them errors!!");
          return;
        } else {
          //validate that tag doesn't already exists in DB

          //alert("before checking tag look at console");
          this.getLocusByTag();
        }
      });

      */
    }
  }
};
</script>

