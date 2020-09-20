<template>
  <form name="item">
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap>
        <v-col col-10>
          <v-row wrap no-gutters>
            <v-textarea label="description" v-model="description" filled></v-textarea>
          </v-row>

          <v-row wrap no-gutters>
            <v-col xs12 lg2 class="px-1">
              <v-text-field
                label="Width"
                v-model="width"
                :error-messages="widthErrors"
                @input="$v.width.$touch()"
                @blur="$v.width.$touch()"
                filled
              ></v-text-field>
            </v-col>
            <v-col xs12 lg2 class="px-1">
              <v-text-field
                label="Length"
                v-model="length"
                :error-messages="lengthErrors"
                @input="$v.length.$touch()"
                @blur="$v.length.$touch()"
                filled
              ></v-text-field>
            </v-col>
            <v-col xs12 lg2 class="px-1">
              <v-text-field
                label="Thickness"
                v-model="thickness"
                :error-messages="thicknessErrors"
                @input="$v.thickness.$touch()"
                @blur="$v.thickness.$touch()"
                filled
              ></v-text-field>
            </v-col>
            <v-col xs12 lg2 class="px-1">
              <v-text-field
                label="Weight"
                v-model="weight"
                :error-messages="weightErrors"
                @input="$v.weight.$touch()"
                @blur="$v.weight.$touch()"
                filled
              ></v-text-field>
            </v-col>
          </v-row>
        </v-col>

        <v-col col-2>
          <v-row>
            <v-checkbox v-model="burnt" label="Burnt"></v-checkbox>
          </v-row>
          <v-row>
            <v-checkbox v-model="rolled" label="Rolled"></v-checkbox>
          </v-row>
          <v-row>
            <v-checkbox v-model="hinge" label="Hinge"></v-checkbox>
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

  validations: {
    width: {
      between: between(0, 50000),
    },
    length: {
      between: between(0, 50000),
    },
    thickness: {
      between: between(0, 50000),
    },
    weight: {
      between: between(0, 50000),
    },
  },
  data: () => ({}),

  computed: {
    item() {
      return this.$store.getters["lith/newItem"];
    },

    width: {
      get() {
        return this.item.width;
      },
      set(data) {
        this.$store.commit("lith/width", data);
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

    length: {
      get() {
        return this.item.length;
      },
      set(data) {
        this.$store.commit("lith/length", data);
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

    thickness: {
      get() {
        return this.item.thickness;
      },
      set(data) {
        this.$store.commit("lith/thickness", data);
        this.handleNextButton();
      },
    },

    thicknessErrors() {
      const errors = [];
      if (!this.$v.thickness.$dirty) {
        return errors;
      }
      !this.$v.thickness.between &&
        errors.push("thickness must be between 1-50000");
      return errors;
    },

    weight: {
      get() {
        return this.item.weight;
      },
      set(data) {
        this.$store.commit("lith/weight", data);
        this.handleNextButton();
      },
    },
    weightErrors() {
      const errors = [];
      if (!this.$v.weight.$dirty) {
        return errors;
      }
      !this.$v.weight.between && errors.push("weight must be between 1-50000");
      return errors;
    },

    description: {
      get() {
        return this.item.description;
      },
      set(data) {
        this.$store.commit("lith/description", data);
        this.handleNextButton();
      },
    },
    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.required &&
        errors.push("description can not be empty");
      return errors;
    },

    burnt: {
      get() {
        return this.item.burnt;
      },
      set(data) {
        console.log("burnt set to " + data);
        this.$store.commit("lith/burnt", data);
      },
    },

    rolled: {
      get() {
        return this.item.rolled;
      },
      set(data) {
        this.$store.commit("lith/rolled", data);
      },
    },

    hinge: {
      get() {
        return this.item.hinge;
      },
      set(data) {
        this.$store.commit("lith/hinge", data);
      },
    },
  },
  methods: {
    nextClicked() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("itemNew.Validation error");
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


