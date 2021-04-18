<template>
  <el-container type="flex">
    <el-main align="center">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item :label="$t('label_FirstName')" prop="firstName">
          <el-input v-model="ruleForm.firstName" type="text"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label_LastName')" prop="lastName">
          <el-input type="text" v-model="ruleForm.lastName"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label_Description')" prop="description">
          <el-input type="textarea" v-model="ruleForm.description"></el-input>
        </el-form-item>
        <el-form-item :label="$t('label_HourlyRate')" prop="hourlyRate">
          <el-input type="text" v-model="ruleForm.hourlyRate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="ruleForm.tags">
            <el-checkbox label="frontend "></el-checkbox>
            <el-checkbox label="backend"></el-checkbox>
            <el-checkbox label="career"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave('ruleForm')">{{
            $t("btn_Save")
          }}</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>


 

<script>
import { db } from "../firebase";
import router from "../router/index";
import firebase from "firebase/app";
import "firebase/auth";
export default {
  data() {
    var localMessage = (param) => {
      return this.$i18n.messages[localStorage.getItem("lang") || "en"][param];
    };
    return {
      ruleForm: {
        firstName: "",
        lastName: "",
        description: "",
        hourlyRate: "",
        tags: [],
        val1: "",
        val2: "",
        val3: "",
      },
      rules: {
        firstName: [
          {
            required: true,
            message: localMessage("validate_FirstName"),
            trigger: "blur",
          },
        ],
        lastName: [
          {
            required: true,
            message: localMessage("validate_LastName"),
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: localMessage("validate_Description"),
            trigger: "blur",
          },
        ],
        hourlyRate: [
          {
            required: true,
            message: localMessage("validate_HourlyRate"),
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    handleSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          db.collection("users")
            .doc(firebase.auth().currentUser.uid)
            .set({
              firstName: this.ruleForm.firstName,
              lastName: this.ruleForm.lastName,
              description: this.ruleForm.description,
              hourlyRate: this.ruleForm.hourlyRate,
              tags: this.ruleForm.tags,
            })
            .then(() => {
              this.$notify({
                title: "Success",
                message: "Register successfully .",
                type: "success",
              });
              router.push("/");
            })
            .catch((err) => {
              this.$notify.error({
                title: "Error",
                message: err.message,
              });
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  updated() {
    console.log(this.tags);
  },
};
</script>

<style scoped>
.el-main {
  display: flex;
  align-items: center;
}
.el-form {
  width: 50vmin;
}
.el-button {
  width: 100%;
}
</style>
