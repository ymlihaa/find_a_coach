<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
      <router-link to="/register">Register</router-link>
    </div>
    <router-view />
    {{ firebaseData }}
  </div>
</template>

<script>
import { db } from "./firebase";

const documentPath = "users/LWjEMJS9GJlb1Gh3ULas";

export default {
  data() {
    return {
      firebaseData: null,
    };
  },
  firestore() {
    return {
      firebaseData: db.doc(documentPath),
    };
  },
};
</script>

<style>
</style>
