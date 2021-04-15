<template>
  <el-dialog
    title="Send a message ."
    :visible.sync="dialog"
    width="50%"
    :before-close="handleCancel"
  >
    <el-form :model="formData" :rules="rules" ref="formData">
      <el-form-item label="Your E-mail" prop="email">
        <el-input type="email" v-model="formData.email"></el-input>
      </el-form-item>
      <el-form-item label="Your Message" prop="description">
        <el-input type="textarea" v-model="formData.description"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="success" @click="sendRequest('formData')"
          >Send</el-button
        >
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { db } from "../firebase";
// import router from "../router/index";
// import Success from "../components/Success";

export default {
  components: {
    // "success-app": Success,
  },
  props: ["uid"],
  data() {
    return {
      dialog: this.$store.state.isRequest,
      formData: {
        email: "",
        description: "",
      },
      rules: {
        email: [
          {
            required: true,
            message: "Please enter your E-mail",
            trigger: "blur",
          },
        ],
        description: [
          {
            required: true,
            message: "Please enter your description .",
            trigger: "blur",
          },
        ],
      },
    };
  },
  methods: {
    sendRequest(formName) {
      const requestID = this.makeid(7);
      console.log(requestID);

      this.$refs[formName].validate((valid) => {
        if (valid) {
          db.collection(this.uid)
            .doc(requestID)
            .set({
              mail: this.formData.email,
              msg: this.formData.description,
            })
            .then(() => {
              console.log(this.uid);
              this.show = true;
              this.$notify({
                title: "Success",
                message: "Successfully",
                type: "success",
              });
              this.$store.commit("isRequest");
            })
            .catch((err) => {
              this.$notify.error({
                title: "Error",
                message: err.message,
              });
            });
        } else {
          return false;
        }
      });
    },
    handleCancel() {
      this.$store.commit("isRequest");
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style  scoped>
.buttons {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>