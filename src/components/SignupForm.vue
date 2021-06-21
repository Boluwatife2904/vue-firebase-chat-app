<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="display">Display Name</label>
      <input
        type="text"
        name="display"
        id="display"
        v-model.trim="displayName"
      />
    </div>
    <div class="form-control">
      <label for="email">Email address</label>
      <input type="email" name="email" id="email" v-model.trim="email" />
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        v-model.trim="password"
      />
    </div>
    <button type="submit">
      <i class="bx bx-loader bx-spin bx-flip-horizontal" v-if="isLoading"></i>
      <span v-else>Signup</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import signupAction from "../composables/signupAction";

export default {
  name: "SignupForm",
  emits: ["proceed-to-chatroom"],
  setup(_, context) {
    const { error, signup, isLoading } = signupAction();
    const displayName = ref("");
    const password = ref("");
    const email = ref("");

    const submitForm = async () => {
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        displayName.value = "";
        password.value = "";
        email.value = "";
        context.emit("proceed-to-chatroom")
      }
    };

    return { displayName, email, password, submitForm, error, isLoading };
  },
};
</script>

<style>
</style>