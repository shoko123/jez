<template>
  <div>
    <v-flex xs12 sm6 offset-sm3 class="grey lighten-4">
      <v-container style="position: relative;top: 13%;" class="text-xs-center">
        <v-card-title primary-title>
          <h4>Login</h4>
        </v-card-title>
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
      </v-container>
    </v-flex>
  </div>
</template>

<!--template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>Login form</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-tooltip bottom>
                <!--template v-slot:activator="{ on }">
                  <v-btn :href="source" icon large target="_blank" v-on="on">
                    <v-icon large>code</v-icon>
                  </v-btn>
                </template>
                <span>Source</span>
              </v-tooltip>
              <v-tooltip right>
                <template v-slot:activator="{ on }">
                  <v-btn
                    icon
                    large
                    href="https://codepen.io/johnjleider/pen/wyYVVj"
                    target="_blank"
                    v-on="on"
                  >
                    <v-icon large>mdi-codepen</v-icon>
                  </v-btn>
                </template>
                <span>Codepen</span-->
              </v-tooltip>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field prepend-icon="person" name="login" label="Login" type="text"></v-text-field>
                <v-text-field
                  id="password"
                  prepend-icon="lock"
                  name="password"
                  label="Password"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">Login</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template-->





<script>
//import { login } from "../../core/auth";
import { login, setAuthorization } from "../../general";

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
  methods: {
    authenticate() {
      this.$store.commit("isLoading", {
        value: true,
        message: "logging in...",
        progressColor: "green"
      });
      this.$store.dispatch("login");

      login(this.$data.form)
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
            setAuthorization(response.data.access_token);
            res(response.data);
          })
          .catch(err => {
            rej("Wrong email or password");
          });
      });
    }
  },
  computed: {
    authError() {
      return this.$store.getters.authError;
    }
  }
};
</script>

