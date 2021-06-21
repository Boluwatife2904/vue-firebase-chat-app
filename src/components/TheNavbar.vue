<template>
  <nav>
    <div class="user-information">
      <p>Welcome back, display name</p>
      <p class="email">Currently logged in as... email</p>
    </div>
    <button class="logout" @click="logoutUser">Logout</button>
  </nav>
</template>

<script>
import logoutAction from "../composables/logoutAction";
export default {
  name: "TheNavbar",
  setup() {
    const { error, logout } = logoutAction();

    const logoutUser = async () => {
      await logout();
      if (!error.value) {
        console.log("Logging user out...");
      }
    };

    return { error, logout, logoutUser };
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
}
</style>