<template>
    <div class="avatar" :class="avatarClasses">
      <h6>{{ firstLetter }}</h6>
    </div>
</template>

<script>
import { computed } from 'vue';
export default {
  name: "UserAvatar",
  props: {
    name: {
      type: String,
      required: false,
      default: "U"
    }
  },
  setup(props) {
    const firstLetter = computed(() => props.name[0].toLowerCase());
    const avatarClasses = computed(() => "avatar-" + firstLetter.value )
    return { firstLetter, avatarClasses }
  },
};
</script>

<style lang="scss" scoped>
.avatar {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50px;
  margin-right: 10px;
  flex-shrink: 0;

  h6 {
    font-weight: 600;
    color: #fff;
    font-size: 18px;
    text-transform: uppercase;
  }

  &-a,
  &-i,
  &-q,
  &-y {
    background: #47c1bf;
  }

  &-b,
  &-j,
  &-r,
  &-z {
    background: #fead9a;
  }

  &-c,
  &-k,
  &-s {
    background: #eec200;
  }

  &-d,
  &-l,
  &-t {
    background: #5c6ac4;
  }

  &-e,
  &-m,
  &-u {
    background: #d138b0;
  }

  &-f,
  &-n,
  &-v {
    background: #454f5b;
  }

  &-g,
  &-o,
  &-w {
    background: #108043;
  }

  &-h,
  &-p,
  &-x {
    background: #006fbb;
  }
}
</style>