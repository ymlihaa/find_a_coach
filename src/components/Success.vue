<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline d-flex">
          Mesajınız İletildi.
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
  props: ["isOk"],
  data() {
    return {
      dialog: this.isOk,
    };
  },

  methods: {
    handleOk() {
      this.dialog = false;
      this.$store.commit("isRequest");
      router.push("/");
    },
  },
  created() {
    console.log("Success", this.isOk);
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