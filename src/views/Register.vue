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
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log("errorCode : ", errorCode);
          console.log("errorMessage: ", errorMessage);
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
.w-100 {
  width: 100%;
}
.w-50 {
  width: 50%;
}

.h-100 {
  height: 100vh;
}

.mt-10 {
  margin-top: 10rem;
}
.mt-3 {
  margin-top: 3rem;
}

.form {
  min-height: 70vh;
}
.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.d-flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
