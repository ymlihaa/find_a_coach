<template>
  <el-main>
    <el-form align="center" :model="formData" ref="formData" :rules="rules">
      <el-form-item :label="$t('label_FirstName')" prop="firstName">
        <el-input v-model="formData.firstName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('label_LastName')" prop="lastName">
        <el-input v-model="formData.lastName"></el-input>
      </el-form-item>
      <el-form-item :label="$t('label_Description')" prop="description">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item :label="$t('label_HourlyRate')" prop="hourlyRate">
        <el-input v-model="formData.hourlyRate"></el-input>
      </el-form-item>
      <el-form-item :label="$t('label_Tags')">
        <el-checkbox-group v-model="formData.tags">
          <el-checkbox label="frontend"></el-checkbox>
          <el-checkbox label="backend"></el-checkbox>
          <el-checkbox label="career"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-button type="primary" @click="handleSave('formData')">{{
        $t("btn_Save")
      }}</el-button>
    </el-form>
  </el-main>
</template>

<script>
import { db } from "../firebase";
import router from "../router/index";
// import Success from "../components/Success";

export default {
  props: ["userDetail"],
  components: {
    // "success-app": Success,
  },
  data() {
    var localMessage = (param) => {
      return this.$i18n.messages[localStorage.getItem("lang") || "en"][param];
    };
    return {
      formData: {
        hourlyRate: this.userDetail.hourlyRate,
        tags: this.userDetail.tags,
        firstName: this.userDetail.firstName,
        lastName: this.userDetail.lastName,
        description: this.userDetail.description,
        show: false,
      },
      rules: {
        hourlyRate: [
          {
            required: true,
            message: localMessage("validate_HourlyRate"),
            trigger: "blur",
          },
        ],
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
      },
    };
  },
  methods: {
    handleSave(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          db.collection("users")
            .doc(this.$store.state.uid)
            .set({
              firstName: this.formData.firstName,
              lastName: this.formData.lastName,
              description: this.formData.description,
              hourlyRate: this.formData.hourlyRate,
              tags: this.formData.tags,
            })
            .then(() => {
              this.$notify({
                title: "Success",
                message: "Edited successfully .",
                type: "success",
              });
              router.push("/profile");
              this.show = true;
            })
            .catch((error) => {
              this.$store.commit("isDialog", { isShow: true });
              this.errorMessage = error.message;
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  created() {
    console.log("userDetail :", this.userDetail);
  },
};
</script>

<style scoped>
.el-main {
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-form {
  width: 80vmin;
}
.el-form > .el-button {
  width: 100%;
}
</style>
