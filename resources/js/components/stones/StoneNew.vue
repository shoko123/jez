<template>
  <form name="stone">
    <v-container fluid>
      <v-row wrap>
        <v-col xs12 sm2>
          <v-select
            label=" stone type"
            :items="stoneTypes"
            v-model="stone_type_id"
            name="type"
            item-text="name"
            item-value="id"
            single-line
            filled
          ></v-select>
        </v-col>
        <v-col xs12 sm2 class="px-1">
          <v-select
            label="material"
            :items="materials"
            v-model="material_id"
            name="material"
            item-text="name"
            item-value="id"
            single-line
            filled
          ></v-select>
        </v-col>
        <v-col xs12 sm2 class="px-1">
          <v-text-field label="weight" v-model="weight" name="weight" filled></v-text-field>
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm6 class="px-1">
          <v-textarea label="notes" v-model="notes" name="notes" filled></v-textarea>
        </v-col>
        <v-col xs12 sm6 class="px-1">
          <v-textarea label="measurements" v-model="measurements" name="measurements" filled></v-textarea>
        </v-col>
      </v-row>

      <v-row wrap>
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
    stone_type_id: {
      get() {
        return this.$store.getters["stones/stone_type_id"];
      },
      set(data) {
        this.$store.commit("stones/stone_type_id", data);
      }
    },

    material_id: {
      get() {
        return this.$store.getters["stones/material_id"];
      },
      set(data) {
        this.$store.commit("stones/material_id", data);
      }
    },
    weight: {
      get() {
        return this.$store.getters["stones/weight"];
      },
      set(data) {
        this.$store.commit("stones/weight", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["stones/notes"];
      },
      set(data) {
        this.$store.commit("stones/notes", data);
      }
    },
    measurements: {
      get() {
        return this.$store.getters["stones/measurements"];
      },
      set(data) {
        this.$store.commit("stones/measurements", data);
      }
    },

    materials() {
      return this.$store.getters["stones/materials"];
    },
    stoneTypes() {
      return this.$store.getters["stones/stoneTypes"];
    }
  },

  methods: {
    nextClicked() {
      console.log(
        "StoneNew.nextClicked() item: " +
          JSON.stringify(this.$store.getters["loci/newItem"], null, 2)
      );

      this.$store.dispatch("mgr/store", this.$router)
      .then(res => {
        this.$store.commit("stp/moveToStep", "first");
      });

      /*
      this.$v.$touch();
      if (this.$v.$invalid) {
        console.log("locusNew.Validation error");
        this.$store.commit("stp/disableNextButton", true);
      } else {
        console.log("validation passed - before store dispatch");

        this.$store.dispatch("mgr/store", this.$router).then(res => {
          //this.step = 1;
          //this.moveToStep("next");
          //this.$router.push({ path: `/loci/${res.data.item.id}/show` });
        });
      }
      */
    },

    handleNextButton() {
      this.$v.$touch();
      this.$store.commit("stp/disableNextButton", !!this.$v.$invalid);
    }
  }
};
</script>


