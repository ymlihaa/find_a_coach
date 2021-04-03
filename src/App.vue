<template>
  <v-app id="inspire">
    <v-app-bar app color="blue" flat>
      <v-container class="py-0 fill-height">
        <img src="./assets/login_logo.svg" alt="" />
        <h2 class="logo-title">Find a Coach</h2>
        <v-spacer></v-spacer>

        <v-avatar
          v-if="this.$store.state.isActive"
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <router-link to="/">
          <v-btn class="r-link" text color="white">
            <img class="header-icon" src="./assets/home.svg" alt="" />
            home
          </v-btn>
        </router-link>
        <router-link to="/login">
          <v-btn
            class="r-link"
            text
            color="white"
            v-if="!this.$store.state.isActive"
          >
            <img class="header-icon" src="./assets/login.svg" alt="" />

            Log In
          </v-btn>
        </router-link>
        <router-link to="/register">
          <v-btn
            class="r-link"
            text
            color="white"
            v-if="!this.$store.state.isActive"
          >
            Sign Up
          </v-btn>
        </router-link>

        <router-link to="/profile">
          <v-btn
            class="r-link"
            text
            color="white"
            v-if="this.$store.state.isActive"
          >
            <img class="header-icon" src="./assets/profile.svg" alt="" />

            Profile
          </v-btn>
        </router-link>
        <router-link to="/messages">
          <v-tab v-if="this.$store.state.isActive !== false">
            <img class="header-icon" src="./assets/messages.svg" alt="" />

            <v-badge color="green" :content="this.$store.state.msgCount">
              Messages
            </v-badge>
          </v-tab>
        </router-link>

        <v-btn
          @click="handleLogout"
          color="white"
          text
          rounded
          class="my-2"
          v-if="this.$store.state.isActive"
        >
          Logout
          <img
            id="logout-icon"
            class="header-icon"
            src="./assets/logout.svg"
            alt=""
          />
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <transition name="fade"> <router-view /> </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import router from "./router/index";
export default {
  name: "App",

  data() {
    return {
      links: ["/", "/login", "/register"],
    };
  },
  methods: {
    handleLogout() {
      this.$store.commit("updateLogout");
      this.$store.state.msgCount = 0;
      console.log("current Route : ", router.currentRoute.path);
      router.currentRoute.path === "/"
        ? window.location.reload()
        : router.push("/");
    },
  },
  computed: {
    checkRoute: function (value) {
      if (this.$store.state.isActive) {
        if (value == "/" || value == "/profile") {
          return true;
        }
      }
      return true;
    },
  },

  filters: {
    setRoute: function (value) {
      let route = value;
      switch (route) {
        case "/":
          route = "Home";
          break;
        case "/profile":
          route = "Profile";
          break;
        case "/register":
          route = "Sign Up";
          break;
        case "/login":
          route = "Login";
          break;
      }
      return route;
    },
  },
};
</script>

<style>
.header-icon {
  width: 1.4rem;
  margin-right: 0.4rem;
}
.logo-title {
  color: white;
}
img {
  width: 4rem;
  margin-left: auto;
  margin-right: auto;
}
.p-3 {
  padding: 3rem;
}

a {
  text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

#logout-icon {
  margin-left: 0.4rem;
}
</style>