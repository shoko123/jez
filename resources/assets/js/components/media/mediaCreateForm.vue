<template>
  <v-stepper-content step="3">
    <form @submit.prevent="submitForm('mediaForm')" data-vv-scope="mediaForm">
      <v-container fluid>
        <v-layout row wrap>
          <v-flex xs12 sm6 class="px-1">
            <v-textarea label="Add media" box></v-textarea>
          </v-flex>
        </v-layout>
      </v-container>

      <v-btn flat @click.native="step = 2">Previous</v-btn>
      <v-btn type="submit" color="primary">submit</v-btn>
    </form>
  </v-stepper-content>
</template>

<script>
export default {
  created() {
    console.log("mediaCreateForm.created()");
    //this.getAreasWithLoci();
  },

 
    //locusHydrated: false,
    data() {
     return {};

    
  },

  computed: {
    findFormData() {
      return this.$store.getters.findFormData;
    },
    groundstoneFormData() {
      return this.$store.getters['gs/formData'];
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
  },

    
  methods: {
    submitForm(scope) {
      console.log("submit");

      this.$validator.validateAll(scope).then(result => {
        if (result) {
          // eslint-disable-next-line
          //alert("submitting!");
          
          this.sendToServer();
          this.step = 3;
          return;
        }
        alert("Correct them errors!");
      });
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

    sendToServer() {
      console.log("sendToServer()");

      let find = {
        locus_id: this.findFormData.registration.locusId,
        registration_category: this.findFormData.registration.registrationCategory,
        basket_no: this.findFormData.registration.basketNo,
        item_no: this.findFormData.registration.itemNo,
        related_pottery_basket: this.findFormData.registration.related_pottery_basket,
        date: this.findFormData.registration.date,
        description: this.findFormData.registration.description,
        notes: this.findFormData.registration.notes,
        square: this.findFormData.registration.square,
        keep: this.findFormData.registration.keep,
        level_top: this.findFormData.registration.level_top,
        level_bottom: this.findFormData.registration.level_bottom,
        quantity: this.findFormData.registration.quantity,
        findable_type: "Groundstone",
        findable_id: null
      };

      let newGroundstone = {
        groundstone: this.groundstoneFormData,
        find: find,
      };
      //console.log("before create find: " + JSON.stringify(this.findFormData));
      console.log("before create " + JSON.stringify(newGroundstone));

        
      axios
        .post("/api/groundstones/create", newGroundstone)
        .then(res => {
          console.log("success!\n" + JSON.stringify(res));
          
          this.$store.commit("snackbar", {
            value: true,
            message: "groundstone created",
            timeout: 4000,
            color: "green"
          });
          //alert("groundstone + find created! id: " + res.data.id);
          //router.push({ path: `/user/${userId}` }) // -> /user/123
          //this.$router.push({ path: `/groundstones/${res.data.groundstone.id}` });
        })
        .catch(err => {
          //alert("groundstone creation failed!");
          console.log("groundstoneCreate failed\n" + err);
        });
        
    }
  }
};
</script>
