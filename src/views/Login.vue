<template>
  <div>
    <form @submit.prevent="handleLogin">
      <input type="email" v-model="email" placeholder="email" />
      <input type="password" v-model="password" placeholder="password" />
      <button>Login</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import router from "../router/index";
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$store.commit("updateLoginAndRegister", {
            uid: user.uid,
            isActive: true,
          });
          router.push("/");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style scoped></style>
