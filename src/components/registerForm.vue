<template>
  <el-container type="flex">
    <el-main align="center">
      <el-form>
        <el-form-item label="First Name">
          <el-input v-model="firstName" type="text"></el-input>
        </el-form-item>
        <el-form-item label="Last Name">
          <el-input type="text" v-model="lastName"></el-input>
        </el-form-item>
        <el-form-item label="Description">
          <el-input type="textarea" v-model="description"></el-input>
        </el-form-item>
        <el-form-item label="Hourly Rate">
          <el-input type="text" v-model="hourlyRate"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox-group v-model="tags">
            <el-checkbox label="frontend "></el-checkbox>
            <el-checkbox label="backend"></el-checkbox>
            <el-checkbox label="career"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSave">Save</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>


 

<script>
import { db } from "../firebase";
import router from "../router/index";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      hourlyRate: "",
      tags: [],
      val1: "",
      val2: "",
      val3: "",
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
        })
        .then(() => {
          console.log("successful");
          router.push("/");
        })
        .catch((err) => console.log(err.message));
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
