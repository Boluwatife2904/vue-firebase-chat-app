<template>
  <nav v-if="user">
    <div class="user-information">
      <p>Welcome back, {{ user.displayName }}</p>
      <p class="email">Email - {{ user.email }}</p>
    </div>
    <button class="logout" @click="logoutUser"><i class='bx bx-power-off bx-tada' style='color:#ffffff' ></i></button>
  </nav>
</template>

<script>
import logoutAction from "../composables/logoutAction";
import getCurrentUser from "../composables/getCurrentUser";
export default {
  name: "TheNavbar",
  setup() {
    const { error, logout } = logoutAction();
    const { user } = getCurrentUser();

    const logoutUser = async () => {
      await logout();
      if (!error.value) {
        console.log("Logging user out...");
      }
    };

    return { error, logout, logoutUser, user };
  },
};
</script>

<style lang="scss" scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;

  p {
    margin: 5px auto;
    color: #444;
  }

  .email {
    font-size: 14px;
    color: #999;
  }

  button {
    border-radius: 6px;
    font-size: 20px;
    background: #5d7cf3;
  }
}
</style>