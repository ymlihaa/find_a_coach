<template>
  <div class="register-form">
    <form @submit.prevent="registerUser">
      <input
        type="email"
        v-model="formData.email"
        placeholder="Please enter the email"
      />
      <input
        type="password"
        v-model="formData.password"
        placeholder="Please enter the password"
      />
      <input
        type="password"
        v-model="formData.confirmPassword"
        placeholder="Confirm the password"
      />
      <button type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase";

export default {
  data() {
    return {
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

          return db.collection("users").doc(user.uid).set({
            email: user.email,
          });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("errorCode : ", errorCode);
          console.log("errorMessage: ", errorMessage);
        });
    },
  },
};
</script>

<style  scoped>
</style>