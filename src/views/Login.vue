<template >
  <div class="w-100 d-flex">
    <v-form
      class="w-50 d-flex-col mt-10"
      ref="form"
      v-model="valid"
      lazy-validation
      outlined
      @submit.prevent="handleLogin"
    >
      <v-text-field
        class="w-50"
        v-model="email"
        :counter="10"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        class="input-group--focused w-50"
        v-model="password"
        :type="show3 ? 'text' : 'password'"
        label="Password"
        required
      ></v-text-field>

      <div class="d-flex">
        <v-btn color="success" class="mr-4" @click="handleLogin"> Login </v-btn>

        <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
      </div>
    </v-form>
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
          const uid = user.user.uid;
          this.$store.commit("updateLoginAndRegister", {
            uid: uid,
            isActive: true,
          });
          router.push("/profile");
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
  align-items: center;
  justify-content: center;
}
</style>
