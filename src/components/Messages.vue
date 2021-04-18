<template>
  <el-container>
    <el-aside width="40vmin">
      {{ email }}
      <el-divider></el-divider>
    </el-aside>
    <el-main>
      <el-row v-for="(message, index) in allMessages" :key="index">
        <el-col>
          <el-card>
            <strong>
              {{ message.mail }}
            </strong>
            <el-divider></el-divider>
            <el-main>{{ message.msg }}</el-main>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import { db } from "../firebase";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data: () => ({
    allMessages: [],
    email: "",
  }),

  created() {
    console.log(this.$store.state.currentEmail);
    this.$bind(
      "allMessages",
      db.collection(firebase.auth().currentUser.uid)
    ).then(() => {
      this.$store.state.msgCount = this.allMessages.length;
    });
    console.log(this.allMessages);
    this.email = firebase.auth().currentUser.email;
  },
};
// firebase.auth().currentUser().email
</script>

<style scoped>
.el-card {
  margin: 0.5rem;
}
</style>