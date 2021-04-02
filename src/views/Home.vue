<template>
  <transition name="fade">
    <div class="home">
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
              <v-list-item-subtitle>
                {{ item.hourlyRate | addMoney }}
              </v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-avatar
              class="avatar"
              tile
              size="80"
              color="grey"
              max-width="80"
            >
            </v-list-item-avatar>
          </v-list-item>
          <v-card
            outlined
            class="p-1 float-right mr-1"
            v-for="(tag, index) in item.tags"
            :key="index"
            max-width="72"
          >
            <v-list-item-subtitle class="mt-1"
              ><strong>{{ tag }}</strong></v-list-item-subtitle
            >
          </v-card>
          <v-card-actions>
            <v-btn
              v-if="condition(item.id)"
              rounded
              text
              @click="handleRequest(item.id)"
            >
              Contact
            </v-btn>
            <v-btn @click="navigateDetail(item.id)" outlined rounded text>
              View Details
            </v-btn>
          </v-card-actions>
        </v-card>
      </div>
      <div v-if="this.$store.state.isRequest === true">
        <request-form :uid="uid"></request-form>
      </div>
    </div>
  </transition>
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
      uid: this.$store.state.uid ? this.$store.state.uid : null,
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
      );
    },
  },
};
</script>

<style scoped>
.avatar {
  width: 50px;
}

.mr-1 {
  margin-right: 0.5rem;
}

.p-1 {
  padding: 0.5rem;
  width: auto;
}

.tag-card {
  width: 5rem;
}
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
