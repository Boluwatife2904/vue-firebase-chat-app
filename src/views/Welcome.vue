<template>
  <div class="page-container">
    <div class="left-column column">
      <div class="left-content-wrapper">
        <div class="header">
          <h6>RoomsHouse.</h6>
          <p>
            A central hub where people can meet people, and have meaningful
            conversations.
          </p>
        </div>
        <div class="image-wrapper">
          <img src="@/assets/images/teammates.jpg" alt="Teammates" />
        </div>
      </div>
    </div>
    <div class="right-column column">
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="circle"></div>
      <div class="right-content-wrapper" :class="{ 'higher-spacing': loginMode }">
        <div class="header">
          <p>Start for free</p>
          <h3>{{ loginMode ? "Continue" : "Sign up" }} to RoomsHouse.</h3>
          <p>
            {{ loginMode ? "Don't have an account?" : "Already a member?" }}
            <button @click="toggleMode" class="mode-switcher">
              {{ loginMode ? "Sign up" : "Log in" }}
            </button>
          </p>
        </div>
        <div class="form-wrapper">
          <LoginForm
            v-if="loginMode"
            @proceed-to-chatroom="proceedToChatroom"
          />
          <SignupForm v-else @proceed-to-chatroom="proceedToChatroom" />
        </div>
      </div>
      <div class="forgot-password" v-if="loginMode">
        <button @click="toggleForgotPasswordModal">Forgot Password?</button>
      </div>
      <teleport to="body">
        <forgot-password :open="openModal" @close-modal="toggleForgotPasswordModal"></forgot-password>
      </teleport>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import LoginForm from "../components/forms/LoginForm.vue";
import SignupForm from "../components/forms/SignupForm.vue";
import ForgotPassword from '../components/modals/ForgotPassword.vue';
export default {
  components: { SignupForm, LoginForm, ForgotPassword },
  name: "Welcome",
  setup() {
    const router = useRouter();
    const loginMode = ref(true);
    const openModal = ref(false);

    const toggleMode = () => {
      loginMode.value = !loginMode.value;
    };

    const toggleForgotPasswordModal = () => {
      openModal.value = !openModal.value;
    };

    const proceedToChatroom = () => {
      router.replace({ name: "Chatroom", params: { room: "general" } });
    };

    return { loginMode, openModal, toggleMode, proceedToChatroom, toggleForgotPasswordModal };
  },
};
</script>

<style lang="scss" scoped>
.page-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }

  .column {
    flex: 0 0 50%;
    max-width: 50%;
    padding: 20px;

    @media screen and (max-width: 992px) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }

  .left-column {
    background: #fafcfe;

    @media screen and (max-width: 992px) {
      display: none;
    }

    .left-content-wrapper {
      max-width: 600px;
      margin: 50px auto;

      .header {
        max-width: 400px;

        h6 {
          color: #5c62f2;
          font-size: 24px;
          margin-bottom: 8px;
        }

        p {
          line-height: 22px;
          color: #555;
        }
      }
    }

    .image-wrapper {
      img {
        mix-blend-mode: multiply;
        max-width: 100%;
        height: 480px;
        max-height: 100%;
        display: block;
        margin: 50px auto 0;
      }
    }
  }

  .right-column {
    background: #fff;
    position: relative;
    overflow: hidden;

    .right-content-wrapper {
      max-width: 500px;
      width: 100%;
      margin: 50px auto 0;

      .header {
        margin-bottom: 30px;

        h3 {
          margin: 10px 0;
          color: #3d4555;
          font-size: 30px;
          font-weight: 700;

          @media screen and (max-width: 380px) {
            font-size: 24px;
          }
        }

        p {
          color: #777;
          font-size: 15px;

          &:first-child {
            text-transform: uppercase;
          }
        }
      }

      &.higher-spacing {
        margin: 100px auto 0;
      }
    }
  }
}

.mode-switcher {
  background: transparent;
  color: #5c62f2;
  padding: 0;
  border-radius: 0;
  outline: none;
  border-bottom: none;
  font-weight: 600;
}

.circle {
  border: 5px solid #5c62f2;
  height: 110px;
  width: 110px;
  border-radius: 50%;
  position: absolute;

  &:nth-child(1) {
    top: -50px;
    left: -50px;
  }

  &:nth-child(2) {
    right: -50px;
    top: -50px;
  }

  &:nth-child(3) {
    bottom: -50px;
    left: -50px;
  }

  &:nth-child(4) {
    right: -50px;
    bottom: -50px;
  }
}

.forgot-password {
  margin: 50px auto 0;

  button {
    display: block;
    margin: 0 auto;
    background: none;
    color: #5c62f2;
  }
}
</style>
