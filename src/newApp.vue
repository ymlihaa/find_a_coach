<template>
  <v-app id="inspire">
    <v-app-bar app color="blue" flat>
      <v-container class="py-0 fill-height">
        <img src="./assets/login_logo.svg" alt="" />
        <h2 class="logo-title">Find a Coach</h2>
        <v-spacer></v-spacer>

        <!-- <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive> -->
        <v-avatar
          v-if="this.$store.state.isActive"
          class="mr-10"
          color="grey darken-1"
          size="32"
        ></v-avatar>

        <v-btn class="r-link" text color="white">
          <img class="header-icon" src="./assets/home.svg" alt="" />
          <router-link to="/">Home</router-link>
        </v-btn>

        <v-btn
          class="r-link"
          text
          color="white"
          v-if="!this.$store.state.isActive"
        >
          <img class="header-icon" src="./assets/login.svg" alt="" />

          <router-link to="/login">Log In</router-link>
        </v-btn>

        <v-btn
          class="r-link"
          text
          color="white"
          v-if="!this.$store.state.isActive"
        >
          <router-link to="/register">Sign Up</router-link>
        </v-btn>

        <v-btn
          class="r-link"
          text
          color="white"
          v-if="this.$store.state.isActive"
        >
          <img class="header-icon" src="./assets/profile.svg" alt="" />

          <router-link to="/profile">Profile</router-link>
        </v-btn>

        <v-tab v-if="this.$store.state.isActive !== false">
          <img class="header-icon" src="./assets/messages.svg" alt="" />

          <v-badge color="green" :content="this.$store.state.msgCount">
            <router-link to="/messages">Messages</router-link>
          </v-badge>
        </v-tab>

        <v-btn
          @click="handleLogout"
          color="white"
          text
          rounded
          class="my-2"
          v-if="this.$store.state.isActive"
        >
          <!-- <router-link to="/">
        </router-link> -->
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
            <!-- <v-sheet class="p-3" min-height="70vh" rounded="lg"> -->
            <transition name="fade"> <router-view /> </transition>>
            <!-- </v-sheet> -->
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
      router.push("/");
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