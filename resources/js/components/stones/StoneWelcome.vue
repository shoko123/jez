<template>
  <LayoutWelcomeForm>
    <!--template v-slot:body>I am the body from the parent</template-->

    <template v-slot:itemButtons>
      <v-btn @click="limestone">material: Limestone</v-btn>
    </template>
  </LayoutWelcomeForm>
</template>


<script>
import LayoutWelcomeForm from "../layouts/LayoutWelcomeForm";
export default {
  components: {
    LayoutWelcomeForm
  },

  methods: {
    limestone() {
      this.$store.dispatch("aux/predefinedFilter", "limestone");
      this.$store.dispatch("aux/queryCollection",  {clear: false, spinner: true, gotoCollection: true})
    }
  }
};
</script>
