<template>
  <el-dialog
    title="Send a message ."
    :visible.sync="dialog"
    width="50%"
    :before-close="handleCancel"
  >
    <el-form>
      <el-form-item label="Your E-mail">
        <el-input type="email" v-model="email"></el-input>
      </el-form-item>
      <el-form-item label="Your Message">
        <el-input type="textarea" v-model="description"></el-input>
      </el-form-item>
      <el-form-item class="buttons">
        <el-button type="success" @click="sendRequest">Send</el-button>
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
      email: "",
      description: "",
    };
  },
  methods: {
    sendRequest() {
      const requestID = this.makeid(7);
      console.log(requestID);

      db.collection(this.uid)
        .doc(requestID)
        .set({
          mail: this.email,
          msg: this.description,
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