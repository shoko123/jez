<template>
  <!--form @submit.prevent="submitForm('stone')" data-vv-scope="stone"-->
  <form data-vv-scope="stone">
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
            @change="typeSelected"
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
            @change="materialSelected"
          ></v-select>
        </v-col>
        <v-col xs12 sm2 class="px-1">
          <v-text-field
            label="weight"
            v-model="weight"
            v-validate="'between:1,9999'"
            :error-messages="errors.collect('stone.weight')"
            name="weight"
            filled
          ></v-text-field>
        </v-col>
      </v-row>
      <v-row wrap>
        <v-col xs12 sm6 class="px-1">
          <v-textarea
            label="notes"
            v-model="notes"
            :error-messages="errors.collect('stone.notes')"
            name="notes"
            filled
          ></v-textarea>
        </v-col>
        <v-col xs12 sm6 class="px-1">
          <v-textarea
            label="measurements"
            v-model="measurements"
            :error-messages="errors.collect('stone.measurements')"
            name="measurements"
            filled
          ></v-textarea>
        </v-col>
      </v-row>

      <div class="text-left">
        <v-btn text @click.native="--step" class="px-2">Previous</v-btn>
        <v-btn text @click.native="cancel" class="px-2">Cancel</v-btn>
        <v-btn
          @click.native="submitForm('stone')"
          disable="disableSubmit"
          color="primary"
          class="px-2"
        >submit</v-btn>
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
    submitForm(scope) {
      //console.log("next()");
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.$store
            .dispatch("mgr/store")
            .then(res => {
              //let newLocusId = res.data.item.id;
              this.step = 1;
              this.$router.push({
                path: `/finds/stones/${res.data.item.id}/show`
              });
            })
            .catch(err => {});
          return;
        }
      });
    
    },
    cancel() {
      this.$router.push({
        path: `${this.$store.getters["mgr/status"].pathPrevious}`
      });
    },

    clear() {},
    typeSelected() {},
    materialSelected() {}
  }
};
</script>


