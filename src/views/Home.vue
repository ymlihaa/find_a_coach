<template>
  <div class="home">
    <h1 v-if="this.$store.state.isActive === true">Request</h1>
    <v-card
      class="mx-auto card"
      max-width="650"
      outlined
      v-for="item in allCoach"
      :key="item.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <!-- <div class="overline mb-4">
            {{ item.data.firstName }} {{ item.data.lastName }}
          </div> -->
          <v-list-item-title class="headline mb-1">
            {{ item.data.firstName }} {{ item.data.lastName }}
          </v-list-item-title>
          <v-list-item-subtitle>
            {{ item.data.description }}
          </v-list-item-subtitle>
          <v-list-item-subtitle>{{
            item.data.hourlyRate | addMoney
          }}</v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar tile size="80" color="grey"></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn rounded text> Contact </v-btn>
        <v-btn @click="navigateDetail(item.uid)" outlined rounded text>
          View Details
        </v-btn>
      </v-card-actions>
    </v-card>

    <router-view />
  </div>
</template>
  



  




<script>
import { db } from "../firebase";
const collectionPath = "users";
import router from "../router/index";

export default {
  name: "Home",
  props: ["firebaseData"],
  data() {
    return {
      allCoach: [],
    };
  },
  firestore() {
    db.collection(collectionPath)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, " => ", doc.data());
          this.allCoach.push({ uid: doc.id, data: doc.data() });
        });
      });
  },

  methods: {
    navigateDetail(uid) {
      router.push({
        name: "Detail",
        params: { uid },
      });
    },
  },

  filters: {
    addMoney: function (value) {
      return value + " tl/hour";
    },
  },
};
</script>

<style scoped>
.card {
  margin: 1rem;
}
</style>
