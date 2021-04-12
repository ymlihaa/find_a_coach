<template>
  <el-container>
    <el-header type="flex">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">
          <router-link to="/">
            <el-button size="small">
              <img src="./assets/home.svg" alt="" /> Home
            </el-button>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2" v-if="this.$store.state.isActive">
          <router-link to="/profile">
            <el-button size="small">
              <img src="./assets/profile.svg" alt="" />Profile</el-button
            >
          </router-link>
        </el-menu-item>
        <el-menu-item index="3" v-if="!this.$store.state.isActive">
          <router-link to="/login">
            <el-button size="small">
              <img src="./assets/login.svg" alt="" />
              Login</el-button
            >
          </router-link>
        </el-menu-item>
        <el-menu-item index="4" v-if="!this.$store.state.isActive">
          <router-link to="/register">
            <el-button size="small">Sign Up</el-button>
          </router-link>
        </el-menu-item>
        <el-menu-item index="5" v-if="this.$store.state.isActive">
          <el-container>
            <el-badge :value="this.$store.state.msgCount">
              <router-link to="/messages">
                <el-button size="small">Messages</el-button>
              </router-link>
            </el-badge>
          </el-container></el-menu-item
        >
        <el-menu-item index="6" v-if="this.$store.state.isActive"
          ><el-button size="small" @click="handleLogout">
            <img
              id="logout-icon"
              class="header-icon"
              src="./assets/logout.svg"
              alt=""
            />
            Log Out</el-button
          ></el-menu-item
        >
      </el-menu>
    </el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
import router from "./router/index";
export default {
  name: "App",

  data() {
    return {
      activeIndex: "1",
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
};
</script>

<style >
img {
  width: 1rem;
}
.el-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>