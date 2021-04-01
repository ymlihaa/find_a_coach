<template >
  <transition name="fade">
    <div class="w-100 d-flex-col">
      <v-form
        class="form w-50 d-flex-col"
        ref="form"
        v-model="valid"
        lazy-validation
        outlined
        @submit.prevent="handleLogin"
      >
        <img src="../assets/login_logo.svg" alt="" />

        <div class="w-50">
          <v-text-field
            class="w-100"
            v-model="email"
            :counter="10"
            :rules="emailRules"
            label="E-mail"
            required
          ></v-text-field>

          <v-text-field
            class="input-group--focused w-100"
            v-model="password"
            :type="show3 ? 'text' : 'password'"
            label="Password"
            required
          ></v-text-field>
          <div class="d-flex-col">
            <v-btn color="primary " class="w-100 mt-3" @click="handleLogin">
              Login
            </v-btn>
            <v-btn color="error" class="w-100 mt-3" @click="reset">
              Reset Form
            </v-btn>
          </div>
        </div>
      </v-form>
    </div>
  </transition>
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
      valid: true,
      show3: false,
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
        .catch((err) => console.log(err));
    },
    reset() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
img {
  width: 33%;
}

.w-100 {
  width: 100%;
}
.w-50 {
  width: 50%;
}
.form {
  min-height: 70vh;
}

.h-100 {
  height: 100vh;
}
.mt-3 {
  margin-top: 3rem;
}
.mt-10 {
  margin-top: auto;
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}

.d-flex-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
