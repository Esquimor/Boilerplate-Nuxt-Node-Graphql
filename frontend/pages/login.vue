<template>
  <form @submit.prevent="loger">
    <input
      v-model="email"
      type="text"
      placeholder="Email">
    <input
      v-model="password"
      type="text"
      placeholder="Password">
    <button type="submit">Login
    </button>
  </form>
</template>

<script>
import gql from "graphql-tag";

export default {
  data: () => {
    return {
      email: "",
      password: "",
      data: {}
    };
  },
  methods: {
    loger() {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($email: String, $password: String) {
              login(email: $email, password: $password)
            }
          `,
          variables: {
            email: this.email,
            password: this.password
          }
        })
        .then(data => {
          this.$apolloHelpers.onLogin(data.data.login);
          console.log("connected");
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
</style>
