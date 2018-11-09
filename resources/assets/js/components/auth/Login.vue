<template>
<div>
    <v-flex xs12 sm6 offset-sm3 class="grey lighten-4">
        <v-container style="position: relative;top: 13%;" class="text-xs-center">
          
            <v-card-title primary-title>
              <h4>Login</h4>
            </v-card-title>
            <v-form @submit.prevent="authenticate">
            <v-text-field prepend-icon="person" name="email" email="email" v-model="form.email"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="password" type="password" v-model="form.password"></v-text-field>
            <v-card-actions>
              <v-btn type="submit" primary large block>Login</v-btn>
            </v-card-actions>
            <v-alert v-if="authError"
                :value="true"
                type="error"
                >{{authError}}
            </v-alert>
            </v-form>    
        </v-container>
      </v-flex>
    </div>
</template>

<script>
import { login } from "../../core/auth";

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
      this.$store.dispatch("login");

      login(this.$data.form)
        .then(res => {
          this.$store.commit("loginSuccess", res);
          this.$router.push({ path: "/" });
        })
        .catch(error => {
          this.$store.commit("loginFailed", { error });
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

