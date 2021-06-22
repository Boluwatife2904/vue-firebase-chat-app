<template>
  <div class="container">
    <TheNavbar />
    <ChatWindow />
    <NewChatMessage />
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { watch } from "vue";
import getCurrentUser from "../composables/getCurrentUser";
import TheNavbar from "../components/TheNavbar.vue";
import NewChatMessage from '../components/NewChatMessage.vue';
import ChatWindow from '../components/ChatWindow.vue';

export default {
  components: { TheNavbar, NewChatMessage, ChatWindow },
  setup() {
    const router = useRouter();
    const { user } = getCurrentUser();
    watch(user, () => {
      if (user.value === null) {
        router.push({ name: "Welcome" })
      }
    });
  },
};
</script>

<style>
</style>