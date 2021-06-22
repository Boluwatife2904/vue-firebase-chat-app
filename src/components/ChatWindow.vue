<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="formattedDocuments" class="messages" ref="messagesContainer">
      <div
        class="message"
        :class="[document.sender === user.displayName ? 'sender' : 'receiver']"
        v-for="document in formattedDocuments"
        :key="document.id"
      >
        <span class="text">{{ document.message }}</span>
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name" v-if="document.sender !== user.displayName ">{{
          document.sender
        }}</span>
      </div>
    </div>
    <div class="loading" v-else>loading</div>
  </div>
</template>

<script>
import { onUpdated, ref, computed } from "vue";
import { formatDistanceToNow } from "date-fns";
import getCollection from "../composables/getCollection";
import getCurrentUser from '../composables/getCurrentUser';

export default {
  name: "ChatWindow",
  setup() {
    const { error, documents } = getCollection("messages");
    const messagesContainer = ref(null);
    const { user } = getCurrentUser();

    const formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.map((document) => {
          let time = formatDistanceToNow(document.createdAt.toDate());
          return { ...document, createdAt: time };
        });
      }
    });

    onUpdated(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });

    return { error, formattedDocuments, messagesContainer, user };
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  max-width: 100%;

  .messages {
    padding: 30px 20px;
    background: #f2f6fe;
    height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    .message {
      margin: 18px 0;
      border-radius: 5px;
      width: 100%;
      font-size: 15px;
      padding: 15px 20px 40px;
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
</style>