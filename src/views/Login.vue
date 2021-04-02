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

      <template>
        <div class="text-center">
          <v-dialog v-model="dialog" width="500">
            <v-card>
              <v-card-title class="headline grey lighten-2">
                Warning
              </v-card-title>

              <v-card-text>
                {{ errorMessage }}
              </v-card-text>

              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog = false">
                  I accept
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </template>
    </div></transition
  >
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
      errorMessage: "",
      dialog: false,
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
          this.errorMessage = error.message;
          this.dialog = true;
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
