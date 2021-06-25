<template>
  <div
    class="message"
    :class="[document.sender === user.displayName ? 'sender' : 'receiver']"
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
</template>

<script>
import getCurrentUser from "@/composables/getCurrentUser";
import useCollection from "@/composables/useCollection";
export default {
  name: "Message",
  props: ["document"],
  setup() {
    const { user } = getCurrentUser();
    const { deleteDocument } = useCollection("messages");

    return { user, deleteDocument };
  },
};
</script>

<style lang="scss">
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
  background: #5c62f2;
  padding-top: 25px;
  margin-left: auto;
  color: #fff;

  &::before {
    right: -9px;
    border: 10px solid transparent;
    border-bottom: 10px solid #5c62f2;
  }
}
</style>