<template>
  <el-main>
    <el-form align="center">
      <el-form-item label="First Name">
        <el-input v-model="firstName"></el-input>
      </el-form-item>
      <el-form-item label="Last Name">
        <el-input v-model="lastName"></el-input>
      </el-form-item>
      <el-form-item label="Description">
        <el-input type="textarea" v-model="description"></el-input>
      </el-form-item>
      <el-form-item label="Hourly Rate">
        <el-input v-model="hourlyRate"></el-input>
      </el-form-item>
      <el-form-item label="Tags">
        <el-checkbox-group v-model="tags">
          <el-checkbox label="frontend"></el-checkbox>
          <el-checkbox label="backend"></el-checkbox>
          <el-checkbox label="career"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-button type="primary" @click="handleSave">Complete</el-button>
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
    return {
      hourlyRate: this.userDetail.hourlyRate,
      tags: this.userDetail.tags,
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      description: this.userDetail.description,
      show: false,
    };
  },
  methods: {
    handleSave() {
      db.collection("users")
        .doc(this.$store.state.uid)
        .set({
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          hourlyRate: this.hourlyRate,
          tags: this.tags,
          errorMessage: "",
        })
        .then(() => {
          console.log("successful");
          router.push("/profile");
          this.show = true;
        })
        .catch((error) => {
          this.$store.commit("isDialog", { isShow: true });
          this.errorMessage = error.message;
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
