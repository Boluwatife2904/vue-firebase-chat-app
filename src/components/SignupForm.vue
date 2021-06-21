<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="display">Display Name</label>
      <input type="text" name="display" id="display" v-model.trim="displayName">
    </div>
    <div class="form-control">
      <label for="email">Email address</label>
      <input type="email" name="email" id="email" v-model.trim="email">
    </div>
    <div class="form-control">
      <label for="password">Password</label>
      <input type="password" name="password" id="password" v-model.trim="password">
    </div>
    <button type="submit">Sign up</button>
  </form>
</template>

<script>
import { ref } from "vue";
export default {
  name: "SignupForm",
  setup() {
    const displayName = ref("");
    const password = ref("");
    const email = ref("");

    const submitForm = () => {
      console.log("Submitting form.............");
    }

    return { displayName, email, password, submitForm }
  }
}
</script>

<style>

</style>