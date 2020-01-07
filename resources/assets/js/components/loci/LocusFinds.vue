<template>
  <v-container fluid class="pa-0 ma-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Finds {{formattedNoOfFinds}}</v-card-title>
      <v-card-text>
        <template v-if="finds">
          <v-container fluid>
            <v-row>
              <v-col v-for="find in finds" :key="find.id" class="d-flex child-flex" cols="2">
                <v-hover>
                  <template v-slot:default="{ hover }">
                    <v-card class="mx-auto" max-width="350">
                      <template v-if="find.srcThumbnail">
                        <v-img
                          :src="find.srcThumbnail"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="330"
                        ></v-img>
                      </template>
                      <template v-else>
                        <v-img
                          :src="`${srcFiller}`"
                          aspect-ratio="1"
                          class="grey lighten-2"
                          max-width="330"
                        ></v-img>
                      </template>
                      <v-fade-transition>
                        <v-overlay v-if="hover" absolute color="#036358">
                          <h4>{{ find.tag }}</h4>

                          <h5>Description: {{ find.description }}</h5>
                          <v-btn @click="goTo(find)">Visit</v-btn>
                          <!--v-btn @click="editImage(image)">Edit</v-btn-->
                        </v-overlay>
                      </v-fade-transition>
                    </v-card>
                  </template>
                </v-hover>
              </v-col>
            </v-row>
          </v-container>
        </template>
        <template v-else>
          <h1>NO FINDS</h1>
        </template>
      </v-card-text>
    </v-card>
  </v-container>
</template>


<script>
export default {
  created() {
    console.log("LocusFinds.created()");
  },

  data() {
    return {};
  },
  computed: {
    locus() {
      return this.$store.getters["loc/item"];
    },

    finds() {
      if (!this.locus) {
        return null;
      }

      function makeFindTag(x) {
        let tag = `${x.registration_category}.`;
        let addBasket =
          x.findable_type === "Pottery" || x.registration_category === "GS";
        let addItem =
          x.registration_category === "AR" ||
          x.registration_category === "LB" ||
          x.registration_category === "FL" ||
          x.registration_category === "GS";
        tag += addBasket ? `${x.basket_no}` : ``;
        tag += addBasket && addItem ? `.` : ``;
        tag += addItem ? `${x.item_no}` : ``;
        return tag;
      }
      return this.locus.finds.map(x => {
        return {
          tag: `${x.findable_type} (${makeFindTag(x)})`,
          description: x.description,
          id: x.id,
          findable_type: x.findable_type,
          findable_id: x.findable_id,
          srcThumbnail: x.srcThumbnail
        };
      });
    },
    formattedNoOfFinds() {
      if (!this.locus) {
        return "";
      }
      return ` (${this.locus.finds.length})`;
    },
    srcFiller() {
      return this.$store.getters["med/srcThumbnailFiller"];
    }
  },
  methods: {
    goTo(find) {
      let path = null;

      console.log("goto find: " + JSON.stringify(find, null, 2));
      switch (find.findable_type) {
        case "Stone":
          path = `/finds/stones/${find.findable_id}/show`;
          break;
        case "Pottery":
          path = `/finds/pottery/${find.findable_id}/show`;
          break
        default:
          alert("Not implemented yet");
          return;
      }
      this.$router.push({ path: `${path}` });
      
      
      
      if (find.findable_type == "Stone") {
        let path = `/finds/stones/${find.findable_id}/show`;
        this.$router.push({ path: `${path}` });
      }
    }
  }
};
</script>



