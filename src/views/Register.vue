<template >
  <div>
    <div class="w-100 d-flex" v-if="this.$store.state.isActive === false">
      <v-form
        class="form w-50 d-flex-col mt-10"
        ref="form"
        lazy-validation
        outlined
        @submit.prevent="registerUser"
      >
        <img src="../assets/login_logo.svg" alt="" />
        <div class="w-50">
          <v-text-field
            class="w-100"
            v-model="formData.email"
            :counter="10"
            label="E-mail"
            required
          ></v-text-field>
          <v-text-field
            class="input-group--focused w-100"
            v-model="formData.password"
            :type="show3 ? 'text' : 'password'"
            label="Password"
            required
          ></v-text-field>
          <v-text-field
            class="input-group--focused w-100"
            v-model="formData.confirmPassword"
            :type="show4 ? 'text' : 'password'"
            label="Password"
            required
          ></v-text-field>
          <div class="d-flex-col">
            <v-btn color="primary" class="w-100 mt-3" @click="registerUser">
              Sing Up
            </v-btn>
            <v-btn color="error" class="w-100 mt-3" @click="reset">
              Reset Form
            </v-btn>
          </div>
        </div>
      </v-form>
    </div>

    <div
      class="register-second-step"
      v-if="this.$store.state.isActive === true"
    >
      <form-register> </form-register>
    </div>
    <dialog-app
      v-if="this.$store.state.dialog"
      :dialogMessage="errorMessage"
    ></dialog-app>
  </div>
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
      show3: false,
      show4: false,
      formData: {
        email: "",
        password: "",
        confirmPassword: "",
      },
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
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
img {
  width: 33%;
}

.mt-10 {
  margin-top: 10rem;
}

.form {
  min-height: 70vh;
}
</style>
