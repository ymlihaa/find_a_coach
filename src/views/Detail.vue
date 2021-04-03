<template>
  <div class="detail-wrapper">
    <div v-if="this.$store.state.isRequest == false" class="d-flex-col">
      <div class="img-wrapper d-flex-col">
        <div>
          <v-avatar color="grey lighten-2" size="75"></v-avatar>
        </div>
        <span class="title mt-1"
          >{{ userDetail[0].firstName }}
          {{ userDetail[0].lastName }}
        </span>
        <hr />
      </div>

      <div class="p-2 card" elevation="1" tile>
        <strong>Description</strong>
        <hr class="mt-1" />
        <div class="mt-4 p-1">
          <div>{{ userDetail[0].description }}</div>
        </div>
        <hr class="mt-1" />
        <div class="d-flex">
          <strong>Tags:</strong>

          <v-card-actions
            v-for="(tag, index) in userDetail[0].tags"
            :key="index"
          >
            <v-btn outlined rounded text>
              {{ tag }}
            </v-btn>
          </v-card-actions>
        </div>
      </div>

      <div class="w-50 button-wrapper">
        <v-btn
          outlined
          large
          color="primary"
          v-if="condition()"
          class="request-btn w-100"
          @click="handleRequest"
          >request</v-btn
        >
      </div>
    </div>

    <request-form
      v-if="this.$store.state.isRequest == true"
      :uid="id"
    ></request-form>
  </div>
</template>

<script>
import { db } from "../firebase";
import Request from "../components/Request";
import router from "../router/index";
export default {
  props: ["uid", "senderId"],
  components: {
    "request-form": Request,
  },
  data() {
    return {
      id: this.uid ? this.uid : null,
      isRequest: false,
      userDetail: [],
    };
  },

  methods: {
    handleRequest() {
      console.log(this.uid);
      this.$store.commit("isRequest");
      console.log(this.isRequest);
    },
  },

  computed: {
    condition: function () {
      var vm = this;
      return function () {
        console.log("functions : ", vm.uid);
        console.log("fuıctin:", vm.senderId);
        if (vm.id !== undefined) {
          if (vm.id == vm.senderId) {
            return false;
          }
        }
        return true;
      };
    },
  },

  mounted() {
    if (this.uid) {
      db.collection("users")
        .doc(this.uid)
        .get()
        .then((snapShot) => {
          this.userDetail.push(snapShot.data());
        });
    } else {
      router.push("/");
    }
  },
};
</script>

<style scoped>
.img-wrapper {
  margin-top: 1rem;
  min-width: auto;
  overflow: auto;
  word-break: break-all;
  white-space: normal;
  background-color: white;
}

.card {
  margin-top: 2rem;
  padding: 1rem;
  min-width: 50vh;
  overflow: auto;
  word-break: break-all;
  white-space: normal;
  border: 1px solid #cacaca;
  border-radius: 0.3rem;
  background-color: white;
}

.detail-wrapper {
  max-width: 720px;
  min-height: 70vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 3rem;
  padding: 2rem;
  border: 1px solid #cacaca;
  border-radius: 0.5rem;
  box-shadow: 0px 5px 6px #cacaca;
  background-color: #fefefe;
}

.request-btn {
  margin-top: 6rem;
}

.h-100 {
  height: 100%;
}

.button-wrapper {
  position: relative;
}

.mt-4 {
  margin-top: 3rem;
  margin-bottom: 3rem;
}
</style>