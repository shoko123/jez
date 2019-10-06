<template>
  <form @submit.prevent="submitForm('groundstone1')" data-vv-scope="groundstone1">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-select
            label=" GS type"
            :items="stoneTypes"
            v-model="stone_type_id"
            name="type"
            item-text="name"
            item-value="id"
            single-line
            filled
            @change="typeSelected"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm2 class="px-1">
          <v-select
            label="material"
            :items="materials"
            v-model="material_id"
            name="material"
            item-text="name"
            item-value="id"
            single-line
            filled
            @change="materialSelected"
          ></v-select>
        </v-flex>
        <v-flex xs12 sm2 class="px-1">
          <v-text-field
            label="weight"
            v-model="weight"
            v-validate="'between:1,9999'"
            :error-messages="errors.collect('groundstone1.weight')"
            name="weight"
            filled
          ></v-text-field>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex xs12 sm6 class="px-1">
          <v-textarea
            label="notes"
            v-model="notes"
            :error-messages="errors.collect('groundstone1.notes')"
            name="notes"
            filled
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 class="px-1">
          <v-textarea
            label="measurements"
            v-model="measurements"
            :error-messages="errors.collect('groundstone1.measurements')"
            name="measurements"
            filled
          ></v-textarea>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-btn text @click.native="--step">Previous</v-btn>
        <v-btn text @click.native="cancel">Cancel</v-btn>
        <v-btn type="submit" disable="disableSubmit" color="primary">submit</v-btn>
        <v-spacer></v-spacer>
      </v-layout>
    </v-container>
  </form>
</template>

<script>
export default {
  created() {
    console.log("GroundstoneNew created");
  },

  data: () => ({
    disableSubmit: false
  }),

  computed: {
    step: {
      get() {
        return this.$store.getters["stp/step"];
      },
      set(data) {
        this.$store.commit("stp/step", data);
      }
    },

    isCreate() {
      return this.$store.getters["mgr/isCreate"];
    },

   stone_type_id: {
      get() {
        return this.$store.getters["gss/stone_type_id"];
      },
      set(data) {
        this.$store.commit("gss/stone_type_id", data);
      }
    }, 

    material_id: {
      get() {
        return this.$store.getters["gss/material_id"];
      },
      set(data) {
        this.$store.commit("gss/material_id", data);
      }
    },
    weight: {
      get() {
        return this.$store.getters["gss/weight"];
      },
      set(data) {
        this.$store.commit("gss/weight", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["gss/notes"];
      },
      set(data) {
        this.$store.commit("gss/notes", data);
      }
    },
    measurements: {
      get() {
        return this.$store.getters["gss/measurements"];
      },
      set(data) {
        this.$store.commit("gss/measurements", data);
      }
    },

    materials() {
      return this.$store.getters["gss/materials"];
    },
    stoneTypes() {
      return this.$store.getters["gss/stoneTypes"];
    }
  },

  methods: {
    submitForm(scope) {
      //console.log("next()");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          //once gs is saved in DB, we reload all groundstones - this will put it in the right order.
          //this is wasteful, but OK for now.
          //the redirection to the new/updated groundstone will be done in the component level (in GroundstoneNew)
          //dispatch('gs/groundstones', null);

          this.$store
            .dispatch("gss/store")
            .then(res => {
              let newGsId = res.data.groundstone.id;

              if (this.isCreate) {
                this.$store.dispatch("gss/collection").then(res => {
                  this.step = 1;
                  this.$router.push({
                    path: `/finds/groundstones/${newGsId}/show`
                  });
                });
              } else {
                this.step = 1;
                this.$router.push({
                  path: `/finds/groundstones/${newGsId}/show`
                });
              }
            })
            .catch(err => {});
          return;
        }
        //alert("Correct them errors!");
      });
    },
    cancel() {
      this.$router.push({ path: `${this.$store.getters["mgr/previousPath"]}` });
    },

    clear() { },
    typeSelected() {},
    materialSelected() {},
    sendToServer() {
      console.log("sendToServer()");
      this.disableSubmit = true;
    }
  }
};
</script>
