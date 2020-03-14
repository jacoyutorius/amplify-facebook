<template>
  <div class="tile is-ancestor">
    <div class="tile is-parent">
      <article class="tile is-child box">
        <div class="content">
          <button @click="signin" v-if="!isAuthenticated" class="button">
            SignIn with Facebook
          </button>
          <button @click="signout" v-if="isAuthenticated" class="button">
            SignOut
          </button>
          <button @click="hello" v-if="isAuthenticated" class="button">
            Hello
          </button>

          <div v-if="isAuthenticated">
            you signined with
            <strong>{{ userEmail }}</strong
            >.
          </div>

          <article v-if="hasIpData" class="message is-primary">
            <div class="message-body">
              <div>{{ ip.message }} {{ ip.location }}</div>
            </div>
          </article>
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import Amplify, { Auth, Hub, API, graphqlOperation, Logger } from "aws-amplify";
import * as queries from "../graphql/queries";

Amplify.Logger.LOG_LEVEL = "INFO";
const logger = new Logger("AmplifyFacebook");

export default {
  name: "auth",

  async mounted() {
    Hub.listen("auth", async ({ payload: { event, data, message } }) => {
      logger.info(event, data, message);
      let user = null;
      switch (event) {
        case "signIn":
          user = await this.getCurrentAuthenticatedUser();
          this.$store.commit("setUser", { user });
          break;
        case "signOut":
          this.$store.commit("removeUser");
          break;
      }
    });

    const user = await this.getCurrentAuthenticatedUser();
    this.$store.commit("setUser", { user });
  },

  data() {
    return {
      ip: {}
    };
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
      // return this.$store.state.user.username;
    },
    hasIpData() {
      return 0 !== Object.keys(this.ip).length;
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
        .catch(err => logger.warn(err));
    },
    async getCurrentAuthenticatedUser() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        return user;
      } catch (error) {
        logger.warn(error);
        return null;
      }
    },
    async hello() {
      const params = graphqlOperation(queries.helloWorld);
      params["authMode"] = "AMAZON_COGNITO_USER_POOLS";

      const ret = await API.graphql(params).catch(e => {
        logger.error(e);
        return;
      });

      if (ret) {
        const helloWorld = ret.data.helloWorld;
        this.ip = JSON.parse(helloWorld.body);
      }
    }
  }
};
</script>
