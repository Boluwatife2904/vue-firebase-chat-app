<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Email address</label>
      <input type="email" name="email" id="email" v-model.trim="email">
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model.trim="password">
    </div>
    <button type="submit">Login</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "LoginForm",
  setup() {
    const email = ref("");
    const password = ref("");

    const submitForm = () => {
      console.log("Submitting form.............");
    }

    return { email, password, submitForm }
  }
}
</script>

<style>

</style>