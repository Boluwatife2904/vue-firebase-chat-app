<template>
  <form @submit.prevent="submitForm" class="auth-form">
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
      <span v-else>Login</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import loginAction from "@/composables/loginaAction";
export default {
  name: "LoginForm",
  emits: ["proceed-to-chatroom"],
  setup(_, context) {
    const { error, isLoading, login } = loginAction();
    const email = ref("");
    const password = ref("");

    const submitForm = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        email.value = "";
        password.value = "";
        context.emit("proceed-to-chatroom");
      }
    };

    return { email, password, submitForm, error, isLoading };
  },
};
</script>

<style>
</style>