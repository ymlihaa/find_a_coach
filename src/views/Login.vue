<template >
  <el-container>
    <el-main>
      <el-form v-if="this.$store.state.dialog == false" align="center">
        <el-form-item label="E-mail" prop="email">
          <el-input v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            type="password"
            v-model="password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleLogin">Log In</el-button>
          <el-button type="danger" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
      <dialog-app
        v-if="this.$store.state.dialog == true"
        :dialogMessage="errorMessage"
      ></dialog-app>
    </el-main>
  </el-container>
</template>




<script>
import firebase from "firebase/app";
import "firebase/auth";
import router from "../router/index";
import Dialog from "../components/Dialog";
export default {
  components: {
    "dialog-app": Dialog,
  },
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      showDialog: this.$store.state.dialog,
    };
  },
  methods: {
    handleLogin() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log(user.user.email);
          const uid = user.user.uid;
          const email = user.user.email;
          this.$store.commit("updateLoginAndRegister", {
            uid: uid,
            isActive: true,
            mail: email,
          });
          router.push("/messages");
        })
        .catch((error) => {
          this.$store.commit("isDialog", { isShow: true });
          this.errorMessage = error.message;
        });
    },
    reset() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  width: 80vmin;
}
</style>
