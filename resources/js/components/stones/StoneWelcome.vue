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
      this.$store.dispatch("tag/clearFilterSelections");
      this.$store.dispatch("stones/predefinedFilters", "limestone");
      this.$store.dispatch("mgr/queryCollection").then(res => {
        this.$router.push({
          path: `${this.$store.getters["mgr/status"].moduleAppBaseUrl}/list`
        });
      });
    }
  }
};
</script>
