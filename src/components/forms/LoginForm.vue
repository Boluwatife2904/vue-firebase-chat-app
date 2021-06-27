<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <div class="form-control">
      <label for="email">Email address</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="johndoe@gmail.com"
        v-model.trim="email"
      />
      <i class="bx bx-at icon"></i>
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
      <i class="bx bx-lock-open-alt icon"></i>
    </div>
    <button type="submit" class="submit">
      <i class="bx bx-loader bx-spin bx-flip-horizontal" v-if="isLoading"></i>
      <span v-else>Login</span>
    </button>
    <button type="button" class="google-login" @click="loginWithGoogle">
      <span class="icon"><i class="bx bxl-google"></i></span>
      <span>Login with Google</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { firebase } from "../../firebase/config";
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

    const loginWithGoogle = async () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider).then(() => {
        context.emit("proceed-to-chatroom");
      });
    };

    return { email, password, submitForm, error, isLoading, loginWithGoogle };
  },
};
</script>

<style lang="scss">
.google-login {
  display: block;
  width: 100%;
  height: 60px;
  border-radius: 8px;
  border: 2px solid rgb(240, 240, 240);
  background: #fff;
  color: #3d4555;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .icon {
    padding-right: 10px;
    font-size: 24px;
    line-height: 0;
    color: #5c62f2;
  }
}
</style>