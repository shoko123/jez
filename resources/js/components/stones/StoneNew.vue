<template>
  <form name="stone">
    <v-container fluid v-if="stone">
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-col :cols="2" class="px-1">
          <v-text-field
            label="length"
            v-model="length"
            name="length"
            :error-messages="lengthErrors"
            @input="$v.length.$touch()"
            @blur="$v.length.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="width"
            v-model="width"
            name="width"
            :error-messages="widthErrors"
            @input="$v.width.$touch()"
            @blur="$v.width.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="depth"
            v-model="depth"
            name="depth"
            :error-messages="depthErrors"
            @input="$v.depth.$touch()"
            @blur="$v.depth.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="thickness/min thickness"
            v-model="thickness_min"
            name="thickness_min"
            :error-messages="thickness_minErrors"
            @input="$v.thickness_min.$touch()"
            @blur="$v.thickness_min.$touch()"
            filled
          ></v-text-field>
          <v-text-field label="thickness max" v-model="thickness_max" name="thickness_max" filled></v-text-field>

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
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { required, integer, between } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  created() {
    //console.log("StoneNew created");
  },
  validations: {
    length: {
      between: between(0, 50000)
    },
    width: {
      between: between(0, 50000)
    },
    depth: {
      between: between(0, 50000)
    },
    weight: {
      between: between(0, 50000)
    },
    thickness_min: {
      between: between(0, 50000)
    }
  },
  data: () => ({}),

  computed: {
    stone() {
      return this.$store.getters["stones/newItem"];
    },
    weight: {
      get() {
        return this.stone.weight;
      },
      set(data) {
        this.$store.commit("stones/weight", data);
        this.handleNextButton();
      }
    },

    length: {
      get() {
        return this.stone.length;
      },
      set(data) {
        this.$store.commit("stones/length", data);
        this.handleNextButton();
      }
    },
    lengthErrors() {
      const errors = [];
      if (!this.$v.length.$dirty) {
        return errors;
      }
      !this.$v.length.between && errors.push("length must be between 1-50000");
      return errors;
    },

    width: {
      get() {
        return this.stone.width;
      },
      set(data) {
        this.$store.commit("stones/width", data);
        this.handleNextButton();
      }
    },

    widthErrors() {
      const errors = [];
      if (!this.$v.width.$dirty) {
        return errors;
      }
      !this.$v.width.between && errors.push("width must be between 1-50000");
      return errors;
    },

    depth: {
      get() {
        return this.stone.depth;
      },
      set(data) {
        this.$store.commit("stones/depth", data);
        this.handleNextButton();
      }
    },
    depthErrors() {
      const errors = [];
      if (!this.$v.depth.$dirty) {
        return errors;
      }
      !this.$v.depth.between && errors.push("depth must be between 1-50000");
      return errors;
    },

    thickness_min: {
      get() {
        return this.stone.thickness_min;
      },
      set(data) {
        this.$store.commit("stones/thickness_min", data);
        this.handleNextButton();
      }
    },

    thickness_minErrors() {
      const errors = [];
      if (!this.$v.thickness_min.$dirty) {
        return errors;
      }
      !this.$v.thickness_min.between &&
        errors.push("thickness must be between 1-50000");
      return errors;
    },

    thickness_max: {
      get() {
        return this.stone.thickness_max;
      },
      set(data) {
        this.$store.commit("stones/thickness_max", data);
        this.handleNextButton();
      }
    },
    perforation_diameter_min: {
      get() {
        return this.stone.perforation_diameter_min;
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_min", data);
      }
    },
    perforation_diameter_max: {
      get() {
        return this.stone.perforation_diameter_max;
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_max", data);
        this.handleNextButton();
      }
    },
    perforation_depth: {
      get() {
        return this.stone.perforation_depth;
      },
      set(data) {
        this.$store.commit("stones/perforation_depth", data);
        this.handleNextButton();
      }
    },
    diameter: {
      get() {
        return this.stone.diameter;
      },
      set(data) {
        this.$store.commit("stones/diameter", data);
        this.handleNextButton();
      }
    },
    rim_diameter: {
      get() {
        return this.stone.rim_diameter;
      },
      set(data) {
        this.$store.commit("stones/rim_diameter", data);
        this.handleNextButton();
      }
    },
    rim_thickness: {
      get() {
        return this.stone.rim_thickness;
      },
      set(data) {
        this.$store.commit("stones/rim_thickness", data);
        this.handleNextButton();
      }
    },

    base_diameter: {
      get() {
        return this.stone.base_diameter;
      },
      set(data) {
        this.$store.commit("stones/base_diameter", data);
        this.handleNextButton();
      }
    },
    base_thickness: {
      get() {
        return this.stone.base_thickness;
      },
      set(data) {
        this.$store.commit("stones/base_thickness", data);
        this.handleNextButton();
      }
    },
    description: {
      get() {
        return this.stone.description;
      },
      set(data) {
        this.$store.commit("stones/description", data);
      }
    },
    notes: {
      get() {
        return this.stone.notes;
      },
      set(data) {
        this.$store.commit("stones/notes", data);
      }
    }
  },

  methods: {
    nextClicked() {
      /*
      console.log(
        "StoneNew.nextClicked() stones/newItem: " +
          JSON.stringify(this.$store.getters["stones/newItem"], null, 2) + "\nfind: " + JSON.stringify(this.$store.getters["fnd/newItem"], null, 2)
      );
      */
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("StoneNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        this.$store.dispatch("mgr/store", true).then(res => {
          this.$store.commit("stp/moveToStep", "first");
        });
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    }
  }
};
</script>


