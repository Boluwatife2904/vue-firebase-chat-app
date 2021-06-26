<template>
  <div class="page-wrapper">
    <div class="page-content">
      <img src="@/assets/images/nothing.webp" alt="nothing to see here image" />
      <p>
        Uhmmmmm <span>&#128549;</span>... The page you're looking for might be
        temporarily unavailable, had its name changed or might have been
        deleted. <span>&#128532;</span>.
      </p>
      <router-link :to="{ name: 'Chatroom', params: { room: 'general' } }"
        >Return Home</router-link
      >
    </div>
  </div>
</template>

<script>
export default {
  name: "Error404",
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;

  .page-content {
    max-width: 500px;
    width: 100%;
    text-align: center;

    img {
      display: block;
      margin: 0 auto 20px;
      max-width: 100%;
    }

    p {
      line-height: 25px;
    }

    a {
      display: inline-block;
      padding: 14px 30px;
      background: #5c63d2;
      color: #ffff;
      border-radius: 6px;
      border: none;
      outline: none;
      text-decoration: none;
      margin: 20px auto;
    }
  }
}
</style>