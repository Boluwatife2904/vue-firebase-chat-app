<template>
  <div class="message-loader"></div>
</template>

<script>
export default {
  name: "MessageLoader"
}
</script>

<style lang="scss" scoped>
.message-loader {
  margin: 15px 0;
  border-radius: 5px;
  width: 100%;
  height: 65px;
  max-width: 450px;
  background: rgba(226, 230, 233,0.8);
  position: relative;
  overflow: hidden;

  &:nth-of-type(even) {
    margin-left: auto;
  }

  &::before {
    content: "";
    display: block;
    position: absolute;
    left: -150px;
    top: 0;
    height: 100%;
    width: 150px;
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(255, 252, 255,0.3) 50%,
      transparent 100%
    );
    transition: all 0.3s;
    animation: shimmer 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
  }
}

@keyframes shimmer {
  0% {
    left: -150px;
  }
  100% {
    left: 100%;
  }
}
</style>