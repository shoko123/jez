<template>
    <v-layout>
        <v-flex xs12 sm6 offset-sm3>
            <v-card>
                <v-container grid-list-sm fluid>
                    <v-layout row wrap>
                        <h1>Undefined Route</h1>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn
                                class="primary"
                                @click.native="backToMain"
                            >Back
                            </v-btn>
                            </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    methods: {
        backToMain() {
                this.$router.push('/');
        }
    }
}
</script>
