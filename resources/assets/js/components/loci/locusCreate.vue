<template>
  <v-form @submit.prevent="submit">>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12 sm2>
          <locusTag/>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            class="pr-1"
            name="square"
            v-model="locus.square"
            :error-messages="errors.collect('square')"
            label="Square"
            box
            required
          ></v-text-field>
          <v-spacer></v-spacer>
          <!--v-text-field v-model="square" label="square" box></v-text-field-->
        </v-flex>

        <v-flex xs12 sm2>
          <v-menu
            ref="menu"
            :close-on-content-click="false"
            v-model="menu"
            :nudge-right="40"
            :return-value.sync="locus.date_opened"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              class="pr-1"
              slot="activator"
              name="date_opened"
              v-model="locus.date_opened"
              :error-messages="errors.collect('date_opened')"
              label="date opened"
              prepend-icon="event"
              readonly
              box
            ></v-text-field>
            <v-date-picker v-model="locus.date_opened">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu.save(locus.date_opened)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <v-spacer></v-spacer>
          <!--v-text-field v-model="date_opened_formatted" label="date opened" box></v-text-field-->
        </v-flex>

        <v-flex xs12 sm2>
          <v-menu
            ref="menu2"
            :close-on-content-click="false"
            name="date_closed"
            v-model="menu2"
            :nudge-right="40"
            :return-value.sync="locus.date_closed"
            lazy
            transition="scale-transition"
            offset-y
            full-width
            min-width="290px"
          >
            <v-text-field
              class="pr-1"
              slot="activator"
              v-model="locus.date_closed"
              label="date closed"
              prepend-icon="event"
              readonly
              box
            ></v-text-field>
            <v-date-picker v-model="locus.date_closed">
              <v-spacer></v-spacer>
              <v-btn flat color="primary" @click="menu = false">Cancel</v-btn>
              <v-btn flat color="primary" @click="$refs.menu2.save(locus.date_closed)">OK</v-btn>
            </v-date-picker>
          </v-menu>
          <!--v-text-field v-model="date_closed_formatted" label="date closed" box></v-text-field-->
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            class="pr-1"
            name="level_opened"
            v-model="locus.level_opened"
            :error-messages="errors.collect('level_opened')"
            label="level opened"
            box
          ></v-text-field>
          <!--v-text-field v-model="level_opened" label="level opened" box></v-text-field-->
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            class="pr-1"
            name="level_closed"
            v-model="locus.level_closed"
            :error-messages="errors.collect('level_closed')"
            label="level closed"
            box
          ></v-text-field>
          <!--v-text-field v-model="level_closed" label="level closed" box></v-text-field-->
        </v-flex>
      </v-layout>

      <v-layout row wrap>
        <v-flex xs12 sm4>
          <v-textarea
            class="pr-1"
            name="description"
            v-model="locus.description"
            v-validate="'required'"
            :error-messages="errors.collect('description')"
            label="description"
            box
          ></v-textarea>
          <!--v-textarea v-model="description" label="description" box></v-textarea-->
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea
            class="pr-1"
            name="deposit"
            v-model="locus.deposit"
            :error-messages="errors.collect('deposit')"
            label="deposit"
            box
          ></v-textarea>
          <!--v-textarea v-model="deposit" label="deposit" box></v-textarea-->
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea
            class="pr-1"
            name="registration_notes"
            :error-messages="errors.collect('registration_notes')"
            label="registration notes"
            box
          ></v-textarea>
        </v-flex>
      </v-layout>

      <v-btn type="submit">submit</v-btn>
      <v-btn @click="clear">clear</v-btn>
    </v-container>
  </v-form>
</template>






<script>
//need to add validation to dates

import locusTag from "./locusTag";

export default {
  components: { locusTag },

  data() {
    return {
      locus: {
        area_id: "",
        locus_no: 1,
        square: "",
        date_opened: "",
        date_closed: "",
        level_opened: "",
        level_closed: "",
        locus_above: "",
        locus_below: "",
        locus_co_existing: "",
        description: "",
        deposit: "",
        registration_notes: ""
      },
      area: {
        id: "",
        year: "2015",
        name: "S"
      },
      modal: false,
      modal2: false,
      menu: "",
      menu2: "",
      select_locus_dialog: false
    };
  },

  mounted() {},
  computed: {
    valid() {
      return this.errors.items.length <= 0;
    },
    newLocusTag() {
      return this.$store.getters.newLocusTag;
    }
  },
  methods: {
    
    submit() {
      this.$validator.validateAll().then(result => {
        if (result) {
          // eslint-disable-next-line
          //alert('Form Submitted!');
          this.sendToServer();
          return;
        }
        alert("Correct them errors!");
      });
    },

    clear() {
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
    },

    sendToServer() {
      let new_locus = {
        area_id: this.newLocusTag.area_id,
        locus: this.newLocusTag.locus_no,
        square: this.locus.square,
        date_opened: this.locus.date_opened,
        date_closed: this.locus.date_closed,
        level_opened: this.locus.level_opened,
        level_closed: this.locus.level_closed,
        locus_above: this.locus.locus_above,
        locus_below: this.locus.locus_below,
        locus_co_existing: this.locus.locus_co_existing,
        description: this.locus.description,
        deposit: this.locus.deposit,
        registration_notes: this.locus.registration_notes,
        clean: this.locus.clean = "",
      };

      axios
        .post("/api/loci/create", new_locus)
        .then(res => {
          alert("locus created! id: " + res.data.id);
          //router.push({ path: `/user/${userId}` }) // -> /user/123
          this.$router.push({ path: `/loci/${res.data.id}` });


        })
        .catch(err => {
          alert("locus creation failed!");
          console.log(err);
        });

      console.log(new_locus);
    }
  }
};
</script>