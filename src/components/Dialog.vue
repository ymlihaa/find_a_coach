      <template>
  <div class="text-center">
    <v-dialog v-model="dialog" width="500">
      <v-card>
        <v-card-title class="headline grey lighten-2"> Warning </v-card-title>

        <v-card-text>
          {{ Message }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="handleOk"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["dialogMessage"],
  data() {
    return {
      dialog: this.$store.state.dialog,
      Message: this.dialogMessage,
    };
  },
  methods: {
    handleOk() {
      this.$store.commit("isDialog", { isShow: false });
    },
  },
};
</script>