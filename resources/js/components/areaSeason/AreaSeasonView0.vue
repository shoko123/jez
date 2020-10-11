<template>
  <v-container fluid class="mt-1 pa-1 ma-0">
    <v-row no-gutters>
      <v-col lg="10" offset="1">
        <slot name="e1"></slot>
        <LayoutFormOptionalImage>
          <template v-slot:e1>
            <AreaSeasonForm
              :options="{ showTags: true, showImage: true }"
            ></AreaSeasonForm>
          </template>
        </LayoutFormOptionalImage>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AreaSeasonForm from "./AreaSeasonForm";
import LayoutFormOptionalImage from "../layouts/LayoutFormOptionalImage";

export default {
  components: {
    LayoutFormOptionalImage,
    AreaSeasonForm,
  },
};
</script>