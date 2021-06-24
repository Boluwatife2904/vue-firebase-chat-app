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
      <div
        class="message"
        :class="[document.sender === user.displayName ? 'sender' : 'receiver']"
        v-for="document in documents"
        :key="document.id"
      >
        <span class="text">{{ document.message }}</span>
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name" v-if="document.sender !== user.displayName">{{
          document.sender
        }}</span>
        <button
          class="delete"
          @click="deleteDocument(document.id)"
          v-if="document.sender === user.displayName"
        >
          <i class="bx bx-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { onUpdated, ref } from "vue";
import MessageLoader from "../components/MessageLoader.vue";
import EmptyScreen from "../components/EmptyScreen.vue";
import getCurrentUser from "../composables/getCurrentUser";
import useCollection from "../composables/useCollection";

export default {
  name: "ChatWindow",
  components: { MessageLoader, EmptyScreen },
  props: ["documents", "error", "isLoading"],
  setup() {
    const messagesContainer = ref(null);
    const { user } = getCurrentUser();
    const { deleteDocument } = useCollection("messages");
    onUpdated(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });
    return { messagesContainer, user, deleteDocument };
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

    .message {
      margin: 18px 0;
      border-radius: 5px;
      width: 100%;
      font-size: 15px;
      padding: 25px 20px 40px;
      border: none;
      max-width: 450px;
      position: relative;

      span {
        display: block;
      }

      .created-at {
        position: absolute;
        right: 10px;
        bottom: 8px;
        font-size: 12px;
      }

      .text {
        line-height: 22px;
      }

      .name {
        position: absolute;
        bottom: 8px;
        left: 20px;
      }

      &::before {
        content: "";
        position: absolute;
        visibility: visible;
        bottom: 0;
      }
    }

    .receiver {
      background: #fff;
      color: #222;

      &::before {
        left: -9px;
        border: 10px solid transparent;
        border-bottom: 10px solid #fff;
      }
    }

    .sender {
      background: linear-gradient(#5b92f2, #5c62f2);
      margin-left: auto;
      color: #fff;

      &::before {
        right: -9px;
        border: 10px solid transparent;
        border-bottom: 10px solid #5c62f2;
      }
    }
  }
}

.delete {
  background: none;
  color: #fff;
  font-weight: bold;
  border: 0;
  border-radius: 0;
  padding: 10px;
  cursor: pointer;
  font: inherit;
  outline: none;
  position: absolute;
  right: 0;
  top: 0;
}

.loading-component {
  padding: 30px 20px;
}
</style>