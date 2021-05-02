<template>
  <el-container type="flex">
    <el-header>
      <el-card>
        <el-checkbox-group v-model="filterTag">
          <el-checkbox label="frontend"> </el-checkbox>
          <el-checkbox label="backend"> </el-checkbox>
          <el-checkbox label="career"> </el-checkbox>
        </el-checkbox-group>
      </el-card>
    </el-header>

    <el-main v-show="this.$store.state.loading == false">
      <el-card v-for="item in allCoach" :key="item.id" class="item-box">
        <el-row :gutter="20">
          <el-col :span="20"> {{ item.firstName }} {{ item.lastName }} </el-col>
        </el-row>
        <el-row :gutter="5" class="el-description">
          <el-col> {{ item.description }} </el-col>
        </el-row>
        <el-row :gutter="5">
          <el-col :span="19" class="hourlyRate">
            <el-tag type="danger">{{ item.hourlyRate | addMoney }}</el-tag>
            <el-tag v-for="(tag, index) in item.tags" :key="index">
              {{ tag }}
            </el-tag>
          </el-col>
          <el-col class="buttons" :span="5">
            <el-button
              v-if="condition(item.id)"
              @click="handleRequest(item.id)"
              >{{ $t("btn_Contact") }}</el-button
            >
            <el-button @click="navigateDetail(item.id)">{{
              $t("btn_ViewDetail")
            }}</el-button>
          </el-col>
        </el-row>
      </el-card>
      <request-form
        v-if="this.$store.state.isRequest == true"
        :uid="receiverId"
      ></request-form>
    </el-main>
    <progress-bar></progress-bar>
  </el-container>
</template>
  



<script>
import { db } from "../firebase";
const collectionPath = "users";
import router from "../router/index";
import Request from "../components/Request";
import Progress from "../components/Progress";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  components: {
    "request-form": Request,
    "progress-bar": Progress,
  },
  props: ["firebaseData"],
  data() {
    return {
      uid: null,
      receiverId: "",
      allCoach: [],
      filterTag: [],
    };
  },

  firestore: {
    allCoach: db.collection(collectionPath).where("firstName", "!=", null),
  },

  methods: {
    navigateDetail(uid) {
      const senderId = this.uid;
      const detailData = {
        uid: uid,
        senderId: senderId,
      };
      localStorage.setItem("detailData", JSON.stringify(detailData));
      router.push({
        name: "Detail",
        params: { uid, senderId },
      });
    },
    handleRequest(id) {
      console.log(id);
      console.log("clicked");
      this.receiverId = id;
      this.$store.commit("isRequest");
    },
  },
  computed: {
    customTagColor() {
      return {
        backgroundColor: "red",
      };
    },
    condition: function () {
      var vm = this;
      return function (id) {
        if (vm.uid !== null) {
          if (vm.uid == id) {
            return false;
          }
        }
        return true;
      };
    },
  },

  filters: {
    addMoney: function (value) {
      return value.toString() + " tl/hour";
    },
    toUpperCase: function (value) {
      return value.toUpperCase();
    },
  },
  watch: {
    filterTag: function () {
      this.$bind(
        "allCoach",
        db
          .collection(collectionPath)
          .where(
            "tags",
            "array-contains-any",
            this.filterTag.length == 0
              ? ["frontend", "backend", "career"]
              : this.filterTag
          )
      ).then(() => {
        this.$store.dispatch("isLoading");
      });
    },
  },
  mounted() {
    this.uid = firebase.auth().currentUser.uid
      ? firebase.auth().currentUser.uid
      : null;
  },
};
</script>

<style scoped>
.el-header {
  width: 120vmin;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-main {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.el-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.el-description {
  padding: 1rem;
  height: 7rem;
  overflow-y: hidden;
  text-overflow: clip;
}

.item-box {
  width: 120vmin;
  height: 15rem;
  margin: 1rem;
}

.el-tag {
  margin-top: 1rem;
  margin-right: 0.5rem;
}
.hourlyRate {
  font-weight: 500;
}
.buttons {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
