<template>
  <div>
<template v-if="showSubMenu">
      <menuSub/>
    </template>
<v-container fluid>
  
      <v-row dense>
        <v-col
          :cols="9">
          <LocusForm></LocusForm>
        </v-col>
        <v-col       
          :cols="3"        >
          <ItemMediaGate></ItemMediaGate>
        </v-col>
      </v-row>
      <v-row dense>
       <LocusFinds></LocusFinds>
      </v-row>
    </v-container>



    
    <!--LocusForm></LocusForm>
    <LocusFinds></LocusFinds-->
  </div>
</template>

<script>
import LocusForm from "./LocusForm";
import LocusFinds from "./LocusFinds";
import menuSub from "../elements/menuSub";
import ItemMediaGate from "../media/ItemMediaGate";
export default {

  components: { LocusFinds, LocusForm, menuSub, ItemMediaGate },

data() {
    return {};
  },
  computed: {  
    showSubMenu() {
      return true;
    }
  },

  methods: {}
};


</script>
