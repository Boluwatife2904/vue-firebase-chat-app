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
      <div class="right-content-wrapper">
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

    const toggleMode = () => { loginMode.value = !loginMode.value };

    const proceedToChatroom = () => { router.replace({ name: "Chatroom", params: { room: "general" } })};

    return { loginMode, toggleMode, proceedToChatroom };
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

    .right-content-wrapper {
      max-width: 500px;
      width: 100%;
      margin: 100px auto 0;

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
</style>
