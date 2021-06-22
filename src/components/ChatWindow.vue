<template>
  <div class="chat-window">
    <div v-if="error">
      {{ error }}
    </div>
    <div v-if="formattedDocuments" class="messages" ref="messagesContainer">
      <div
        class="message"
        :class="{ sender: document.sender === 'Boluwatife' }"
        v-for="document in formattedDocuments"
        :key="document.id"
      >
        <span class="text">{{ document.message }}</span>
        <span class="created-at">{{ document.createdAt }}</span>
        <span class="name">{{ document.sender }}</span>
      </div>
    </div>
    <div class="loading" v-else>loading</div>
  </div>
</template>

<script>
import { onUpdated, ref, computed } from "vue";
import { formatDistanceToNow } from "date-fns"
import getCollection from "../composables/getCollection";

export default {
  name: "ChatWindow",
  setup() {
    const { error, documents } = getCollection("messages");
    const messagesContainer = ref(null);

    const formattedDocuments = computed(() => {
      if(documents.value) {
        return documents.value.map(document => {
          let time = formatDistanceToNow(document.createdAt.toDate());
          return { ...document, createdAt: time }
        })
      }
    })

    onUpdated(() => {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
    });

    return { error, formattedDocuments, messagesContainer };
  },
};
</script>

<style lang="scss" scoped>
.chat-window {
  width: 100%;
  max-width: 100%;

  .messages {
    padding: 30px 20px;
    background: rgb(247, 250, 252);
    height: 450px;
    overflow-y: auto;
    overflow-x: hidden;
    scroll-behavior: smooth;

    .message {
      margin: 18px 0;
      border-radius: 0 30px 30px 30px;
      max-width: 450px;
      width: 100%;
      padding: 15px 20px;
      border: 1px solid rgb(203, 213, 224);
      background: #fff;
      font-size: 15px;

      span {
        display: block;
      }
    }

    .sender {
      background: #212b36;
      border-radius: 30px 0 30px 30px;
      max-width: 400px;
      width: 100%;
      margin-left: auto;
      color: #fff;
    }
  }
}
</style>