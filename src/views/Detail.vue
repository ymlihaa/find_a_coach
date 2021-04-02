<template>
  <div class="detail-wrapper d-flex">
    <div
      v-if="this.$store.state.isRequest == false"
      class="main-container d-flex-col"
    >
      <v-avatar color="grey lighten-2" size="128"></v-avatar>
      <span class="title mt-1"
        >{{ userDetail[0].firstName }}
        {{ userDetail[0].lastName }}
      </span>
      <!-- 
      <section class="description mt-5 w-50">
        {{ userDetail[0].description }}
      </section> -->

      <!-- <v-sheet class="mt-1 w-50" min-height="20vh " rounded="lg">
        {{ userDetail[0].description }}
      </v-sheet> -->

      <v-card class="mt-1 w-100 card" elevation="1" outlined tile>
        <div>{{ userDetail[0].description }}</div>
      </v-card>

      <div class="d-flex">
        <div class="mt-1 d-flex">
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
      <span v-if="condition()" class="request w-50" @click="handleRequest"
        >request</span
      >
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
.w-100 {
  width: 100%;
}

.card {
  min-width: 70vh;
  overflow: auto;
  word-break: break-all;
  white-space: normal;
  height: 50vh;
  padding: 3rem;
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
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
  max-width: 720px;
  height: 70vh;
  margin-left: auto;
  margin-right: auto;
  margin-top: 5rem;
}

.main-container {
  padding: 2rem;
}
.request {
  float: right;
  padding: 1rem;
  border: 1px solid #cacaca;
  border-radius: 8px;
  margin: 1rem;
  background-color: #488fef;
  color: white;
  cursor: pointer;
}
</style>