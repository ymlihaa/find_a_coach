<template>
  <v-app id="inspire">
    <!-- <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar>

        <v-btn v-for="link in links" :key="link" text>
          {{ link }}
        </v-btn>
        <v-tab v-if="this.$store.state.isActive !== false">
          <v-badge color="green" :content="this.$store.state.msgCount">
            Messages
          </v-badge>
        </v-tab>

        <v-spacer></v-spacer>

        <v-responsive max-width="260">
          <v-text-field
            dense
            flat
            hide-details
            rounded
            solo-inverted
          ></v-text-field>
        </v-responsive>
      </v-container>
    </v-app-bar> -->

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-row>
                <v-col>
                  <div class="d-flex-col">
                    <v-avatar color="grey lighten-2" size="128"></v-avatar>
                    <span class="title mt-1"
                      >{{ userDetail.firstName }}
                      {{ userDetail.lastName }}
                    </span>

                    <!-- <section class="description mt-5"> -->
                    <v-sheet min-height="30vh" rounded="lg">
                      {{ userDetail.description }}
                    </v-sheet>
                  </div>

                  <request-form v-if="isRequest == true"></request-form>
                </v-col>
              </v-row>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import { db } from "../firebase";
import { db } from "../firebase";
const collectionPath = "users";

export default {
  data() {
    return {
      userDetail: [],
      allMessages: [],
      links: ["Home", "Profile", "Logout"],
    };
  },

  created() {
    console.log(this.$store.state.uid);
    this.$bind(
      "userDetail",
      db.collection(collectionPath).doc(this.$store.state.uid)
    );
    this.$bind("allMessages", db.collection(this.$store.state.uid)).then(() => {
      this.$store.state.msgCount = this.allMessages.length;
    });
  },
};
</script>

<style scoped>
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
}

.main-container {
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
