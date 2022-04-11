<template>
  <form>
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row wrap no-gutters>
        <v-col xs12 sm4>
          <v-textarea
            label="Taxon"
            v-model="taxon"
            :error-messages="taxonErrors"
            @input="$v.taxon.$touch()"
            @blur="$v.taxon.$touch()"
            filled
            class="mr-1"
          ></v-textarea>
        </v-col>

        <v-col xs12 sm4>
          <v-textarea
            label="Element"
            v-model="element"
            :error-messages="elementErrors"
            @input="$v.element.$touch()"
            @blur="$v.element.$touch()"
            filled
            class="mr-1"
          ></v-textarea>
        </v-col>
        <v-col xs12 sm4>
          <v-textarea
            label="Notes"
            v-model="notes"
            :error-messages="notesErrors"
            @input="$v.notes.$touch()"
            @blur="$v.notes.$touch()"
            filled
            class="mr-1"
          ></v-textarea>
        </v-col>
      </v-row>

      <v-row wrap no-gutters>
        <v-text-field
          label="GL"
          v-model="newItem.GL"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Glpe"
          v-model="newItem.Glpe"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="GLl"
          v-model="newItem.GLl"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="GLP"
          v-model="newItem.GLP"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Bd"
          v-model="newItem.Bd"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="BT"
          v-model="newItem.BT"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Dd"
          v-model="newItem.Dd"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="DFd"
          v-model="newItem.DFd"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Bp"
          v-model="newItem.Bp"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Dp"
          v-model="newItem.Dp"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="SD"
          v-model="newItem.SD"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="HTC"
          v-model="newItem.HTC"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="Dl"
          v-model="newItem.Dl"
          class="mr-1"
          filled
        ></v-text-field>
        <v-text-field
          label="DEM"
          v-model="newItem.DEM"
          class="mr-1"
          filled
        ></v-text-field>
      </v-row>
    </v-container>
  </form>
</template>


<script>
import StepButtons from "../stepper/StepButtons";
import { maxLength, between } from "vuelidate/lib/validators";

export default {
  components: { StepButtons },

  validations: {
    taxon: {
      maxLength: maxLength(400),
    },
    element: {
      maxLength: maxLength(200),
    },
    notes: {
      maxLength: maxLength(200),
    },
    GL: {
      between: between(0, 99),
    },
    Glpe: {
      between: between(0, 99),
    },
    GLP: {
      between: between(0, 99),
    },
    GLP: {
      between: between(0, 99),
    },
    Bd: {
      between: between(0, 99),
    },
    BT: {
      between: between(0, 99),
    },
  },
  data: () => ({}),

  computed: {
    newItem() {
      return this.$store.getters["fauna/newItem"];
    },

    taxon: {
      get() {
        return this.newItem.taxon;
      },
      set(data) {
        this.$store.commit("fauna/taxon", data);
        this.handleNextButton();
      },
    },

    taxonErrors() {
      const errors = [];
      if (!this.$v.taxon.$dirty) {
        return errors;
      }
      !this.$v.taxon.maxLength &&
        errors.push("Taxon exceeds length of 400 characters");
      return errors;
    },

    element: {
      get() {
        return this.newItem.element;
      },
      set(data) {
        this.$store.commit("fauna/element", data);
        this.handleNextButton();
      },
    },

    elementErrors() {
      const errors = [];
      if (!this.$v.element.$dirty) {
        return errors;
      }
      !this.$v.element.maxLength &&
        errors.push("element exceeds max length of 200 characters");
      return errors;
    },

    notes: {
      get() {
        return this.newItem.notes;
      },
      set(data) {
        this.$store.commit("fauna/notes", data);
        this.handleNextButton();
      },
    },

    notesErrors() {
      const errors = [];
      if (!this.$v.notes.$dirty) {
        return errors;
      }
      !this.$v.notes.maxLength &&
        errors.push("Notes exceeds max length of 200 characters");
      return errors;
    },

    GL: {
      get() {
        return this.newItem.GL;
      },
      set(data) {
        this.$store.commit("fauna/GL", data);
        this.handleNextButton();
      },
    },
    GLErrors() {
      const errors = [];
      if (!this.$v.GL.$dirty) {
        return errors;
      }
      !this.$v.GL.between && errors.push("GL value is between 0 - 99");
      return errors;
    },

    Glpe: {
      get() {
        return this.newItem.Glpe;
      },
      set(data) {
        this.$store.commit("fauna/Glpe", data);
        this.handleNextButton();
      },
    },
    GlpeErrors() {
      const errors = [];
      if (!this.$v.Glpe.$dirty) {
        return errors;
      }
      !this.$v.Glpe.between && errors.push("Glpe value is between 0 - 99");
      return errors;
    },

    GLP: {
      get() {
        return this.newItem.GLP;
      },
      set(data) {
        this.$store.commit("fauna/GLP", data);
        this.handleNextButton();
      },
    },
    GLPErrors() {
      const errors = [];
      if (!this.$v.GLP.$dirty) {
        return errors;
      }
      !this.$v.GLP.between && errors.push("GLP value is between 0 - 99");
      return errors;
    },

    GLP: {
      get() {
        return this.newItem.GLP;
      },
      set(data) {
        this.$store.commit("fauna/GLP", data);
        this.handleNextButton();
      },
    },
    GLPErrors() {
      const errors = [];
      if (!this.$v.GLP.$dirty) {
        return errors;
      }
      !this.$v.GLP.between && errors.push("GLP value is between 0 - 99");
      return errors;
    },

    Bd: {
      get() {
        return this.newItem.Bd;
      },
      set(data) {
        this.$store.commit("fauna/Bd", data);
        this.handleNextButton();
      },
    },
    BdErrors() {
      const errors = [];
      if (!this.$v.Bd.$dirty) {
        return errors;
      }
      !this.$v.Bd.between && errors.push("Bd value is between 0 - 99");
      return errors;
    },

    BT: {
      get() {
        return this.newItem.BT;
      },
      set(data) {
        this.$store.commit("fauna/BT", data);
        this.handleNextButton();
      },
    },
    BTErrors() {
      const errors = [];
      if (!this.$v.BT.$dirty) {
        return errors;
      }
      !this.$v.BT.between && errors.push("BT value is between 0 - 99");
      return errors;
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


