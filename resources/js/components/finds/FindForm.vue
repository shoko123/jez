<template>
  <v-container v-if="find" fluid class="ma-0 pa-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Registration Details</v-card-title>
      <v-card-text>
        <v-row no-gutters>
          <v-col lg="12">
            <v-card>
              <v-card-text>
                <v-row no-gutters>
                  <v-text-field
                    v-if="scopeIsBasket"
                    v-model="find.artifact_count"
                    readonly
                    label="Artifact Count"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-text-field
                    v-model="find.date"
                    readonly
                    label="Date"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-text-field
                    v-model="find.related_pottery_basket"
                    readonly
                    label="Related Pottery"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-text-field
                    v-model="find.square"
                    readonly
                    label="Square"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-text-field
                    v-model="find.level_top"
                    readonly
                    label="Level-Top"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-text-field
                    v-model="find.level_bottom"
                    readonly
                    label="Level-Bottom"
                    dense
                    class="ml-1"
                    filled
                  ></v-text-field>

                  <v-checkbox
                    v-model="find.keep"
                    readonly
                    label="Keep"
                    class="ml-1"
                  ></v-checkbox>
                </v-row>

                <v-row wrap no-gutters>
                  <v-col xs12 lg4 class="px-1">
                    <v-textarea
                      v-model="find.description"
                      rows="1"
                      auto-grow
                      readonly
                      label="Description"
                      filled
                    ></v-textarea>
                  </v-col>
                  <v-col xs12 lg4 class="px-1">
                    <v-textarea
                      v-model="find.notes"
                      rows="1"
                      auto-grow
                      readonly
                      label="Notes"
                      filled
                    ></v-textarea>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: "find-form",
  computed: {
    find() {
      return this.$store.getters["fnd/item"];
    },

    scopeIsBasket() {
      return this.$store.getters["fnd/scopeIs"]("Basket");
    },

    artifacts() {
      return this.$store.getters["mgr/collections"]("related").chunk;
    },

    relatedHeader() {
      return `This ${this.scopeIsBasket ? "basket" : "artifact"} has ${
        this.artifacts.length === 0 ? "no " : ""
      } related database entr${this.artifacts.length === 1 ? "y" : "ies"}`;
    },
  },
};
</script>



