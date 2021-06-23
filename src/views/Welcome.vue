<template>
  <div class="welcome container">
    <h2 class="header">
      {{ !loginMode ? "Signup" : "Login" }}
    </h2>
    <LoginForm v-if="loginMode" @proceed-to-chatroom="proceedToChatroom" />
    <SignupForm v-else @proceed-to-chatroom="proceedToChatroom" />
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
import { useRouter } from "vue-router";
import LoginForm from "../components/LoginForm.vue";
import SignupForm from "../components/SignupForm.vue";
export default {
  components: { SignupForm, LoginForm },
  name: "Welcome",
  setup() {
    const router = useRouter();
    const loginMode = ref(true);

    const toggleMode = () => {
      loginMode.value = !loginMode.value;
    };

    const proceedToChatroom = () => {
      router.replace({ name: "Chatroom", params: { room: "general" } });
    };

    return { loginMode, toggleMode, proceedToChatroom };
  },
};
</script>

<style lang="scss">
.welcome {
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
    color: #5d7cf3;
    padding: 0;
    border-radius: 0;
    outline: none;
    border-bottom: 1px solid #5d7cf3;
  }
}
</style>
