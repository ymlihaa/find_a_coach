<template>
  <div>
    <div
      v-if="this.$store.state.isActive === false"
      class="register-first-step"
    >
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
    <div
      class="register-second-step"
      v-if="this.$store.state.isActive === true"
    >
      <form-register> </form-register>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { db } from "../firebase";
import registerForm from "../components/registerForm";
export default {
  components: {
    "form-register": registerForm,
  },
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
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("errorCode : ", errorCode);
          console.log("errorMessage: ", errorMessage);
        });
    },
  },
};
</script>

<style scoped></style>
