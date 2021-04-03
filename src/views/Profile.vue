<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-row>
                <v-col>
                  <div class="p-2 d-flex-col">
                    <v-avatar color="grey lighten-2" size="128"></v-avatar>
                    <span class="title mt-1"
                      >{{ userDetail.firstName }}
                      {{ userDetail.lastName }}
                    </span>

                    <v-sheet min-height="30vh" rounded="lg">
                      {{ userDetail.description }}
                    </v-sheet>

                    <v-card
                      outlined
                      class="p-half mr-1"
                      v-for="(tag, index) in userDetail.tags"
                      :key="index"
                      max-width="72"
                    >
                      <v-list-item-subtitle class="mt-1"
                        ><strong>{{ tag }}</strong></v-list-item-subtitle
                      >
                    </v-card>
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
  },
};
</script>

<style scoped>
.mt-5 {
  margin-top: 5rem;
}

.detail-wrapper {
  max-width: 720px;
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
.p-half {
  padding: 0.5rem;
  width: auto;
}
</style>
