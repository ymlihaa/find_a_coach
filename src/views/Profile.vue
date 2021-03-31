<template>
  <div>{{ allMessages }}</div>
</template>

<script>
// import { db } from "../firebase";
import { db } from "../firebase";
const collectionPath = "users";

export default {
  data() {
    return {
      userDetail: [],
      allMessages: [],
    };
  },

  created() {
    console.log(this.$store.state.uid);
    this.$bind(
      "userDetail",
      db.collection(collectionPath).doc(this.$store.state.uid)
    );
    this.$bind("allMessages", db.collection(this.$store.state.uid)).then(() => {
      this.$store.state.msgCount = this.allMessages.length;
    });
  },
};
</script>

<style scoped></style>
