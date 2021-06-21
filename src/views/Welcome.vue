<template>
  <div class="welcome container">
    <h2 class="header">
      {{ !loginMode ? "Signup" : "Login"}}
    </h2>
    <LoginForm v-if="loginMode" />
    <SignupForm v-else />
    <div class="mode-switcher">
      <p>
        {{ loginMode ? "Don't have an account?" : "Already have an account?" }}
        <button @click="toggleMode">
          {{ loginMode ? "Signup" : "Login" }}
        </button>
        instead
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
export default {
  components: { SignupForm, LoginForm },
  name: "Welcome",
  setup() {
    const loginMode = ref(true);

    const toggleMode = () => {
      loginMode.value = !loginMode.value;
    };

    return { loginMode, toggleMode };
  },
};
</script>

<style lang="scss">
.welcome {
  // text-align: center;
  padding: 30px 10px;

  .header {
    margin-bottom: 20px;
    text-align: center;
    color: rgb(100, 100, 100);
  }
}

form {
  max-width: 450px;
  width: 95%;
  margin: 0 auto 40px;

  .form-control {
    margin-bottom: 20px;

    label {
      display: block;
      margin: 0 0 8px;
    }

    input {
      width: 100%;
      padding: 12px 14px;
      font: inherit;
      border-radius: 6px;
      border: 1px solid rgb(220, 220, 220);
      outline: none;
      color: #999;
    }
  }
}

.mode-switcher {
  text-align: center;

  button {
    background: transparent;
    color: #5ae4ca;
    padding: 0;
    border-radius: 0;
    border-bottom: 1px solid #5ae4ca;
  }
}
</style>
