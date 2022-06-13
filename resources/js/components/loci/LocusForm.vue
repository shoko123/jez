<template>
   <v-container v-if="item" fluid class="pa-1 ma-0">
        <v-row wrap no-gutters>
          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="item.square" readonly label="Square" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="item.locus_above" readonly label="Locus Above" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="item.locus_below" readonly label="Locus Below" filled></v-text-field>
          </v-col>
          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="item.locus_co_existing" readonly label="Co-Existing" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="date_opened" readonly label="Date Opened" filled></v-text-field>
          </v-col>

          <v-col md2 lg1 class="px-1">
            <v-text-field v-model="date_closed" readonly label="Date Closed" filled></v-text-field>
          </v-col>

          <v-col md4 lg2 class="px-1">
            <v-text-field v-model="item.level_opened" readonly label="Level Opened" filled></v-text-field>
          </v-col>

          <v-col md4 lg2 class="px-1">
            <v-text-field v-model="item.level_closed" readonly label="Level Closed" filled></v-text-field>
          </v-col>

          <v-col md4 lg1 class="px-1">
            <v-text-field v-model="item.clean" readonly label="Clean" filled></v-text-field>
          </v-col>
        </v-row>

        <v-row wrap no-gutters>
          <v-col md6 lg4 class="px-1">
            <v-textarea
              v-model="item.description"
              rows="1"
              auto-grow
              readonly
              label="Description"
              filled
            ></v-textarea>
          </v-col>

          <v-col md6 lg4 class="px-1">
            <v-textarea v-model="item.deposit" rows="1" auto-grow readonly label="Deposit" filled></v-textarea>
          </v-col>

          <v-col md6 lg4 class="px-1">
            <v-textarea
              v-model="item.registration_notes"
              rows="1"
              auto-grow
              readonly
              label="Registration Notes"
              filled
            ></v-textarea>
          </v-col>
        </v-row>
        <TagList />
   </v-container>
</template>

<script>
import TagList from "../tags/TagList";
export default {
  components: {
    TagList,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },

    date_opened() {
      return this.item.date_opened
        ? new Date(this.item.date_opened).toISOString().substring(0, 10)
        : "";
    },

    date_closed() {
      return this.item.date_closed
        ? new Date(this.item.date_closed).toISOString().substring(0, 10)
        : "";
    }
  }
};
</script>