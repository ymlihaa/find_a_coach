<template>
  <div>
    <el-page-header @back="goBack" title="Back"> </el-page-header>

    <el-container>
      <el-header>
        <h1>{{ userDetail[0].firstName }} {{ userDetail[0].lastName }}</h1>
      </el-header>
      <el-main>
        <el-card>
          <el-row>
            <el-col> <h1>Description</h1></el-col>
          </el-row>
          <el-divider></el-divider>
          <el-row>
            <el-col>{{ userDetail[0].description }}</el-col>
          </el-row>
        </el-card>

        <el-card>
          <el-row :gutter="20" class="tag-row">
            <el-col>
              <el-tag v-for="(tag, index) in userDetail[0].tags" :key="index">
                {{ tag }}
              </el-tag>
              <el-tag type="danger"
                >{{ userDetail[0].hourlyRate }} tl/hour</el-tag
              >
            </el-col>
          </el-row>
          <el-row type="flex" align="center" justify="center">
            <el-button v-if="condition()" type="primary" @click="handleRequest"
              >Request</el-button
            >
          </el-row>
        </el-card>
      </el-main>
      <request-form
        v-if="this.$store.state.isRequest == true"
        :uid="id"
      ></request-form>
    </el-container>
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
    goBack() {
      router.push("/");
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

.el-card {
  margin-bottom: 1rem;
  height: auto;
}

.el-tag {
  margin-left: 0.5rem;
}

.tag-row {
  margin-top: 1rem;
}
.el-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-main {
  width: 120vmin;
}
</style>