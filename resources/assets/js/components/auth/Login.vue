<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs8>
        <v-card class="elevation-12">
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
                <v-layout justify-center>
                  <v-btn type="submit" primary>Login</v-btn>
                </v-layout>
              </v-card-actions>
              <v-alert v-if="authError" :value="true" type="error">{{authError}}</v-alert>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
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
      error: null
    };
  },
computed: {
  
  },
  methods: {
    authenticate() {
      this.$store.dispatch("aut/jezLogin", this.form)
            .then(res => {
              console.log('login.after login res: ' + JSON.stringify(res, null, 2));
              this.$router.push({ path: "/" });
            })
            .catch(err => {});
    }
    /*
    authenticate() {
      this.$store.commit("isLoading", {
        value: true,
        message: "logging in...",
        progressColor: "green"
      });

      this.$store.dispatch("login");

      this.login(this.$data.form)
        .then(res => {
          this.$store.commit("loginSuccess", res);
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.$store.commit("loginFailed", { error });
        });
    },
    
    login(credentials) {
      return new Promise((res, rej) => {
        axios
          .post("/api/auth/login", credentials)
          .then(response => {
            console.log('setAuth() token: ' + response.data.access_token)
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.access_token}`
            //setAuthorization(response.data.access_token);
            res(response.data);
          })
          .catch(err => {
            rej("Wrong email or password");
          });
      });
    }
    */
  },
  computed: {
    authError() {
      return this.$store.getters.authError;
    }
  }
};
</script>

