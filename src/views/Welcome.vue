<template>
  <div class="welcome container">
    <h2 class="header">
      {{ loginMode ? "Login" : "Signup" }}
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
import LoginForm from "../components/forms/LoginForm.vue";
import SignupForm from "../components/forms/SignupForm.vue";
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

<style lang="scss" scoped>
.welcome {
  padding: 30px 10px;

  .header {
    margin-bottom: 20px;
    text-align: center;
    color: rgb(100, 100, 100);
  }
}


.mode-switcher {
  text-align: center;

  button {
    background: transparent;
    color: #5c62f2;
    padding: 0;
    border-radius: 0;
    outline: none;
    border-bottom: 1px solid #5c62f2;
  }
}
</style>
