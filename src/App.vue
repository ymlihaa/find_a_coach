
<template>
  <transition name="fade">
    <v-app>
      <v-footer color="primary lighten-1" padless>
        <v-row justify="justify" no-gutters>
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

          <v-tab v-if="this.$store.state.isActive !== false">
            <v-badge color="green" :content="this.$store.state.msgCount">
              Request
            </v-badge>
          </v-tab>

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

          <v-btn
            v-if="this.$store.state.isActive !== true"
            color="white"
            text
            rounded
            class="my-2"
          >
            <router-link to="/register">
              <v-btn color="white" text rounded class="my-2">
                Sign Up
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
  </transition>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.commit("updateLogout");
      this.$store.state.msgCount = 0;
    },
  },
};
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>