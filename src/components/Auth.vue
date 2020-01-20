<template>
  <div>
    <button @click="signin">SignIn with Facebook</button>
    <button @click="signout">SignOut</button>

    <div v-if="isAuthenticated">
      you signined with
      <strong>{{ userEmail }}</strong
      >.
    </div>
  </div>
</template>

<script lang="ts">
import Amplify, { Auth, Hub } from "aws-amplify";

export default {
  name: "auth",

  async created() {
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.$store.commit("setUser", { user });
      })
      .catch(error => {
        console.warn(error);
      });
  },

  computed: {
    isAuthenticated() {
      return this.$store.state.user !== null;
    },
    userEmail() {
      if (!this.isAuthenticated) {
        return "";
      }

      return this.$store.state.user.attributes.email;
    }
  },

  methods: {
    signin() {
      Auth.federatedSignIn({ provider: "Facebook" });
    },
    signout() {
      Auth.signOut()
        .then(data => {
          this.$store.commit("removeUser");
        })
        .catch(err => console.log(err));
    }
  }
};
</script>
