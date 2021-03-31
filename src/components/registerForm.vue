<template>
  <div class="w-100 d-flex">
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
        class="input-group--focused w-50"
        v-model="lastName"
        label="Last Name"
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
          Sing Up
        </v-btn>

        <v-btn color="error" class="mr-4"> Reset Form </v-btn>
      </div>
    </v-form>
  </div>
</template>


 

<script>
import { db } from "../firebase";
import router from "../router/index";

export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      description: "",
      hourlyRate: "",
      tags: [],
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
        })
        .then(() => {
          console.log("successful");
          router.push("/");
        })
        .catch((err) => console.log(err.message));
    },
  },
};
</script>

<style scoped>
.w-100 {
  width: 100%;
}
.w-50 {
  width: 50%;
}

.h-100 {
  height: 100vh;
}

.mt-10 {
  margin-top: auto;
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
.selectBoxs {
  width: 100%;
}
</style>
