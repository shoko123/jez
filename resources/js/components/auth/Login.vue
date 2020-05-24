<template>
  <v-img id="jez-login" dark :src="imageUrl" :cover="true">
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
              <v-alert v-if="loginMessage" :value="true" type="error">{{loginMessage}}</v-alert>
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
        password: ""
      },
      loginError: null
    };
  },
  computed: {
    loginMessage() {
      return this.$store.getters["aut/loginMessage"];
    },
    imageUrl() {
      return `${this.$store.getters["med/storageUrl"]}/static/media/Winery.jpg`;
    }
  },
  methods: {
    authenticate() {
      this.$store
        .dispatch("aut/jezLogin", this.form)
        .then(res => {
          //console.log("login.after login res: " + JSON.stringify(res, null, 2));
          this.$router.push({ path: "/" });
        })
        .catch(err => {
          this.loginError = "Wrong email or password";
          console.log("Login.catch err: " + err);
        });
    }
  }
};
</script>
<style scoped>
#jez-login {
  height: 90vh;
}
</style>

