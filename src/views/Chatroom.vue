<template>
  <div class="container">
    <TheNavbar />
  </div>
</template>

<script>
import TheNavbar from "../components/TheNavbar.vue";
import getCurrentUser from "../composables/getCurrentUser";
import { useRouter } from "vue-router";
import { watch } from "vue";
export default {
  components: { TheNavbar },
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