<template>
  <v-img id="jez-login" dark :src="fullUrl" :lazy-src="tnUrl" :cover=true>
    <v-container fill-height fluid>
      <v-row align="center" justify="center">
        <v-theme-provider light>
          <v-card min-width="600">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <v-form @submit.prevent="authenticate">
                <v-text-field prepend-icon="person" name="email" email="email" v-model="form.email"></v-text-field>
                <v-text-field
                  prepend-icon="lock"
                  name="password"
                  label="password"
                  type="password"
                  v-model="form.password"
                ></v-text-field>
                <v-card-actions>
                  <v-row justify="center">
                    <v-btn type="submit" primary>Login</v-btn>
                  </v-row>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-theme-provider>
      </v-row>
    </v-container>
  </v-img>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      loginError: null,
    };
  },
  computed: {
    imageUrls() {
      return this.$store.getters["med/appMedia"].backgroundUrls["App"];
    },
    fullUrl() {
      return this.imageUrls ? this.imageUrls.fullUrl : null;
    },
    tnUrl() {
      return this.imageUrls ? this.imageUrls.tnUrl : null;
    },
  },
  methods: {
    authenticate() {
      this.$store
        .dispatch("aut/login", this.form)
        .then((res) => {
          this.$router.push({ path: "/" });
        })
        .catch((err) => {});
    },
  },
};
</script>
<style scoped>
#jez-login {
  height: 90vh;
}
</style>

