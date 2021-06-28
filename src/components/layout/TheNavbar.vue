<template>
  <nav v-if="user">
    <div class="user-information">
      <p>{{ greeting }}, {{ user.displayName }}</p>
      <button class="logout" @click="logoutUser">
        <i class="bx bx-log-out"></i>Logout
      </button>
    </div>
    <button @click="toggleSidebar" class="toggler">
      <i class="bx bx-menu"></i>
    </button>
  </nav>
</template>

<script>
import { computed } from "vue";
import logoutAction from "@/composables/logoutAction";
import getCurrentUser from "@/composables/getCurrentUser";
export default {
  name: "TheNavbar",
  emits: ["toggle-sidebar"],
  setup(_, context) {
    const { error, logout } = logoutAction();
    const { user } = getCurrentUser();

    const logoutUser = async () => { await logout() };

    const toggleSidebar = () => {
      context.emit("toggle-sidebar");
    };

    const greeting = computed(() => {
      const hours = new Date().getHours();
      let message;
      if (hours < 12) {
        message = "Good Morning"
      } else if (hours < 16) {
        message = "Good afternoon"
      } else {
        message = "Good evening"
      }
      return message;
    })

    return { greeting, error, logout, logoutUser, user, toggleSidebar };
  },
};
</script>

<style lang="scss" scoped>
nav {
  flex: 0 0 100px;
  max-height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  background: rgb(246, 251, 255);

  p {
    margin: 5px auto;
    color: #444;
  }

  .logout {
    background: none;
    color: #777;
    padding: 4px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    i {
      padding-right: 4px;
    }
  }

  .toggler {
    border-radius: 6px;
    font-size: 20px;
    background: none;
    font-size: 30px;
    display: none;

    @media screen and (max-width: 576px) {
      display: block;
    }
  }
}
</style>