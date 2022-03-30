<template>
  <v-container v-if="item" fluid class="pa-1 ma-0">
    <v-row wrap no-gutters>
      <v-textarea
        v-model="item.description"
        label="Description"
        rows="1"
        auto-grow
        readonly
        filled
      ></v-textarea>
    </v-row>
    <v-row wrap no-gutters>
      <v-text-field
        label="Symmetry"
        v-model="item.symmetry"
        v-show="item.symmetry"
        class="mr-1"
        name="symmetry"
        filled
      ></v-text-field>

      <v-text-field
        label="D and R"
        v-model="item.d_and_r"
        v-show="item.d_and_r"
        class="mr-1"
        name="d_and_r"
        filled
      ></v-text-field>

      <v-text-field
        label="Age"
        v-model="item.age"
        v-show="item.age"
        name="age"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Breakage"
        v-model="item.breakage"
        v-show="item.breakage"
        name="breakage"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Butchery"
        v-model="item.butchery_desc"
        v-show="item.butchery"
        name="butchery_desc"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Burning"
        v-model="item.burning_desc"
        v-show="item.burning"
        name="burning_desc"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Weathering"
        v-model="item.weathering"
        v-show="item.weathering"
        name="weathering"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Other BMS"
        v-model="item.other_bsm"
        v-show="item.other_bsm"
        name="other_bsm"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Notes"
        v-model="item.notes"
        v-show="item.notes"
        name="notes"
        class="mr-1"
        filled
      ></v-text-field>
    </v-row>
    <v-row wrap no-gutters>
      <v-text-field
        label="GL"
        v-model="item.GL"
        v-show="item.GL"
        class="mr-1"
        name="GL"
        filled
      ></v-text-field>

      <v-text-field
        label="Glpe"
        v-model="item.Glpe"
        v-show="item.Glpe"
        class="mr-1"
        name="Glpe"
        filled
      ></v-text-field>

      <v-text-field
        label="GLl"
        v-model="item.GLl"
        v-show="item.GLl"
        name="GLl"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="GLP"
        v-model="item.GLP"
        v-show="item.GLP"
        name="GLP"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Bd"
        v-model="item.Bd"
        v-show="item.Bd"
        name="Bd"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="BT"
        v-model="item.BT"
        v-show="item.BT"
        name="BT"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Dd"
        v-model="item.Dd"
        v-show="item.Dd"
        name="Dd"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="BFd"
        v-model="item.BFd"
        v-show="item.BFd"
        name="BFd"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Bp"
        v-model="item.Bp"
        v-show="item.Bp"
        name="Bp"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Dp"
        v-model="item.Dp"
        v-show="item.Dp"
        name="Dp"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="SD"
        v-model="item.SD"
        v-show="item.SD"
        name="SD"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="HTC"
        v-model="item.HTC"
        v-show="item.HTC"
        name="HTC"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="Dl"
        v-model="item.Dl"
        v-show="item.Dl"
        name="Dl"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DEM"
        v-model="item.DEM"
        v-show="item.DEM"
        name="DEM"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DVM"
        v-model="item.DVM"
        v-show="item.DVM"
        name="DVM"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="WCM"
        v-model="item.WCM"
        v-show="item.WCM"
        name="WCM"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DEL"
        v-model="item.DEL"
        v-show="item.DEL"
        name="DEL"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DVL"
        v-model="item.DVL"
        v-show="item.DVL"
        name="DVL"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="WCL"
        v-model="item.WCL"
        v-show="item.WCL"
        name="WCL"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="LD"
        v-model="item.LD"
        v-show="item.LD"
        name="LD"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DLS"
        v-model="item.DLS"
        v-show="item.DLS"
        name="DLS"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="LG"
        v-model="item.LG"
        v-show="item.LG"
        name="LG"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="BG"
        v-model="item.BG"
        v-show="item.BG"
        name="BG"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="DID"
        v-model="item.DID"
        v-show="item.DID"
        name="DID"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="BFcr"
        v-model="item.BFcr"
        v-show="item.BFcr"
        name="BFcr"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="GD"
        v-model="item.GD"
        v-show="item.GD"
        name="GD"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="GB"
        v-model="item.GB"
        v-show="item.GB"
        name="GB"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="BF"
        v-model="item.BF"
        v-show="item.BF"
        name="BF"
        class="mr-1"
        filled
      ></v-text-field>
      <v-text-field
        label="LF"
        v-model="item.LF"
        v-show="item.LF"
        name="LF"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="GLm"
        v-model="item.GLm"
        v-show="item.GLm"
        name="GLm"
        class="mr-1"
        filled
      ></v-text-field>

      <v-text-field
        label="GH"
        v-model="item.GH"
        v-show="item.GH"
        name="GH"
        class="mr-1"
        filled
      ></v-text-field>
    </v-row>
    <template v-if="showTags">
      <TagList />
    </template>
  </v-container>
</template>

<script>
import TagList from "../tags/TagList";
export default {
  components: {
    TagList,
  },
  props: {
    showTags: Boolean,
  },
  computed: {
    item() {
      return this.$store.getters["mgr/item"];
    },
    tags() {
      return this.$store.getters[`aux/selectedItemParams`];
    },
  },
};
</script>



