<template>
  <form>
    <v-container fluid>
      <v-row class="mb-1">
        <StepButtons v-on:nextClicked="nextClicked"></StepButtons>
      </v-row>
      <v-row>
        <v-col lg="scopeIsBasket ? 12 : 10">
          <v-container fluid>
            <v-row>
              <v-col xs12 sm6 lg6>
                <v-textarea
                  label="Description"
                  v-model="description"
                  :error-messages="descriptionErrors"
                  @input="$v.description.$touch()"
                  @blur="$v.description.$touch()"
                  filled
                  class="mr-1"
                ></v-textarea>
              </v-col>

              <v-col xs12 sm6 lg6>
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
            <v-row v-if="scopeIsArtifact" wrap no-gutters>
              <v-text-field
                label="GL"
                v-model="newItem.GL"
                :error-messages="GLErrors"
                @input="$v.GL.$touch()"
                @blur="$v.GL.$touch()"
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

              <v-text-field
                label="DVM"
                v-model="newItem.DVM"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="WCM"
                v-model="newItem.WCM"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="DEL"
                v-model="newItem.DEL"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="DVL"
                v-model="newItem.DVL"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="WCL"
                v-model="newItem.WCL"
                class="mr-1"
                filled
              ></v-text-field>

              <v-text-field
                label="LD"
                v-model="newItem.LD"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="DLS"
                v-model="newItem.DLS"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="LG"
                v-model="newItem.LG"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="BG"
                v-model="newItem.BG"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="DID"
                v-model="newItem.DID"
                class="mr-1"
                filled
              ></v-text-field>

              <v-text-field
                label="BFcr"
                v-model="newItem.BFcr"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="GD"
                v-model="newItem.GD"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="GB"
                v-model="newItem.GB"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="BF"
                v-model="newItem.BF"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="LF"
                v-model="newItem.LF"
                class="mr-1"
                filled
              ></v-text-field>

              <v-text-field
                label="GLm"
                v-model="newItem.GLm"
                class="mr-1"
                filled
              ></v-text-field>
              <v-text-field
                label="GH"
                v-model="newItem.GH"
                class="mr-1"
                filled
              ></v-text-field>
            </v-row>
          </v-container>
        </v-col>
        <v-col v-if="!scopeIsBasket" lg="2">
          <v-row wrap>
            <v-select
              label="Symmetry"
              :items="symmetryItems"
              item-text="text"
              item-value="val"
              v-model="symmetry"
            ></v-select>

            <v-text-field
              label="D and R"
              v-model="newItem.d_and_r"
              dense
              filled
            ></v-text-field>
            <v-text-field
              label="Breakage"
              v-model="newItem.breakage"
              dense
              filled
            ></v-text-field>

            <v-text-field
              label="Age"
              v-model="newItem.age"
              dense
              filled
            ></v-text-field>

            <v-text-field
              label="Weathering"
              v-model="newItem.weathering"
              dense
              filled
            ></v-text-field>
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

  validations: {
    description: {
      maxLength: maxLength(400),
    },
    notes: {
      maxLength: maxLength(200),
    },

    d_and_r: {
      maxLength: maxLength(100),
    },
    breakage: {
      maxLength: maxLength(100),
    },
    age: {
      maxLength: maxLength(20),
    },
    weathering: {
      maxLength: maxLength(100),
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
  data: () => ({
    symmetryItems: [
      { val: 0, text: "Unassigned" },
      { val: 1, text: "Left" },
      { val: 2, text: "Right" },
    ],
  }),

  computed: {
    newItem() {
      return this.$store.getters["fauna/newItem"];
    },
    scopeIsBasket() {
      return this.$store.getters["fnd/scopeIs"]("Basket");
    },
    scopeIsArtifact() {
      return this.$store.getters["fnd/scopeIs"]("Artifact");
    },

    description: {
      get() {
        return this.newItem.description;
      },
      set(data) {
        this.$store.commit("fauna/description", data);
        this.handleNextButton();
      },
    },

    descriptionErrors() {
      const errors = [];
      if (!this.$v.description.$dirty) {
        return errors;
      }
      !this.$v.description.maxLength &&
        errors.push("description exceeds length of 400 characters");
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

    symmetry: {
      get() {
        if (this.newItem.is_left === null) {
          return 0;
        } else {
          return this.newItem.is_left ? 1 : 2;
        }
      },
      set(data) {
        console.log(`symmetry.set (${data})`);
        let val = null;
        if(data > 0) {
          val = (data === 1) ? 1 : 0;
        }

        this.$store.commit("fauna/is_left", val);
        this.handleNextButton();
      },
    },

    d_and_r: {
      get() {
        return this.newItem.d_and_r;
      },
      set(data) {
        this.$store.commit("fauna/d_and_r", data);
        this.handleNextButton();
      },
    },

    d_and_rErrors() {
      const errors = [];
      if (!this.$v.d_and_r.$dirty) {
        return errors;
      }
      !this.$v.d_and_r.maxLength &&
        errors.push("d_and_r exceeds max length of 200 characters");
      return errors;
    },
    breakage: {
      get() {
        return this.newItem.breakage;
      },
      set(data) {
        this.$store.commit("fauna/breakage", data);
        this.handleNextButton();
      },
    },

    breakageErrors() {
      const errors = [];
      if (!this.$v.breakage.$dirty) {
        return errors;
      }
      !this.$v.breakage.maxLength &&
        errors.push("breakage exceeds max length of 200 characters");
      return errors;
    },

    age: {
      get() {
        return this.newItem.age;
      },
      set(data) {
        this.$store.commit("fauna/age", data);
        this.handleNextButton();
      },
    },

    ageErrors() {
      const errors = [];
      if (!this.$v.age.$dirty) {
        return errors;
      }
      !this.$v.age.maxLength &&
        errors.push("age exceeds max length of 200 characters");
      return errors;
    },

    weathering: {
      get() {
        return this.newItem.weathering;
      },
      set(data) {
        this.$store.commit("fauna/weathering", data);
        this.handleNextButton();
      },
    },
    weatheringErrors() {
      const errors = [];
      if (!this.$v.weathering.$dirty) {
        return errors;
      }
      !this.$v.weathering.maxLength &&
        errors.push("weathering exceeds max length of 200 characters");
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


