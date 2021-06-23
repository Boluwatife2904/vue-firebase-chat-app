<template>
  <div class="sidebar">
    <p>Available rooms</p>
    <ul>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'general' } }"
          ><span>&#128204;</span>general</router-link
        >
      </li>
            <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'introductions' } }"
          ><span>&#128075;</span>introductions</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'lifestyle' } }"
          ><span>&#127759;</span>lifestyle</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'gist' } }"
          ><span>&#9889;</span>gist</router-link
        >
      </li>
            <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'music' } }"
          ><span>&#127926;</span>music</router-link
        >
      </li>
      <!-- <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'money' } }"
          ><span>&#128176;</span>money</router-link
        >
      </li> -->
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'technology' } }"
          ><span>&#128187;</span>technology</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'fashion' } }"
          ><span>&#128088;</span>fashion</router-link
        >
      </li>
            <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'love' } }"
          ><span>&#128150;</span>love</router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'football' } }"
          ><span>&#9917;</span>football</router-link
        >
      </li>
            <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'crypto' } }"
          ><span>&#128202;</span>crypto</router-link
        >
      </li>
            <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'eighteen' } }"
          ><span>&#128286;</span>18+</router-link
        >
      </li>
    </ul>
  </div>
</template>

<script>
import getCollection from "../composables/getCollection";
export default {
  name: "Sidebar",
  setup() {
    const { rooms } = getCollection("messages");
    return { rooms };
  },
};
</script>

<style lang="scss">
.sidebar {
  background: #303042;
  height: 100vh;
  width: 100%;
  padding: 20px 20px;

  p {
    color: #fff;
    padding-left: 14px;
    margin-bottom: 10px;
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 10px;

      a {
        text-decoration: none;
        outline: none;
        padding: 14px;
        color: rgb(150, 150, 150);
        display: block;
        border-radius: 4px;

        &.router-link-active {
          // background: linear-gradient(#5b92f2, #5c62f2);
          color: #fff;
        }

        span {
          margin-right: 5px;
        }
      }
    }
  }
}
</style>