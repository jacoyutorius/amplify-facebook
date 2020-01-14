<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <AuthPage></AuthPage>
  </div>
</template>

<script>
import AuthPage from "@/components/Auth.vue";
import { Auth } from "aws-amplify";

export default {
  name: "home",
  components: {
    AuthPage
  }
};
</script>
