<template>
  
        <v-card>
          <v-img src="https://cdn.vuetifyjs.com/images/cards/desert.jpg" aspect-ratio="2.75"></v-img>
          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">{{ stone.tag }}</h3>
              <div>Description: {{ stone.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-btn flat :to="'/stones/' + this.stone.id">Show</v-btn>
            <v-btn flat color="orange">Explore</v-btn>
          </v-card-actions>
        </v-card>
     
</template>

<script>
export default {
  name: "stone-card",
  props: {
    stone: Object,
  },
  data() {
    return {
     
    };
  },
  computed: {
    stoneFormatted() {
      let stoneFormatted = {
                id: this.stone.id,
                tag: this.stone.find.locus.area.year + '.' +
                    this.stone.find.locus.area.area + '.' +
                    this.stone.find.locus.locus + ' Reg: ' +
                    this.stone.find.registration_category + ' Bskt: ' +
                    this.stone.find.basket_no + ' No: ' +
                    this.stone.find.item_no,
                description: this.stone.description
            }
    }
  },

  methods: {}
};
</script>