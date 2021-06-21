<template>
  <form @submit.prevent="submitForm">
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
      <span v-else>Login</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import loginAction from "../composables/loginaAction";
export default {
  name: "LoginForm",
  setup() {
    const { error, isLoading, login } = loginAction();
    const email = ref("");
    const password = ref("");

    const submitForm = async () => {
      await login(email.value, password.value);
      if (!error.value) {
        email.value = "";
        password.value = "";
      }
    };

    return { email, password, submitForm, error, isLoading };
  },
};
</script>

<style lang="scss">
form {
  button {
    width: 100px;
    height: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    i {
      font-size: 17px;
    }
  }
}
</style>