<template>
  <form @submit.prevent="sendMessage">
    <input
      type="text"
      name="message"
      id="message"
      placeholder="Type a message..."
      v-model.trim="text"
      @keypress.enter.prevent="sendMessage"
    />
    <button type="submit" class="send-message" :disabled="text.length <= 0">
      <span>Send</span>
      <i class="bx bxs-send"></i>
    </button>
  </form>
</template>

<script>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import getUser from "../composables/getCurrentUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import UserAvatar from "./UserAvatar.vue";

export default {
  components: { UserAvatar },
  name: "NewChatMessage",
  setup() {
    const route = useRoute();
    const { user } = getUser();
    const { error, addDocument } = useCollection("messages");
    const text = ref("");
    const sendMessage = async () => {
      if (text.value !== "") {
        const chat = {
          message: text.value,
          sender: user.value.displayName,
          room: route.params.room,
          createdAt: timestamp(),
        };
        await addDocument(chat);
      }
      if (!error.value) {
        text.value = "";
      }
    };
    const username = computed(() => user.value.displayName);
    return { text, sendMessage, username, error };
  },
};
</script>

<style lang="scss" scoped>
form {
  flex: 0 0 80px;
  max-height: 80px;
  background: #fff;
  width: 100%;
  max-width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-bottom: 0;

  input {
    width: 100%;
    max-width: 100%;
    height: 100%;
    font: inherit;
    padding: 0;
    outline: none;
    border: none;
    background: none;
    color: rgb(73, 73, 73);
    padding-right: 30px;
  }

  button {
    background: #5d7cf3;
    color: #fff;
    border-radius: 6px;
    font-weight: 500;
    transition: all 0.3s linear;

    &:disabled {
      background: rgb(196, 196, 196);
      color: #555;
      cursor: not-allowed;
    }

    span {
      margin-right: 4px;
    }
  }
}
</style>