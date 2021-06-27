<template>
  <form @submit.prevent="submitForm" class="auth-form">
    <div class="form-control" :class="{ invalid: !!displayName.message }">
      <label for="display">
        <span>Display Name</span>
        <span v-if="!!displayName.message" class="form-error">{{
          displayName.message
        }}</span>
      </label>
      <input
        type="text"
        name="display"
        id="display"
        placeholder="John Doe"
        @focus="resetInput(displayName)"
        v-model.trim="displayName.value"
      />
      <i class="bx bx-user-circle icon"></i>
    </div>
    <div class="form-control" :class="{ invalid: !!email.message }">
      <label for="email">
        <span>Email Address</span>
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
        <span>Password</span>
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
      <span v-else>Create an account</span>
    </button>
    <button type="button" class="google-login" @click="signupWithGoogle">
      <span class="icon"><i class="bx bxl-google"></i></span>
      <span>Sign up with Google</span>
    </button>
    <div v-if="error">
      <p class="error">{{ error }}</p>
    </div>
  </form>
</template>

<script>
import { ref, reactive } from "vue";
import { firebase } from "../../firebase/config";
import signupAction from "@/composables/signupAction";

export default {
  name: "SignupForm",
  emits: ["proceed-to-chatroom"],
  setup(_, context) {
    const { error, signup, isLoading } = signupAction();
    const displayName = reactive({
      value: "",
      message: null,
    });
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
      if (displayName.value === "") {
        displayName.message = "Kindly provide a nickname";
        formIsValid.value = false;
      }
      if (email.value === "") {
        email.message = "Email address cannot be empty";
        formIsValid.value = false;
      }
      if (password.value === "") {
        password.message = "You need to create a password!";
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
      await signup(email.value, password.value, displayName.value);
      if (!error.value) {
        displayName.value = "";
        password.value = "";
        email.value = "";
        context.emit("proceed-to-chatroom");
        error.value = null;
      }
    };

    const signupWithGoogle = async () => {
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
      displayName,
      email,
      password,
      submitForm,
      error,
      isLoading,
      signupWithGoogle,
      resetInput,
    };
  },
};
</script>

<style>
</style>