<template>
  <form>
    <v-container fluid v-if="stone">
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-col :cols="2" class="px-1">
          <v-text-field
            label="length"
            v-model="length"
            :error-messages="lengthErrors"
            @input="$v.length.$touch()"
            @blur="$v.length.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="width"
            v-model="width"
            :error-messages="widthErrors"
            @input="$v.width.$touch()"
            @blur="$v.width.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="depth"
            v-model="depth"
            :error-messages="depthErrors"
            @input="$v.depth.$touch()"
            @blur="$v.depth.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="thickness/min thickness"
            v-model="thickness_min"
            :error-messages="thickness_minErrors"
            @input="$v.thickness_min.$touch()"
            @blur="$v.thickness_min.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="thickness max"
            v-model="thickness_max"
            :error-messages="thickness_maxErrors"
            @input="$v.thickness_max.$touch()"
            @blur="$v.thickness_max.$touch()"
            filled
          ></v-text-field>

          <v-text-field
            label="diameter"
            v-model="diameter"
            :error-messages="diameterErrors"
            @input="$v.diameter.$touch()"
            @blur="$v.diameter.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="Weight"
            v-model="weight"
            :error-messages="weightErrors"
            @input="$v.weight.$touch()"
            @blur="$v.weight.$touch()"
            filled
          ></v-text-field>
        </v-col>
        <v-col :cols="2" class="px-1">
          <v-text-field
            label="Perforation min diameter"
            v-model="perforation_diameter_min"
            :error-messages="perforation_diameter_minErrors"
            @input="$v.perforation_diameter_min.$touch()"
            @blur="$v.perforation_diameter_min.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="perforation_diameter_max"
            v-model="perforation_diameter_max"
            :error-messages="perforation_diameter_maxErrors"
            @input="$v.perforation_diameter_max.$touch()"
            @blur="$v.perforation_diameter_max.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="perforation_depth"
            v-model="perforation_depth"
            :error-messages="perforation_depthErrors"
            @input="$v.perforation_depth.$touch()"
            @blur="$v.perforation_depth.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="rim_diameter"
            v-model="rim_diameter"
            :error-messages="rim_diameterErrors"
            @input="$v.rim_diameter.$touch()"
            @blur="$v.rim_diameter.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="rim_thickness"
            v-model="rim_thickness"
            :error-messages="rim_thicknessErrors"
            @input="$v.rim_thickness.$touch()"
            @blur="$v.rim_thickness.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="base_diameter"
            v-model="base_diameter"
            :error-messages="base_diameterErrors"
            @input="$v.base_diameter.$touch()"
            @blur="$v.base_diameter.$touch()"
            filled
          ></v-text-field>
          <v-text-field
            label="base_thickness"
            v-model="base_thickness"
            :error-messages="base_thicknessErrors"
            @input="$v.base_thickness.$touch()"
            @blur="$v.base_thickness.$touch()"
            filled
          ></v-text-field>
        </v-col>

        <v-col :cols="8">
          <v-row wrap no-gutters>
            <v-textarea
              label="description"
              v-model="description"
              :error-messages="descriptionErrors"
              @input="$v.description.$touch()"
              @blur="$v.description.$touch()"
              filled
            ></v-textarea>
          </v-row>
          <v-row wrap no-gutters>
            <v-textarea
              label="notes"
              v-model="notes"
              :error-messages="notesErrors"
              @input="$v.notes.$touch()"
              @blur="$v.notes.$touch()"
              filled
            ></v-textarea>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength, between } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  created() {
    //console.log("StoneNew created");
  },
  validations: {
    length: {
      between: between(1, 50000),
    },
    width: {
      between: between(1, 50000),
    },
    depth: {
      between: between(1, 50000),
    },
    weight: {
      between: between(1, 50000),
    },
    thickness_min: {
      between: between(1, 50000),
    },
    thickness_max: {
      between: between(1, 50000),
    },
    perforation_diameter_min: {
      between: between(1, 50000),
    },
    perforation_diameter_max: {
      between: between(1, 50000),
    },
    perforation_depth: {
      between: between(1, 50000),
    },
    diameter: {
      between: between(1, 50000),
    },
    rim_diameter: {
      between: between(1, 50000),
    },
    rim_thickness: {
      between: between(1, 50000),
    },
    base_diameter: {
      between: between(1, 50000),
    },
    base_thickness: {
      between: between(1, 50000),
    },

    description: {
      maxLength: maxLength(400),
    },
    notes: {
      maxLength: maxLength(400),
    },
  },

  computed: {
    stone() {
      return this.$store.getters["stones/newItem"];
    },

    length: {
      get() {
        return this.stone.length;
      },
      set(data) {
        this.$store.commit("stones/length", data);
        this.handleNextButton();
      },
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
      },
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
      },
    },
    depthErrors() {
      const errors = [];
      if (!this.$v.depth.$dirty) {
        return errors;
      }
      !this.$v.depth.between && errors.push("Depth must be between 1-50000");
      return errors;
    },

    weight: {
      get() {
        return this.stone.weight;
      },
      set(data) {
        this.$store.commit("stones/weight", data);
        this.handleNextButton();
      },
    },
    weightErrors() {
      const errors = [];
      if (!this.$v.weight.$dirty) {
        return errors;
      }
      !this.$v.weight.between && errors.push("Weight must be between 1-50000");
      return errors;
    },
    thickness_min: {
      get() {
        return this.stone.thickness_min;
      },
      set(data) {
        this.$store.commit("stones/thickness_min", data);
        this.handleNextButton();
      },
    },

    thickness_minErrors() {
      const errors = [];
      if (!this.$v.thickness_min.$dirty) {
        return errors;
      }
      !this.$v.thickness_min.between &&
        errors.push("Min thickness must be between 1-50000");
      return errors;
    },

    thickness_max: {
      get() {
        return this.stone.thickness_max;
      },
      set(data) {
        this.$store.commit("stones/thickness_max", data);
        this.handleNextButton();
      },
    },
    thickness_maxErrors() {
      const errors = [];
      if (!this.$v.thickness_max.$dirty) {
        return errors;
      }
      !this.$v.thickness_max.between &&
        errors.push("Max thickness must be between 1-50000");
      return errors;
    },

    perforation_diameter_min: {
      get() {
        return this.stone.perforation_diameter_min;
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_min", data);
      },
    },
    perforation_diameter_minErrors() {
      const errors = [];
      if (!this.$v.perforation_diameter_min.$dirty) {
        return errors;
      }
      !this.$v.perforation_diameter_min.between &&
        errors.push("Min perforation diameter must be between 1-50000");
      return errors;
    },

    perforation_diameter_max: {
      get() {
        return this.stone.perforation_diameter_max;
      },
      set(data) {
        this.$store.commit("stones/perforation_diameter_max", data);
        this.handleNextButton();
      },
    },
    perforation_diameter_maxErrors() {
      const errors = [];
      if (!this.$v.perforation_diameter_max.$dirty) {
        return errors;
      }
      !this.$v.perforation_diameter_max.between &&
        errors.push("Min perforation diameter must be between 1-50000");
      return errors;
    },

    perforation_depth: {
      get() {
        return this.stone.perforation_depth;
      },
      set(data) {
        this.$store.commit("stones/perforation_depth", data);
        this.handleNextButton();
      },
    },
    perforation_depthErrors() {
      const errors = [];
      if (!this.$v.perforation_depth.$dirty) {
        return errors;
      }
      !this.$v.perforation_depth.between &&
        errors.push("Perforation depth must be between 1-50000");
      return errors;
    },

    diameter: {
      get() {
        return this.stone.diameter;
      },
      set(data) {
        this.$store.commit("stones/diameter", data);
        this.handleNextButton();
      },
    },
    diameterErrors() {
      const errors = [];
      if (!this.$v.diameter.$dirty) {
        return errors;
      }
      !this.$v.diameter.between &&
        errors.push("Diameter must be between 1-50000");
      return errors;
    },
    rim_diameter: {
      get() {
        return this.stone.rim_diameter;
      },
      set(data) {
        this.$store.commit("stones/rim_diameter", data);
        this.handleNextButton();
      },
    },
    rim_diameterErrors() {
      const errors = [];
      if (!this.$v.rim_diameter.$dirty) {
        return errors;
      }
      !this.$v.rim_diameter.between &&
        errors.push("Rim diameter must be between 1-50000");
      return errors;
    },

    rim_thickness: {
      get() {
        return this.stone.rim_thickness;
      },
      set(data) {
        this.$store.commit("stones/rim_thickness", data);
        this.handleNextButton();
      },
    },
    rim_thicknessErrors() {
      const errors = [];
      if (!this.$v.rim_thickness.$dirty) {
        return errors;
      }
      !this.$v.rim_thickness.between &&
        errors.push("Rim thickness must be between 1-50000");
      return errors;
    },

    base_diameter: {
      get() {
        return this.stone.base_diameter;
      },
      set(data) {
        this.$store.commit("stones/base_diameter", data);
        this.handleNextButton();
      },
    },
    base_diameterErrors() {
      const errors = [];
      if (!this.$v.base_diameter.$dirty) {
        return errors;
      }
      !this.$v.base_diameter.between &&
        errors.push("Base diameter must be between 1-50000");
      return errors;
    },

    base_thickness: {
      get() {
        return this.stone.base_thickness;
      },
      set(data) {
        this.$store.commit("stones/base_thickness", data);
        this.handleNextButton();
      },
    },
    base_thicknessErrors() {
      const errors = [];
      if (!this.$v.base_thickness.$dirty) {
        return errors;
      }
      !this.$v.base_thickness.between &&
        errors.push("Base thickness must be between 1-50000");
      return errors;
    },
    description: {
      get() {
        return this.stone.description;
      },
      set(data) {
        this.$store.commit("stones/description", data);
      },
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("Description exceeds length of 400 characters");
      return errors;
    },
    notes: {
      get() {
        return this.stone.notes;
      },
      set(data) {
        this.$store.commit("stones/notes", data);
      },
    },
    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) {
        return errors;
      }
      !this.$v.notes.maxLength &&
        errors.push("Notes exceeds length of 400 characters");
      return errors;
    },
  },

  methods: {
    nextClicked() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("StoneNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        this.$store.dispatch("mgr/store", true).then((res) => {
          this.$store.commit("stp/moveToStep", "first");
        });
      }
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    },
  },
};
</script>