<template>
  <v-stepper-content step="3">
    <form @submit.prevent="submitForm('groundstone1')" data-vv-scope="groundstone1">
      <!--form data-vv-scope="groundstone1"-->
      <v-container fluid>
        <v-layout row wrap>      
            <v-flex xs12 sm2>
              <v-select
                label=" GS type"
                :items="types"
                v-model="groundstone_type_id"
                name="type"
                item-text="name"
                item-value="id"
                single-line
                box
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
                box
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
                box
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm2 class="px-1">
              <v-text-field
                label="length"
                v-model="length"
                v-validate="'required|between:1,999'"
                :error-messages="errors.collect('groundstone1.length')"
                name="length"
                box
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm2 class="px-1">
              <v-text-field
                label="height"
                v-model="height"
                v-validate="'required|between:1,999'"
                :error-messages="errors.collect('groundstone1.height')"
                name="height"
                box
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="description"
              v-model="description"
              v-validate="'required'"
              :error-messages="errors.collect('groundstone1.description')"
              name="description"
              box
            ></v-textarea>
          </v-flex>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea
              label="notes"
              v-model="notes"
              v-validate="'required'"
              :error-messages="errors.collect('groundstone1.notes')"
              name="notes"
              box
            ></v-textarea>
          </v-flex>
          </v-layout>
        <v-layout row wrap>
          <v-btn flat @click.native="step = 2">Previous</v-btn>
          <v-btn type="submit" color="primary">submit</v-btn>
          <v-spacer></v-spacer>
          <v-btn @click.native="cancel" color="primary">Cancel</v-btn>
        </v-layout>
      </v-container>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    console.log(
      "groundstoneCreateForm.created() groundstone: " +
        JSON.stringify(this.groundstone)
    );
    if (!this.isCreate) {
      this.description = this.groundstone.description;
      this.notes = this.groundstone.notes;
      this.type = this.groundstone.type;
      this.id = this.groundstone.id;
    }
    //get groundstone type list
    //get material list
    //this.getAreasWithLoci();
  },

  data: () => ({
    types: [
      {
        name: "lower slab",
        id: 0
      },
      {
        name: "anvil",
        id: 1
      },
      {
        name: "mortar",
        id: 2
      },
      {
        name: "pestle",
        id: 3
      },
      {
        name: "grinder",
        id: 4
      },
      {
        name: "worked stone",
        id: 5
      }
    ],

    materials: [
      {
        name: "basalt",
        id: 0
      },
      {
        name: "basalt - compact",
        id: 1
      },
      {
        name: "basalt - ",
        id: 2
      },
      {
        name: "basalt - fumice",
        id: 3
      },
      {
        name: "sandstone",
        id: 4
      },
      {
        name: "limestone",
        id: 5
      }
    ],
    width: null,
    length: null,
    height: null,
    drawn: null,
    //material_id: null,
    //groundstone_type_id: null,
    materialId: null,
    typeId: null,

    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
    },
    groundstoneFormData() {
      return this.$store.getters["gs/createData"];
    },

    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("step", data);
      }
    },

    isCreate() {
      return this.findFormData.isCreate;
    },

    headerMessage() {
      return this.findFormData.headerMessage;
    },
    groundstone() {
      return this.$store.getters["gs/groundstone"];
    },

    description: {
      get() {
        return this.groundstoneFormData.description;
      },
      set(data) {
        this.$store.commit("gs/formDataDescription", data);
      }
    },
    notes: {
      get() {
        return this.groundstoneFormData.notes;
      },
      set(data) {
        this.$store.commit("gs/formDataNotes", data);
      }
    },
    type: {
      get() {
        return this.groundstoneFormData.type;
      },
      set(data) {
        this.$store.commit("gs/formDataType", data);
      }
    },
    id: {
      get() {
        return this.groundstoneFormData.id;
      },
      set(data) {
        this.$store.commit("gs/formDataFindId", data);
      }
    },
    weight: {
      get() {
        return this.groundstoneFormData.weight;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "weight",
          data: data
        });
      }
    },
    material_id: {
      get() {
        return this.groundstoneFormData.material_id;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "material_id",
          data: this.material_id
        });
      }
    },
    groundstone_type_id: {
      get() {
        return this.groundstoneFormData.groundstone_type_id;
      },
      set(data) {
        this.$store.commit("gs/createDataSetter", {
          name: "groundstone_type_id",
          data: this.groundstone_type_id
        });
      }
    },
   
  },

  methods: {
    submitForm(scope) {
      //console.log("next()");

      this.$validator.validateAll(scope).then(result => {
        if (result) {

          this.sendToServer();
          return;
        }
        //alert("Correct them errors!");
      });
    },
    cancel() {
      this.$store.commit("findRegistrationClear", null);
      let gsId = this.isCreate ? this.groundstone.id : this.id;
      console.log("cancel pushing to " + gsId);
      this.$router.push(`/groundstones/${gsId}`);
    },

    clear() {
      /*
      this.locus.locus_no = "";
      this.locus.square = "";
      this.locus.date_opened = null;
      this.locus.date_closed = null;
      this.locus.level_opened = "";
      this.locus.level_closed = "";
      this.locus.locus_above = "";
      this.locus.locus_below = "";
      this.locus.locus_co_existing = "";
      this.locus.description = "";
      this.locus.deposit = "";
      this.locus.registration_notes = "";
      this.loculs.clean = "";
      this.$validator.reset();
      */
    },
    typeSelected() {},
    materialSelected() {},
    sendToServer() {
      console.log("sendToServer()");

      this.$store
        .dispatch("findCreate")
        .then(res => {
          //console.log(
          //  "gsCreateForm back from dispatch(findCreate) success!\n" +
          //    JSON.stringify(res, null, 2)
          //);
          let message = this.isCreate
            ? "groundstone created successfully, redirected to new groundstone"
            : "groundstone updated, redirected to updated groundstone";

          this.$store.commit("snackbar", {
            value: true,
            message: message,
            timeout: 4000,
            color: "green"
          });

          let gsId = res.data.groundstone.id;
          //console.log("updated groundstone id: " + gsId);
          this.$store.commit("findRegistrationClear", null);
          this.$router.push(`/groundstones/${gsId}`);
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("back from findCreate() failed " + err);
        });
    }
  }
};
</script>
