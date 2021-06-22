<template>
  <form>
    <user-avatar :name="username"></user-avatar>
    <input
      type="text"
      name="message"
      id="message"
      placeholder="Type a message and hit enter to send..."
      v-model.trim="text"
      @keypress.enter.prevent="sendMessage"
    />
  </form>
</template>

<script>
import { ref, computed } from "vue";
import getUser from "../composables/getCurrentUser";
import useCollection from "../composables/useCollection";
import { timestamp } from "../firebase/config";
import UserAvatar from "./UserAvatar.vue";

export default {
  components: { UserAvatar },
  name: "NewChatMessage",
  setup() {
    const { user } = getUser();
    const { error, addDocument } = useCollection("messages");
    const text = ref("");
    const sendMessage = async () => {
      if (text.value !== "") {
        const chat = {
          message: text.value,
          sender: user.value.displayName,
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
  width: 100%;
  max-width: 100%;
  padding: 20px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 0;

  input {
    width: 100%;
    max-width: 100%;
    font: inherit;
    padding: 0;
    outline: none;
    border: none;
    color: rgb(73, 73, 73);
  }
}
</style>