<template >
  <el-container type="flex">
    <el-main>
      <el-row>
        <el-col class="img-container">
          <img src="../assets/login_logo.svg" alt="" />
        </el-col>
        <el-col class="form-container">
          <el-form
            align="center"
            v-if="this.$store.state.isActive === false"
            :model="formData"
            :rules="rules"
            ref="formData"
          >
            <el-form-item label="E-mail" prop="email">
              <el-input type="email" v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input type="password" v-model="formData.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password" prop="confirmPassword">
              <el-input
                type="password"
                v-model="formData.confirmPassword"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="registerUser('formData')"
                >Sing Up</el-button
              >
              <el-button type="danger" @click="reset">Reset</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </el-main>
    <form-register v-if="this.$store.state.isActive === true"></form-register>
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
      rules: {
        email: [
          {
            required: true,
            message: "Please enter your E-mail adress .",
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: "Please enter your password .",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          {
            required: true,
            message: "Please confirm your password .",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    async registerUser(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
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
              this.$notify({
                title: "Warning",
                message: error.message,
                type: "warning",
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
img {
  width: 400px;
  height: 400px;
}

.el-form {
  width: 50vmin;
}

.img-container,
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
