<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <div class="form-control" :class="{ invalid: !!email.message }">
      <label for="email">
        <span>Email address</span>
        <span v-if="!!email.message" class="form-error">{{
          email.message
        }}</span>
      </label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="johndoe@gmail.com"
        @focus="resetInput(email)"
        v-model.trim="email.value"
      />
      <i class="bx bx-at icon"></i>
    </div>
    <div class="form-control" :class="{ invalid: !!password.message }">
      <label for="password">
        Password
        <span v-if="!!password.message" class="form-error">{{
          password.message
        }}</span>
      </label>
      <input
        type="password"
        name="password"
        id="password"
        placeholder="6 or more characters"
        @focus="resetInput(password)"
        v-model.trim="password.value"
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
import { ref, reactive } from "vue";
import { firebase } from "../../firebase/config";
import loginAction from "@/composables/loginaAction";
export default {
  name: "LoginForm",
  emits: ["proceed-to-chatroom"],
  setup(_, context) {
    const { error, isLoading, login } = loginAction();
    const email = reactive({
      value: "",
      message: null,
    });
    const password = reactive({
      value: "",
      message: null,
    });
    const formIsValid = ref(true);

    const resetInput = (input) => {
      input.message = null;
    };

    const validateForm = () => {
      formIsValid.value = true;
      if (email.value === "") {
        email.message = "Email address cannot be empty";
        formIsValid.value = false;
      }
      if (password.value === "") {
        password.message = "You need to enter your password!";
        formIsValid.value = false;
      } else if (password.value.length < 6) {
        password.message = "Must be greater than 6 characters";
        formIsValid.value = false;
      }
    };

    const submitForm = async () => {
      validateForm();
      if (!formIsValid.value) {
        return;
      }
      await login(email.value, password.value);
      if (!error.value) {
        email.value = "";
        password.value = "";
        context.emit("proceed-to-chatroom");
        error.value = null;
      }
    };

    const loginWithGoogle = async () => {
      var provider = new firebase.auth.GoogleAuthProvider();
      await firebase
        .auth()
        .signInWithPopup(provider)
        .then(() => {
          context.emit("proceed-to-chatroom");
          error.value = null;
        });
    };

    return {
      email,
      password,
      submitForm,
      error,
      isLoading,
      loginWithGoogle,
      resetInput,
    };
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