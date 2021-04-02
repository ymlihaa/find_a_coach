<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <v-text-field
            class="input-group--focused w-50"
            v-model="lastName"
            label="Your E-mail"
            required
          ></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-textarea v-model="description" color="teal" class="w-50">
                <template v-slot:label>
                  <div>Your Message</div>
                </template>
              </v-textarea>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="handleCancel">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="sendRequest"> Send </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { db } from "../firebase";
import router from "../router/index";

export default {
  props: ["uid"],
  data() {
    return {
      dialog: this.$store.state.isRequest,
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