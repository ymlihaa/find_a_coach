<template>
  <div>
    <form @submit.prevent="handleSave">
      <input type="text" v-model="firstName" />
      <input type="text" v-model="lastName" />
      <input type="text-area" v-model="description" />
      <input type="text" v-model="hourlyRate" />
      <label><strong>Areas</strong></label>
      <hr />
      <input type="checkbox" value="Frontend" />
      <input type="checkbox" value="backend" />
      <input type="checkbox" value="Career" />
      <button>Register</button>
    </form>
  </div>
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
        })
        .then(() => {
          console.log("successful");
          router.push("/profile");
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style scoped></style>
