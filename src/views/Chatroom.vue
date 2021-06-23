<template>
  <div class="page-wrapper">
    <div class="sidebar-content">
      <Sidebar />
    </div>
    <div class="main-container">
      <TheNavbar />
      <ChatWindow :documents="formattedDocuments" :error="error" :isLoading="isLoading" />
      <NewChatMessage />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { watch, computed } from "vue";
import getCurrentUser from "../composables/getCurrentUser";
import TheNavbar from "../components/TheNavbar.vue";
import Sidebar from "../components/Sidebar.vue";
import NewChatMessage from "../components/NewChatMessage.vue";
import ChatWindow from "../components/ChatWindow.vue";
import getCollection from "../composables/getCollection";

export default {
  components: { TheNavbar, NewChatMessage, ChatWindow, Sidebar },
  props: ["room"],
  setup(props) {
    const { error, documents, isLoading } = getCollection("messages");
    const router = useRouter();
    const { user } = getCurrentUser();
    watch(user, () => {
      if (user.value === null) {
        router.push({ name: "Welcome" });
      }
    });

    let formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.filter(
          (document) => document.room === props.room
        );
      }
    });

    return { error, isLoading, formattedDocuments };
  },
};
</script>

<style lang="scss">
.page-wrapper {
  display: flex;
  height: 100vh;
  width: 100vw;

  .sidebar-content {
    flex: 0 0 20%;
    max-width: 20%;
  }

  .main-container {
    flex: 0 0 80%;
    max-width: 80%;

    display: flex;
    flex-direction: column;
  }
}
</style>