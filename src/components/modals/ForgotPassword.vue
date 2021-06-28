<template>
  <div class="modal" v-if="open">
    <div class="modal-content">
      <button class="close" @click="$emit('close-modal')">
        <i class="bx bx-x"></i>
      </button>
      <div class="modal-inner" v-if="!emailSent">
        <h3>Reset Password</h3>
        <p>
          Enter the email address associated with your account and we'll send an
          email with instructions to reset your password.
        </p>
        <form class="auth-form" @submit.prevent="sendResetPassword">
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
          <button type="submit" class="submit">
            <i class="bx bx-loader bx-spin" v-if="isLoading"></i>
            <span v-else>Send Instructions</span>
          </button>
          <div v-if="error" class="error">
            {{ error }}
          </div>
        </form>
      </div>
      <div class="email-sent" v-else>
        <div class="image-wrapper">
          <img src="@/assets/images/message.svg" alt="Success Mail Icon" />
        </div>
        <h3>Check your mail</h3>
        <p>
          We just sent password recovery instructions to your provided email.
        </p>
        <button @click="closeModal">Alright. Thanks.</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { projectAuth } from "../../firebase/config";

export default {
  name: "ForgotPassword",
  props: ["open"],
  emits: ["close-modal"],
  setup(_, context) {
    const email = reactive({
      value: "",
      message: null,
    });
    const isLoading = ref(false);
    const emailSent = ref(false);
    const formIsValid = ref(true);
    const error = ref(null);

    const validateForm = () => {
      formIsValid.value = true;
      if (email.value === "") {
        email.message = "Provide a registered email.";
        formIsValid.value = false;
      }
    };

    const sendResetPassword = async () => {
      validateForm();
      if (!formIsValid.value) {
        return;
      }
      isLoading.value = true;
      error.value = null;
      await projectAuth.sendPasswordResetEmail(email.value).then(() => {
        emailSent.value = true;
        isLoading.value = false;
      })
      .catch((err) => {
        error.value = err.message;
        isLoading.value = false;
      });
    };

    const resetInput = (input) => {
      input.message = null;
      error.value = null;
    };

    const closeModal = () => {
      email.value = "";
      emailSent.value = false;
      context.emit("close-modal");
    }

    return { email, isLoading, emailSent, error, sendResetPassword, resetInput, closeModal };
  },
};
</script>

<style lang="scss" scoped>
.modal {
  background: rgba(0, 0, 0, 0.7);
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal-content {
    background: #fff;
    padding: 40px 30px;
    border-radius: 5px;
    max-width: 500px;
    width: 90%;
    position: relative;

    .modal-inner {
      h3 {
        font-size: 26px;
        margin-bottom: 10px;
      }

      p {
        color: #999;
        line-height: 25px;
        max-width: 400px;
      }
    }

    .close {
      position: absolute;
      top: 10px;
      right: 10px;
      font-size: 30px;
      background: none;
    }

    .email-sent {
      text-align: center;

      .image-wrapper {
        height: 100px;
        width: 100px;
        padding: 10px;
        margin: 30px auto;
        background: rgba(92, 98, 242, 0.075);
        border-radius: 10px;

        img {
          display: block;
          margin: 0 auto;
          max-width: 100%;
        }
      }

      h3 {
        font-size: 24px;
        margin-bottom: 10px;
      }

      p {
        color: #999;
        max-width: 350px;
        margin: 10px auto;
        line-height: 25px;
      }

      button {
        background: #5c62f2;
        color: #fff;
        padding: 14px 20px;
        border-radius: 6px;
        margin: 20px 0;
      }
    }
  }
}

form {
  margin: 30px 0 15px;
}
</style>