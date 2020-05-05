<template>
  <form name="stone">
    <v-container fluid>
      <v-row wrap no-gutters>
        <v-col :cols="2" class="px-1">
          <v-text-field label="length" v-model="length" name="length" filled></v-text-field>
          <v-text-field label="width" v-model="width" name="width" filled></v-text-field>
          <v-text-field label="thickness(min)" v-model="thickness_min" name="thickness_min" filled></v-text-field>
          <v-text-field label="thickness max" v-model="thickness_max" name="thickness_max" filled></v-text-field>
          <v-text-field label="depth" v-model="depth" name="depth" filled></v-text-field>
          <v-text-field label="diameter" v-model="diameter" name="diameter" filled></v-text-field>
          <v-text-field label="weight" v-model="weight" name="weight" filled></v-text-field>        
        </v-col>
        <v-col :cols="2" class="px-1">
          <v-text-field
            label="perforation_diameter_min"
            v-model="perforation_diameter_min"
            name="perforation_diameter_min"
            filled
          ></v-text-field>
          <v-text-field
            label="perforation_diameter_max"
            v-model="perforation_diameter_max"
            name="perforation_diameter_max"
            filled
          ></v-text-field>
          <v-text-field
            label="perforation_depth"
            v-model="perforation_depth"
            name="perforation_depth"
            filled
          ></v-text-field>
          <v-text-field label="rim_diameter" v-model="rim_diameter" name="rim_diameter" filled></v-text-field>
          <v-text-field label="rim_thickness" v-model="rim_thickness" name="rim_thickness" filled></v-text-field>
          <v-text-field label="base_diameter" v-model="base_diameter" name="base_diameter" filled></v-text-field>
          <v-text-field
            label="base_thickness"
            v-model="base_thickness"
            name="base_thickness"
            filled
          ></v-text-field>
        </v-col>

        <v-col :cols="8">
          <v-row wrap no-gutters>
            <v-textarea label="description" v-model="description" name="description" filled></v-textarea>
          </v-row>
          <v-row wrap no-gutters>
            <v-textarea label="notes" v-model="notes" name="notes" filled></v-textarea>
          </v-row>
        </v-col>
      </v-row>
      <v-row wrap no-gutters>
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";

export default {
  components: { StepButtons },

  created() {
    //console.log("StoneNew created");
  },

  data: () => ({}),

  computed: {
    weight: {
      get() {
        return this.$store.getters["stones/weight"];
      },
      set(data) {
        this.$store.commit("stones/weight", data);
      }
    },
    length: {
      get() {
        return this.$store.getters["stones/length"];
      },
      set(data) {
        this.$store.commit("stones/length", data);
      }
    },
    width: {
      get() {
        return this.$store.getters["stones/width"];
      },
      set(data) {
        this.$store.commit("stones/width", data);
      }
    },
    depth: {
      get() {
        return this.$store.getters["stones/depth"];
      },
      set(data) {
        this.$store.commit("stones/depth", data);
      }
    },
    thickness_min: {
      get() {
        return this.$store.getters["stones/thickness_min"];
      },
      set(data) {
        this.$store.commit("stones/thickness_min", data);
      }
    },
    thickness_max: {
      get() {
        return this.$store.getters["stones/thickness_max"];
      },
      set(data) {
        this.$store.commit("stones/thickness_max", data);
      }
    },
    perforation_diameter_min: {
      get() {
        return this.$store.getters["stones/perforation_diameter_min"];
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_min", data);
      }
    },
    perforation_diameter_max: {
      get() {
        return this.$store.getters["stones/perforation_diameter_max"];
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_max", data);
      }
    },
    perforation_depth: {
      get() {
        return this.$store.getters["stones/perforation_depth"];
      },
      set(data) {
        this.$store.commit("stones/perforation_depth", data);
      }
    },
    diameter: {
      get() {
        return this.$store.getters["stones/diameter"];
      },
      set(data) {
        this.$store.commit("stones/diameter", data);
      }
    },
    rim_diameter: {
      get() {
        return this.$store.getters["stones/rim_diameter"];
      },
      set(data) {
        this.$store.commit("stones/rim_diameter", data);
      }
    },
    rim_thickness: {
      get() {
        return this.$store.getters["stones/rim_thickness"];
      },
      set(data) {
        this.$store.commit("stones/rim_thickness", data);
      }
    },

    base_diameter: {
      get() {
        return this.$store.getters["stones/base_diameter"];
      },
      set(data) {
        this.$store.commit("stones/base_diameter", data);
      }
    },
    base_thickness: {
      get() {
        return this.$store.getters["stones/base_thickness"];
      },
      set(data) {
        this.$store.commit("stones/base_thickness", data);
      }
    },
    description: {
      get() {
        return this.$store.getters["stones/description"];
      },
      set(data) {
        this.$store.commit("stones/description", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["stones/notes"];
      },
      set(data) {
        this.$store.commit("stones/notes", data);
      }
    }
  },

  methods: {
    nextClicked() {
      console.log(
        "StoneNew.nextClicked() item: " +
          JSON.stringify(this.$store.getters["loci/newItem"], null, 2)
      );

      this.$store.dispatch("mgr/store", this.$router).then(res => {
        this.$store.commit("stp/moveToStep", "first");
      });
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    }
  }
};
</script>


