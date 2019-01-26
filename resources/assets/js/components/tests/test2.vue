<template>
  <v-toolbar dense>
    <v-btn :value="1" icon flat>
      <v-icon>format_bold</v-icon>
    </v-btn>
    <locusPicker/>
    <v-btn :value="2" icon flat>
      <v-icon>format_italic</v-icon>
    </v-btn>

    <v-divider vertical></v-divider>
  <!--
    <v-overflow-btn
      :items="dropdown_edit"
      editable
      label="Select size"
      hide-details
      class="pa-0"
      overflow
    ></v-overflow-btn>

    <v-divider class="mr-2" vertical></v-divider>

    <v-btn-toggle v-model="toggle_multiple" class="transparent" multiple>
      <v-btn :value="1" flat>
        <v-icon>format_bold</v-icon>
      </v-btn>

      <v-btn :value="2" flat>
        <v-icon>format_italic</v-icon>
      </v-btn>

      <v-btn :value="3" flat>
        <v-icon>format_underlined</v-icon>
      </v-btn>

      <v-btn :value="4" flat>
        <v-icon>format_color_fill</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-divider class="mx-2" vertical></v-divider>

    <v-btn-toggle v-model="toggle_exclusive" class="transparent">
      <v-btn :value="1" flat>
        <v-icon>format_align_left</v-icon>
      </v-btn>

      <v-btn :value="2" flat>
        <v-icon>format_align_center</v-icon>
      </v-btn>

      <v-btn :value="3" flat>
        <v-icon>format_align_right</v-icon>
      </v-btn>

      <v-btn :value="4" flat>
        <v-icon>format_align_justify</v-icon>
      </v-btn>
    </v-btn-toggle>
    -->
  </v-toolbar>

  <!--
 <v-container fluid class="ma-0 pa-0">
      <v-layout row child-flex wrap>
    
        <v-flex xs12 sm1>
          <v-icon>arrow_back</v-icon>
        </v-flex>
     
        <v-flex xs12 sm10>
          <locusPicker/>
        </v-flex>
     
      <v-flex xs12 sm1>
          <v-icon>arrow_forward</v-icon>
        </v-flex>
     
      
     
   
    </v-layout>
    
  </v-container>

  -->
</template>




 


<script>
import locusPicker from "../loci/locusPicker";

export default {
  name: "locus-navigator",
  components: { locusPicker },

  created() {
    //this.$store.dispatch('areas');
    //this.$store.dispatch("loci");
  },

  data() {
    return {
      deleting: false,
      saving: false,
      snackbar: false,
      color: "green",
      mode: "",
      timeout: 3000,
      text: "",

      dropdown_font: [
        { text: "Arial" },
        { text: "Calibri" },
        { text: "Courier" },
        { text: "Verdana" }
      ],
      dropdown_edit: [
        { text: "100%" },
        { text: "75%" },
        { text: "50%" },
        { text: "25%" },
        { text: "0%" }
      ],
      toggle_exclusive: 2,
      toggle_multiple: [1, 2, 3]
    };
  },

  computed: {
    locus() {
      return this.$store.getters.locus;
      //return this.my_locus;
    }
  },
  methods: {
    deleteLocus() {}
  }
};
</script>

<style scoped>
</style>