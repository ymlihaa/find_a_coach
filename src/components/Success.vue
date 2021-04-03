<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="350">
      <v-card>
        <v-card-title class="headline d-flex">
          {{ dialogMessage }}
        </v-card-title>

        <div class="d-flex">
          <img src="../assets/success.svg" alt="" />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="green darken-1" text @click="handleOk"> Tamam </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
// import router from "../router/index";

import router from "../router/index";
export default {
  props: ["isOk", "message"],
  data() {
    return {
      dialog: this.isOk,
      dialogMessage: "Mesajınız Başarıyla iletildi .",
    };
  },

  methods: {
    handleOk() {
      this.dialog = false;
      console.log("success app current path : ", router.currentRoute.path);
      if (router.currentRoute.path == "/editProfile") {
        router.push("/profile");
      } else {
        this.$store.commit("isRequest");
        router.push("/");
      }
    },
  },
  created() {
    console.log("Success", this.isOk);
    if (this.message.length > 0) this.dialogMessage = this.message;
  },
};
</script>

<style>
.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>