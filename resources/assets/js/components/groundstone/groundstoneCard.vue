<template> 
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ groundstone.tag }}</h3>
              <div>Description: {{ groundstone.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat :to="'/groundstones/' + this.groundstone.id">Show</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
     
</template>

<script>
export default {
  name: "groundstone-card",
  props: {
    groundstone: Object,
  },
  data() {
    return {
     
    };
  },
  computed: {
    groundstoneFormatted() {
      let groundstoneFormatted = {
                id: this.groundstone.id,
                tag: this.groundstone.find.locus.area.year + '.' +
                    this.groundstone.find.locus.area.area + '.' +
                    this.groundstone.find.locus.locus + ' Reg: ' +
                    this.groundstone.find.registration_category + ' Bskt: ' +
                    this.groundstone.find.basket_no + ' No: ' +
                    this.groundstone.find.item_no,
                description: this.groundstone.description
            }
    }
  },

  methods: {}
};
</script>