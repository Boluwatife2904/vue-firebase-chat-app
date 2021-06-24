<template>
  <div class="sidebar">
    <p>Available rooms</p>
    <ul>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'general' } }"
          ><span>&#128204;</span
          ><span class="room-name">general</span></router-link
        >
      </li>
      <li>
        <router-link
          :to="{ name: 'Chatroom', params: { room: 'introductions' } }"
          ><span>&#128075;</span
          ><span class="room-name">introductions</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'lifestyle' } }"
          ><span>&#127759;</span
          ><span class="room-name">lifestyle</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'gist' } }"
          ><span>&#9889;</span><span class="room-name">gist</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'music' } }"
          ><span>&#127926;</span
          ><span class="room-name">music</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'technology' } }"
          ><span>&#128187;</span
          ><span class="room-name">technology</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'fashion' } }"
          ><span>&#128088;</span
          ><span class="room-name">fashion</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'love' } }"
          ><span>&#128150;</span
          ><span class="room-name">love</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'football' } }"
          ><span>&#9917;</span
          ><span class="room-name">football</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'crypto' } }"
          ><span>&#128202;</span
          ><span class="room-name">crypto</span></router-link
        >
      </li>
      <li>
        <router-link :to="{ name: 'Chatroom', params: { room: 'eighteen' } }"
          ><span>&#128286;</span><span class="room-name">18+</span></router-link
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
  padding: 20px 15px;
  overflow-y: auto;

  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }

  p {
    color: #fff;
    padding-left: 14px;
    margin-bottom: 10px;

    @media screen and (max-width: 994px) {
      display: none;
    }
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

        @media screen and (max-width: 994px) {
          text-align: center;
        }

        &.router-link-active {
          color: #fff;
        }

        span {
          margin-right: 5px;
        }

        .room-name {
          display: inline;

          @media screen and (max-width: 994px) {
            display: none;
          }
        }
      }
    }
  }
}
</style>