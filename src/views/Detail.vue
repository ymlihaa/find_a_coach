<template>
  <div></div>
</template>

<script>
import { db } from "../firebase";

export default {
  props: ["uid"],
  data() {
    return {
      userDetail: [],
    };
  },
  mounted() {
    db.collection("users")
      .doc(this.uid)
      .get()
      .then((snapShot) => {
        this.userDetail.push(snapShot.data());
      });
  },
};
</script>

<style scoped>
</style>