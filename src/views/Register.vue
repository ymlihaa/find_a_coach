<template >
  <el-container type="flex">
    <el-main>
      <el-form align="center" v-if="this.$store.state.isActive === true">
        <el-form-item label="E-mail" prop="email">
          <el-input type="email" v-model="formData.email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password">
          <el-input
            type="password"
            v-model="formData.confirmPassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="registerUser">Sing Up</el-button>
          <el-button type="danger" @click="reset">Reset</el-button>
        </el-form-item>
      </el-form>
    </el-main>
    <form-register v-if="this.$store.state.isActive === false"></form-register>
    <dialog-app
      v-if="this.$store.state.dialog"
      :dialogMessage="errorMessage"
    ></dialog-app>
  </el-container>
</template>




<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase";
import registerForm from "../components/registerForm";
import Dialog from "../components/Dialog";
export default {
  components: {
    "form-register": registerForm,
    "dialog-app": Dialog,
  },
  data() {
    return {
      errorMessage: "",

      formData: {
        email: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    async registerUser() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.formData.email.trim(),
          this.formData.password.trim()
        )
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);
          return db
            .collection("users")
            .doc(user.uid)
            .set({
              email: user.email,
            })
            .then(() => {
              this.$store.commit("updateLoginAndRegister", {
                uid: user.uid,
                isActive: true,
              });
              console.log("uid : ", this.$store.state.uid);
            });
        })
        .catch((error) => {
          this.errorMessage = error.message;
          this.$store.commit("isDialog", { isShow: true });
        });
    },
    reset() {
      this.formData.email = "";
      this.formData.password = "";
      this.formData.confirmPassword = "";
    },
  },
};
</script>

<style scoped>
.el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-form {
  width: 80vmin;
}
</style>
