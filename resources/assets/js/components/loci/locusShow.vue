<template>
<v-form>
    <v-container fluid class="ma-0 pa-0">
      
      <!--<h4>{{locus.square}}</h4>-->

      
      <v-layout row wrap>

        <v-flex xs12 sm2>
          <v-text-field
            v-model="locus.square"
            label="square"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            v-model="date_opened_formatted"
            label="date opened"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            v-model="locus.date_closed"
            label="date closed"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            v-model="locus.level_opened"
            label="level opened"
            box
          ></v-text-field>
        </v-flex>

        <v-flex xs12 sm2>
          <v-text-field
            v-model="locus.level_closed"
            label="level closed"
            box
          ></v-text-field>

        </v-flex>

      </v-layout>


      <v-layout row wrap>

        <v-flex xs12 sm4>
          <v-textarea
            v-model="locus.description"
            label="description"
            box
          ></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea
            v-model="locus.deposit"
            label="deposit"
            box
          ></v-textarea>
        </v-flex>

        <v-flex xs12 sm4>
          <v-textarea
            v-model="locus.registration_notes"
            label="registration notes"
            box
          ></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
</v-form>

</template>

<script>
    export default {
        name: 'locus-show',
        created() {
            if (this.loci.length) {
                this.locus = this.loci.find((locus) => locus.id == this.$route.params.id);
            } else {
                alert('need locus');
                axios.get(`/api/loci/${this.$route.params.id}`)
                    .then((response) => {
                        this.locus = response.data.locus;
                    });
            }


        },
        data() {
            return {
                locus: null,
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
                first: 'John',
                last: 'Doe',

            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            loci() {
                return this.$store.getters.loci;
            },
            date_opened_formatted() {
                return (this.loci.length) ? new Date(this.locus.date_opened).toISOString().substring(0, 10): '';
            },
            date_closed_formatted() {
                return (this.loci.length) ? new Date(this.locus.date_closed).toISOString().substring(0, 10) : '';
            },
        }
    }
</script>


