
<template>
  <v-app>
    <v-footer color="primary lighten-1" padless>
      <v-row justify="center" no-gutters>
        <router-link to="/">
          <v-btn color="white" text rounded class="my-2"> Home </v-btn>
        </router-link>

        <v-btn
          v-if="this.$store.state.isActive !== true"
          color="white"
          text
          rounded
          class="my-2"
        >
          <router-link to="/login">
            <v-btn color="white" text rounded class="my-2">
              Login
            </v-btn></router-link
          >
        </v-btn>

        <v-btn
          v-if="this.$store.state.isActive !== false"
          color="white"
          text
          rounded
          class="my-2"
        >
          <router-link to="/profile">
            <v-btn color="white" text rounded class="my-2">
              Profile
            </v-btn></router-link
          >
        </v-btn>

        <v-btn color="white" text rounded class="my-2">
          <router-link to="/about">
            <v-btn color="white" text rounded class="my-2">
              About
            </v-btn></router-link
          >
        </v-btn>
        <v-btn
          v-if="this.$store.state.isActive !== true"
          color="white"
          text
          rounded
          class="my-2"
        >
          <router-link to="/register">
            <v-btn color="white" text rounded class="my-2">
              Register
            </v-btn></router-link
          >
        </v-btn>

        <v-btn
          v-if="this.$store.state.isActive !== false"
          color="white"
          text
          rounded
          class="my-2"
        >
          <router-link to="/login">
            <v-btn
              @click="handleLogout"
              color="white"
              text
              rounded
              class="my-2"
            >
              Logout
            </v-btn></router-link
          >
        </v-btn>
      </v-row>
    </v-footer>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  methods: {
    handleLogout() {
      this.$store.commit("updateLogout");
    },
  },
};
</script>
