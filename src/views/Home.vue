<template>
  <div class="home">
    <h1 v-if="this.$store.state.isActive === true">Request</h1>
    <div class="list-wrapper d-flex" v-for="item in allCoach" :key="item.id">
      <div class="item-box">
        {{ item.data.firstName }} | {{ item.data.lastName }}
        <span class="hourlyRate">
          {{ item.data.hourlyRate | addMoney }}
        </span>
        <span class="tags d-flex">Fronend</span>
        <section class="btn-group d-flex">
          <button class="btn">Contact</button>
          <button class="btn">View Detail</button>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../firebase";
const collectionPath = "users";

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

  filters: {
    addMoney: function (value) {
      return value + " tl/hour";
    },
  },
};
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.d-flex {
  display: flex;
  align-items: center;
  justify-content: center;
}
.list-wrapper {
  width: 100%;
}
.item-box {
  width: 30rem;
  border: 1px solid #fefefe;
  padding: 3rem;
  margin: 1rem;
  border-radius: 1rem;
  box-shadow: 0 1px 24px #cacaca;
}
.tags {
  border: 1px solid #cacaca;
  width: 100px;
  padding: 6px;
  border-radius: 1rem;
  box-shadow: 0 1px 12px red;
}

.btn {
  width: 10rem;
  padding: 12px;
  border-radius: 1rem;
  border: 1px solid #cacaca;
  margin: 0.3rem;
}
</style>
