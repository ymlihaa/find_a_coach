<template>
  <v-app id="inspire">
    <v-main class="grey lighten-3">
      <v-container>
        <dialog-app
          v-if="this.$store.state.dialog == true"
          :dialogMessage="errorMessage"
        ></dialog-app>
        <success-app
          v-if="show"
          :isOk="show"
          message="Başarı ile düzenlendi ."
        ></success-app>

        <v-row>
          <v-col>
            <v-sheet class="p-2" min-height="70vh" rounded="lg">
              <div class="w-100 d-flex-col">
                <v-avatar color="grey lighten-2" size="128"></v-avatar>

                <v-form
                  class="w-50 d-flex-col mt-10"
                  ref="form"
                  lazy-validation
                  outlined
                  @submit.prevent="registerUser"
                >
                  <v-text-field
                    class="w-50"
                    v-model="firstName"
                    :counter="10"
                    label="First Name"
                    required
                  ></v-text-field>

                  <v-text-field
                    class="w-50"
                    v-model="lastName"
                    :counter="10"
                    label="First Name"
                    required
                  ></v-text-field>

                  <v-textarea v-model="description" color="teal" class="w-50">
                    <template v-slot:label>
                      <div>Description <small>(optional)</small></div>
                    </template>
                  </v-textarea>

                  <v-text-field
                    class="input-group--focused w-50"
                    label="Hourly Rate"
                    v-model="hourlyRate"
                    required
                  ></v-text-field>
                  <div class="selectBoxs d-flex">
                    <v-switch
                      class="mr-4"
                      v-model="tags"
                      label="Front End"
                      color="primary"
                      value="frontend"
                      hide-details
                    ></v-switch>
                    <v-switch
                      class="mr-4"
                      v-model="tags"
                      label="Back End "
                      color="primary"
                      value="backend"
                      hide-details
                    ></v-switch>
                    <v-switch
                      v-model="tags"
                      label="Career"
                      class="mr-4"
                      color="primary"
                      value="career"
                      hide-details
                    ></v-switch>
                  </div>
                  <div class="d-flex mt-10">
                    <v-btn color="success" class="mr-4" @click="handleSave">
                      Tamamla
                    </v-btn>
                  </div>
                </v-form>
              </div>
            </v-sheet>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { db } from "../firebase";
import Success from "../components/Success";

export default {
  props: ["userDetail"],
  components: {
    "success-app": Success,
  },
  data() {
    return {
      hourlyRate: this.userDetail.hourlyRate,
      tags: this.userDetail.tags,
      firstName: this.userDetail.firstName,
      lastName: this.userDetail.lastName,
      description: this.userDetail.description,
      show: false,
    };
  },
  methods: {
    handleSave() {
      db.collection("users")
        .doc(this.$store.state.uid)
        .set({
          firstName: this.firstName,
          lastName: this.lastName,
          description: this.description,
          hourlyRate: this.hourlyRate,
          tags: this.tags,
          errorMessage: "",
        })
        .then(() => {
          console.log("successful");
          this.show = true;
        })
        .catch((error) => {
          this.$store.commit("isDialog", { isShow: true });
          this.errorMessage = error.message;
        });
    },
  },
  created() {
    console.log("userDetail :", this.userDetail);
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
