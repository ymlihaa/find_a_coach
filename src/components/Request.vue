<template>
  <div class="detail-wrapper">
    <span class="cancel float-l d-flex" @click="handleCancel">X</span>
    <div class="main-container">
      <v-text-field
        class="w-100"
        v-model="email"
        :counter="10"
        label="Your E-mail"
        required
      ></v-text-field>
      <v-textarea v-model="description" color="teal" class="w-100">
        <template v-slot:label>
          <div>Description <small>(optional)</small></div>
        </template>
      </v-textarea>
      <div class="d-flex-col">
        <span class="request" @click="sendRequest">Request</span>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
import router from "../router/index";

export default {
  props: ["uid"],
  data() {
    return {
      email: "",
      description: "",
    };
  },
  methods: {
    sendRequest() {
      const requestID = this.makeid(7);
      console.log(requestID);

      db.collection(this.uid)
        .doc(requestID)
        .set({
          mail: this.email,
          msg: this.description,
        })
        .then(() => {
          console.log(this.uid);
          alert("Mesajınız Gönderildi . ");
          this.$store.commit("isRequest");
          router.push("/");
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    handleCancel() {
      this.$store.commit("isRequest");
    },
    makeid(length) {
      let result = "";
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
  },
};
</script>

<style  scoped>
.w-100 {
  width: 100%;
}
.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.float-l {
  position: relative;
  float: right;
}

.d-flex-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mt-1 {
  margin-top: 1rem;
}

.mt-5 {
  margin-top: 5rem;
}

.detail-wrapper {
  padding: 3rem;
  max-width: 720px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
  border: 1px solid #cacaca;
  border-radius: 1rem;
  box-shadow: 0px 12px 12px #cacaca;
}

.main-container {
  padding: 2rem;
}
.request,
.cancel {
  padding: 1rem;
  border: 1px solid #cacaca;
  border-radius: 8px;
  margin: 1rem;
  background-color: #488fef;
  color: white;
  cursor: pointer;
}
.cancel {
  background-color: red;
  padding: 0.5rem;
  width: 3rem;
}
</style>