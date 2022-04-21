<template>
  <v-container v-if="item" fluid class="pt-2">
    <v-row no-gutters>
       <v-col lg="scopeIsBasket ? 12 : 10">
        <v-card class="pa-2">
          <v-card-text>
            <v-row wrap no-gutters>
              <v-textarea
                v-model="item.description"
                label="Description"
                rows="1"
                auto-grow
                readonly
                filled
              ></v-textarea>
              <v-textarea
                v-model="item.notes"
                label="Notes"
                class="pl-1"
                rows="1"
                auto-grow
                readonly
                filled
              ></v-textarea>
            </v-row>

            <TagList />

            <v-divider />

            <v-row
              v-if="measurements.length"
              wrap
              no-gutters
              class="text-subtitle-1"
            >
              Measurements:
              <v-chip v-for="m in measurements" :key="m.name" class="ma-2"
                >{{ m.name }}: {{ m.value }}</v-chip
              >
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      
      <v-col v-if="!scopeIsBasket" lg="2">
        <v-card class="pa-2">
          <v-card-text>
            <v-row wrap>
              <v-text-field
                label="Symmetry"
                v-model="symmetry"
                dense
                filled
              ></v-text-field>

              <v-text-field
                label="D and R"
                v-model="item.d_and_r"
                dense
                filled
              ></v-text-field>
              <v-text-field
                label="Breakage"
                v-model="item.breakage"
                dense
                filled
              ></v-text-field>

              <v-text-field
                label="Age"
                v-model="item.age"
                dense
                filled
              ></v-text-field>

              <v-text-field
                label="Weathering"
                v-model="item.weathering"
                dense
                filled
              ></v-text-field>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
    symmetry() {
      return this.item.is_left === null
        ? ""
        : this.item.is_left
        ? "Left"
        : "Right";
    },
    scopeIsBasket() {
      return this.$store.getters["fnd/scopeIs"]("Basket");
    },
  
    measurements() {
      if (this.item === null) {
        return [];
      }
      let filled = [];
      let all = [
        "GL",
        "Glpe",
        "GLl",
        "GLP",
        "Bd",
        "BT",
        "Dd",
        "BFd",
        "Bp",
        "Dp",
        "SD",
        "HTC",
        "Dl",
        "DEM",
        "DVM",
        "WCM",
        "DEL",
        "DVL",
        "WCL",
        "LD",
        "DLS",
        "LG",
        "BG",
        "DID",
        "BFcr",
        "GD",
        "GB",
        "BF",
        "LF",
        "GLm",
        "GH",
      ];
      all.forEach((x) => {
        if (this.item[x] !== null) {
          filled.push({ name: x, value: this.item[x] });
        }
      });
      return filled;
    },
  },
};
</script>