<template>
  <v-container fluid class="pa-0 ma-0">
    <v-card class="elevation-12">
      <v-card-title class="grey py-0 mb-4">Locus Finds</v-card-title>
        <v-card-text>
          <template v-if="finds">
          <v-container fluid>
          <v-row wrap>
            <v-col
              v-for="find in finds" :key="find.id"
              class="d-flex child-flex"
              cols="2"
            >
              <v-card>

              <template v-if="find.imagePath"> 
                <v-img :src="find.imagePath" aspect-ratio="2.75"></v-img>
                </template> 
                <template v-else> 
                  <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
                  </template> 
              

                <v-card-title primary-title>
                  <div>
                    <h3 class="headline mb-0">{{ find.tag }}</h3>
                    <div>Description: {{ find.description }}</div>
                  </div>
                </v-card-title>

                <v-card-actions>
                  <v-btn @click="goTo(find)" color="primary" text>show</v-btn>
                </v-card-actions>  
              </v-card>
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
      if(!this.locus) {
        return null;
      }

      function makeFindTag(x) {
                let tag = `${x.registration_category}.`;
                let addBasket = (x.findable_type === "PotteryBasket" || x.registration_category === "GS");
                let addItem = (x.registration_category === "AR" || x.registration_category === "LB" || x.registration_category === "FL" || x.registration_category === "GS");
                tag += addBasket ? `${x.basket_no}` : ``;
                tag += (addBasket && addItem) ? `.` : ``;
                tag += addItem ? `${x.item_no}` : ``;
                return tag;
            };
      return this.locus.finds.map(x => {
              return {
                  tag: `${x.findable_type} (${makeFindTag(x)})`,
                  description: x.description,
                  id: x.id,
                  findable_type: x.findable_type,
                  findable_id: x.findable_id,
                  imagePath: x.imagePath,
              }
            })
    }
  },
   methods: {
    goTo(find) {
      console.log('goto find: ' + JSON.stringify(find, null, 2));      
      if(find.findable_type == "Stone") {
        let path = `/finds/stones/${find.findable_id}/show`;
        this.$router.push({ path: `${path}` });
      }
    },
  }
};
</script>



