<template>
  <div class="chat-window" ref="messagesContainer">
    <div v-if="error">
      {{ error }}
    </div>
    <div class="loading-component" v-if="isLoading">
      <message-loader v-for="number in 6" :key="number"></message-loader>
    </div>
    <EmptyScreen v-else-if="!isLoading && documents.length === 0" />
    <div v-else-if="!isLoading && documents" class="messages">
      <Message
        v-for="document in documents"
        :document="document"
        :key="document.id"
      />
    </div>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import MessageLoader from "../misc/MessageLoader.vue";
import EmptyScreen from "../misc/EmptyScreen.vue";
import Message from "./Message.vue";

export default {
  name: "ChatWindow",
  components: { MessageLoader, EmptyScreen, Message },
  props: ["documents", "error", "isLoading"],
  setup() {
    const messagesContainer = ref(null);
    onUpdated(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });
    return { messagesContainer };
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  max-width: 100%;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scroll-behavior: smooth;
  background: #f2f6fe;

  .messages {
    padding: 30px 20px;
    background: #f2f6fe;
    height: 100%;
  }
}

.loading-component {
  padding: 30px 20px;
}
</style>