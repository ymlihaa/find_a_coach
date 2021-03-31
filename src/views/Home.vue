<template>
  <div class="home">
    <h1 v-if="this.$store.state.isActive === true">Request</h1>
    <div v-if="this.$store.state.isRequest == false">
      <v-card class="mx-auto card" max-width="650" outlined>
        <v-card-actions class="d-flex">
          <v-switch
            v-model="filterTag"
            label="Front End "
            color="red"
            value="frontend"
            hide-details
          ></v-switch>

          <v-switch
            v-model="filterTag"
            label="Back End "
            color="primary"
            value="backend"
            hide-details
          ></v-switch>

          <v-switch
            v-model="filterTag"
            label="Career "
            color="primary"
            value="career"
            hide-details
          ></v-switch> </v-card-actions
      ></v-card>
      <v-card
        class="mx-auto card"
        max-width="650"
        outlined
        v-for="item in allCoach"
        :key="item.id"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ item.firstName }}
              {{ item.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{ item.description }}
            </v-list-item-subtitle>
            <v-list-item-subtitle>{{
              item.hourlyRate | addMoney
            }}</v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
        </v-list-item>

        <v-card-actions>
          <v-btn rounded text @click="handleRequest(item.id)"> Contact </v-btn>
          <v-btn @click="navigateDetail(item.id)" outlined rounded text>
            View Details
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
    <div v-if="this.$store.state.isRequest === true">
      <request-form :uid="uid"></request-form>
    </div>
    <router-view />
  </div>
</template>
  



<script>
import { db } from "../firebase";
const collectionPath = "users";
import router from "../router/index";
import Request from "../components/Request";
export default {
  name: "Home",
  components: {
    "request-form": Request,
  },
  props: ["firebaseData"],
  data() {
    return {
      uid: "",
      allCoach: [],
      filterTag: [],
    };
  },

  firestore: {
    allCoach: db.collection(collectionPath),
  },

  methods: {
    navigateDetail(uid) {
      router.push({
        name: "Detail",
        params: { uid },
      });
    },
    handleRequest(id) {
      console.log(id);
      console.log("clicked");
      this.uid = id;
      this.$store.commit("isRequest");
    },
  },
  computed: {
    customTagColor() {
      return {
        backgroundColor: "red",
      };
    },
  },

  filters: {
    addMoney: function (value) {
      return value + " tl/hour";
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
      );
    },
  },
};
</script>

<style scoped>
.card {
  margin: 1rem;
}
.d-flex {
  display: flex;
  align-content: center;
  justify-content: center;
}

.tags {
  background-color: red;
  color: white;
}
</style>
