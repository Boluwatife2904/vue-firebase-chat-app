<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <div class="form-control">
      <label for="display">Display Name</label>
      <input
        type="text"
        name="display"
        id="display"
        placeholder="John Doe"
        v-model.trim="displayName"
      />
      <i class='bx bx-user-circle icon' ></i>
    </div>
    <div class="form-control">
      <label for="email">Email address</label>
      <input type="email" name="email" id="email" placeholder="johndoe@gmail.com" v-model.trim="email" />
      <i class='bx bx-at icon'></i>
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="6 or more characters"
        v-model.trim="password"
      />
      <i class='bx bx-lock-open-alt icon'></i>
    </div>
    <button type="submit" class="submit">
      <i class="bx bx-loader bx-spin bx-flip-horizontal" v-if="isLoading"></i>
      <span v-else>Create an account</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import signupAction from "@/composables/signupAction";

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