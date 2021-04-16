<template>
  <el-container>
    <el-header type="flex">
      <el-menu
        type="flex"
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item>
          <el-select
            v-model="lang"
            placeholder="lang"
            @change="handleLang"
            size="small"
          >
            <el-option value="en"> </el-option>
            <el-option value="de"> </el-option>
          </el-select>
        </el-menu-item>
        <el-menu-item class="main-title">Find a Coach </el-menu-item>
        <el-menu-item index="1">
          <router-link to="/">
            <el-button size="small">
              <img src="./assets/home.svg" alt="" /> {{ $t("nav_Home") }}
            </el-button>
          </router-link>
        </el-menu-item>
        <el-menu-item index="2" v-if="this.$store.state.isActive">
          <router-link to="/profile">
            <el-button size="small">
              <img src="./assets/profile.svg" alt="" />
              {{ $t("nav_Profile") }}</el-button
            >
          </router-link>
        </el-menu-item>
        <el-menu-item index="3" v-if="!this.$store.state.isActive">
          <router-link to="/login">
            <el-button size="small">
              <img src="./assets/login.svg" alt="" />
              {{ $t("nav_login") }}</el-button
            >
          </router-link>
        </el-menu-item>
        <el-menu-item index="4" v-if="!this.$store.state.isActive">
          <router-link to="/register">
            <el-button size="small"> {{ $t("nav_signUp") }}</el-button>
          </router-link>
        </el-menu-item>
        <el-menu-item index="5" v-if="this.$store.state.isActive">
          <el-container>
            <el-badge :value="this.$store.state.msgCount">
              <router-link to="/messages">
                <el-button size="small"> {{ $t("nav_message") }}</el-button>
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
      <transition
        mode="out-in"
        enter-active-class="animate__animated animate__fadeIn"
      >
        <router-view />
      </transition>
    </el-main>
  </el-container>
</template>

<script>
import router from "./router/index";
export default {
  name: "App",

  data() {
    return {
      lang: localStorage.getItem("lang") || "en",
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
    handleLang(event) {
      console.log(event);
      localStorage.setItem("lang", event);
      window.location.reload();
    },
  },
};
</script>

<style >
img {
  width: 1rem;
}
.el-menu {
  padding-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.el-main {
  margin: 1rem;
}

* {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
.main-title {
  position: relative;
  left: 0;
}

.el-select {
  width: 4rem;
}
</style>