<template>
   <div class="empty">
      <img
        src="../assets/images/nothing.webp"
        alt="nothing to see here image"
      />
      <p>
        Uhmmmmm <span>&#128549;</span>... It seems like there are no messages
        here yet. Be the first to drop a message <span>&#128521;</span>.
      </p>
    </div>
</template>

<script>
export default {
  name: "EmptyScreen"
}
</script>

<style lang="scss" scoped>
.empty {
  max-width: 450px;
  width: 90%;
  margin: auto;

  img {
    height: 260px;
    max-width: 100%;
    margin: 30px auto;
    display: block;
    mix-blend-mode: multiply;
  }

  p {
    line-height: 30px;
    text-align: center;
  }
}
</style>