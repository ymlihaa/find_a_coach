<template >
  <el-container>
    <el-main>
      <el-row>
        <el-col class="img-container">
          <img src="../assets/login_logo.svg" alt=""
        /></el-col>

        <el-col class="form-container"
          ><el-form
            v-if="this.$store.state.dialog == false"
            align="center"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
          >
            <el-form-item :label="$t('label_Email')" prop="email">
              <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item :label="$t('label_Password')" prop="password">
              <el-input
                type="password"
                v-model="ruleForm.password"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="handleLogin('ruleForm')">{{
                $t("btn_Login")
              }}</el-button>
              <el-button type="danger" @click="reset">{{
                $t("btn_Reset")
              }}</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <dialog-app
          v-if="this.$store.state.dialog == true"
          :dialogMessage="errorMessage"
        ></dialog-app>
      </el-row>
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
    var localMessage = (param) => {
      return this.$i18n.messages[localStorage.getItem("lang") || "en"][param];
    };

    return {
      ruleForm: {
        email: "",
        password: "",
        errorMessage: "",
        showDialog: this.$store.state.dialog,
      },

      rules: {
        email: [
          {
            required: true,
            message: localMessage("validate_Email"),
            trigger: "blur",
          },
        ],
        password: [
          {
            required: true,
            message: localMessage("validate_Password"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleLogin(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              this.ruleForm.email,
              this.ruleForm.password
            )
            .then(() => {
              localStorage.setItem("TOKEN", true);
              this.$store.commit("changeStateAuth", {
                user: firebase.auth().currentUser,
              });
              this.$store.commit("changeNavState", { isShow: true });
              router.push("/messages");
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
      this.ruleForm.email = "";
      this.ruleForm.password = "";
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
  width: 50vmin;
}
.img-container,
.form-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

img {
  width: 400px;
  height: 400px;
}
</style>
