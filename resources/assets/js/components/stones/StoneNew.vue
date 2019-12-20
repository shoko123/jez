<template>
  <!--form @submit.prevent="submitForm('stone')" data-vv-scope="stone"-->
  <form data-vv-scope="stone">
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <v-select
            label=" stone type"
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
            :error-messages="errors.collect('stone.weight')"
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
            :error-messages="errors.collect('stone.notes')"
            name="notes"
            filled
          ></v-textarea>
        </v-flex>
        <v-flex xs12 sm6 class="px-1">
          <v-textarea
            label="measurements"
            v-model="measurements"
            :error-messages="errors.collect('stone.measurements')"
            name="measurements"
            filled
          ></v-textarea>
        </v-flex>
      </v-layout>
      
        <div class="text-left">
        <v-btn text @click.native="--step" class="px-2">Previous</v-btn>
        <v-btn text @click.native="cancel" class="px-2">Cancel</v-btn>
        <!--v-btn type="submit" disable="disableSubmit" color="primary">submit</v-btn-->
        <v-btn
          @click.native="submitForm('stone', 'goTo')"
          disable="disableSubmit"
          color="primary"
          class="px-2"
        >submit and go to stone</v-btn>
        <v-btn
          @click.native="submitForm('stone', 'editMedia')"
          disable="disableSubmit"
          color="primary"
          class="px-2"
        >submit and edit media</v-btn>
        </div>
      
    </v-container>
  </form>
</template>

<script>
export default {
  created() {
    console.log("StoneNew created");
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
      return this.$store.getters["mgr/status"].isCreate;
    },

    stone_type_id: {
      get() {
        return this.$store.getters["stn/stone_type_id"];
      },
      set(data) {
        this.$store.commit("stn/stone_type_id", data);
      }
    },

    material_id: {
      get() {
        return this.$store.getters["stn/material_id"];
      },
      set(data) {
        this.$store.commit("stn/material_id", data);
      }
    },
    weight: {
      get() {
        return this.$store.getters["stn/weight"];
      },
      set(data) {
        this.$store.commit("stn/weight", data);
      }
    },
    notes: {
      get() {
        return this.$store.getters["stn/notes"];
      },
      set(data) {
        this.$store.commit("stn/notes", data);
      }
    },
    measurements: {
      get() {
        return this.$store.getters["stn/measurements"];
      },
      set(data) {
        this.$store.commit("stn/measurements", data);
      }
    },

    materials() {
      return this.$store.getters["stn/materials"];
    },
    stoneTypes() {
      return this.$store.getters["stn/stoneTypes"];
    }
  },

  methods: {
    submitForm(scope, nextAction) {
      //console.log("next()");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          //once gs is saved in DB, we reload all stones - this will put it in the right order.
          //this is wasteful, but OK for now.
          //the redirection to the new/updated stone will be done in the component level (in StoneNew)
          //dispatch('stn/stones', null);

          this.$store
            .dispatch("stn/store")
            .then(res => {
              let newId = res.data.stone.id;

              if (this.isCreate) {
                this.$store.dispatch("stn/collection").then(res => {
                  this.step = 1;
                  if (nextAction == "goTo") {
                    this.$router.push({ path: `/finds/stones/${newId}/show` });
                  } else {
                    this.$router.push({ path: `/finds/stones/${newId}/media` });
                  }
                });
              } else {
                this.step = 1;
                this.$router.push({
                  path: `/finds/stones/${newId}/show`
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
      this.$router.push({ path: `${this.$store.getters["mgr/pathPervious"]}` });
    },

    clear() {},
    typeSelected() {},
    materialSelected() {}
  }
};
</script>


