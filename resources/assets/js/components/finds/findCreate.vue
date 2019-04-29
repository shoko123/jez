<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>{{headerMessage}}</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-stepper v-model="step" vertical>
              <v-stepper-header>
                <v-stepper-step step="1" :complete="step > 1">Find registration info</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="2" :complete="step > 2">Find data</v-stepper-step>
                <v-divider></v-divider>
                <v-stepper-step step="3">media</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <findRegistrationForm></findRegistrationForm>
                <groundstoneCreateForm></groundstoneCreateForm>
                <mediaCreateForm></mediaCreateForm>

                <!--v-stepper-content step="2">
                  <v-text-field label="Street" v-model="registration.street" required></v-text-field>
                  <v-text-field label="City" v-model="registration.city" required></v-text-field>
                  <v-text-field label="State" v-model="registration.state" required></v-text-field>

                  <v-btn flat @click.native="step = 1">Previous</v-btn>
                  <v-btn color="primary" @click.native="step = 3">Continue</v-btn>
                </v-stepper-content>
                <v-stepper-content step="3">
                  <v-text-field
                    label="Number of Tickets"
                    type="number"
                    v-model="registration.numtickets"
                    required
                  ></v-text-field>
                  <v-select
                    label="Shirt Size"
                    v-model="registration.shirtsize"
                    :items="sizes"
                    required
                  ></v-select>

                  <v-btn flat @click.native="step = 2">Previous</v-btn>

                  <v-btn type="submit" primary>submit</v-btn>
                  
                </v-stepper-content-->
              </v-stepper-items>
            </v-stepper>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  
</template>

<script>
import findRegistrationForm from "./findRegistrationForm";
import groundstoneCreateForm from "../groundstone/groundstoneCreateForm";
import mediaCreateForm from "../media/mediaCreateForm";

export default {
  name: "find-create",
  components: { findRegistrationForm, groundstoneCreateForm, mediaCreateForm },

  created() {
    console.log("findRegistrationForm.created(). isCreate:" + this.isCreate);
  },

  data: () => ({
    locusHydrated: false,
    //data() {
    //  return {

    //step: 1,
    registration: {
      name: null,
      email: null,
      street: null,
      city: null,
      state: null,
      numtickets: 0,
      shirtsize: "XL"
    },
    sizes: ["S", "M", "L", "XL"],

  
    registrationCategories: [{ id: 0, name: "GS" }, { id: 1, name: "AR" }]
  }),

  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
    },
    step: {
      get() {
        return this.findFormData.step;
      },
      set(data) {
        this.$store.commit("step", data);
      }
    },

    headerMessage() {
      return this.$store.getters.headerMessage;
    },
    
  },
  methods: {
    
  }
};
</script>
