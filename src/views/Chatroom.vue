<template>
  <div class="page-wrapper">
    <div class="sidebar-content" :class="{ open: sidebarIsOpen }">
      <Sidebar :open="sidebarIsOpen" />
    </div>
    <div class="main-container">
      <TheNavbar @toggle-sidebar="toggleSidebar" />
      <ChatWindow
        :documents="formattedDocuments"
        :error="error"
        :isLoading="isLoading"
      />
      <NewChatMessage />
    </div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { ref, watch, computed } from "vue";
import getCurrentUser from "../composables/getCurrentUser";
import TheNavbar from "../components/layout/TheNavbar.vue";
import Sidebar from "../components/layout/Sidebar.vue";
import NewChatMessage from "../components/chat/NewChatMessage.vue";
import ChatWindow from "../components/chat/ChatWindow.vue";
import getCollection from "../composables/getCollection";

export default {
  components: { TheNavbar, NewChatMessage, ChatWindow, Sidebar },
  props: {
    room: {
      type: String,
      required: true,
      default: "general",
    },
  },
  setup(props) {
    const router = useRouter();
    const rooms = [
      "general",
      "introductions",
      "lifestyle",
      "gist",
      "music",
      "technology",
      "fashion",
      "love",
      "football",
      "crypto",
      "eighteen",
    ];
    if (rooms.indexOf(props.room) === -1) {
      router.push("/chatroom/general");
    }
    const sidebarIsOpen = ref(false);
    const { error, documents, isLoading } = getCollection("messages");
    const { user } = getCurrentUser();
    watch(user, () => {
      if (user.value === null) {
        router.push({ name: "Welcome" });
      }
    });
    watch(props, () => {
      sidebarIsOpen.value = false;
    })
    let formattedDocuments = computed(() => {
      if (documents.value) {
        return documents.value.filter(
          (document) => document.room === props.room
        );
      }
    });

    const toggleSidebar = () => {
      sidebarIsOpen.value = !sidebarIsOpen.value;
    };

    return {
      error,
      isLoading,
      formattedDocuments,
      sidebarIsOpen,
      toggleSidebar,
    };
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
    overflow-y: auto;

    @media screen and (max-width: 994px) {
      flex: 0 0 10%;
      max-width: 10%;
    }

    @media screen and (max-width: 576px) {
      flex: 0 0 100%;
      max-width: 100%;
      position: fixed;
      top: 0;
      left: -250px;
      z-index: 999;
      width: 200px;
      transition: all 0.3s ease;
    }

    &.open {
      left: 0;
    }
  }

  .main-container {
    flex: 0 0 80%;
    max-width: 80%;
    transition: all 0.3s ease;

    display: flex;
    flex-direction: column;

    @media screen and (max-width: 994px) {
      flex: 0 0 90%;
      max-width: 90%;
    }

    @media screen and (max-width: 576px) {
      flex: 0 0 100%;
      max-width: 100%;
    }
  }
}
</style>