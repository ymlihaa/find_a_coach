<template>
  <el-container>
    <el-header>
      <el-row :gutter="20">
        <el-col :span="22">
          {{ userDetail.firstName }} {{ userDetail.lastName }}
        </el-col>
        <el-col :span="2">
          <el-button type="info" @click="editProfile">{{
            $t("btn_Edit")
          }}</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-divider></el-divider>

    <div class="content-wrapper">
      <el-main type="flex">
        <el-row :gutter="20">
          <el-col>
            <el-card>
              {{ userDetail.description }}
            </el-card>
            <el-card>
              <el-tag v-for="(tag, index) in userDetail.tags" :key="index">
                {{ tag }}</el-tag
              >
            </el-card>
          </el-col>
        </el-row>
      </el-main>
    </div>
  </el-container>
</template>

<script>
import { db } from "../firebase";
const collectionPath = "users";
import router from "../router/index";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      userDetail: [],
      allMessages: [],
      links: ["Home", "Profile", "Logout"],
    };
  },
  methods: {
    editProfile() {
      router.push({
        name: "EditProfile",
        params: {
          userDetail: this.userDetail,
        },
      });
    },
  },

  created() {
    this.$bind(
      "userDetail",
      db.collection(collectionPath).doc(firebase.auth().currentUser.uid)
    );
  },
};
</script>

<style scoped>
</style>
