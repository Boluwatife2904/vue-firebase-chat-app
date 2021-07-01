<template>
  <div class="sidebar" :class="{ open }">
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
export default {
  name: "Sidebar",
  props: ["open"],
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

      @media screen and (max-width: 576px) {
        opacity: 0;
        transform: translateX(-40px);
        transition: all 0.3s linear;

        &:nth-child(1) {
          transition-delay: 0.2s;
        }

        &:nth-child(2) {
          transition-delay: 0.3s;
        }

        &:nth-child(3) {
          transition-delay: 0.4s;
        }

        &:nth-child(4) {
          transition-delay: 0.5s;
        }

        &:nth-child(5) {
          transition-delay: 0.6s;
        }

        &:nth-child(6) {
          transition-delay: 0.7s;
        }

        &:nth-child(7) {
          transition-delay: 0.8s;
        }

        &:nth-child(8) {
          transition-delay: 0.9s;
        }

        &:nth-child(9) {
          transition-delay: 1s;
        }

        &:nth-child(10) {
          transition-delay: 1.1s;
        }

        &:nth-child(11) {
          transition-delay: 1.2s;
        }
      }

      a {
        text-decoration: none;
        outline: none;
        padding: 14px;
        color: rgb(150, 150, 150);
        display: block;
        border-radius: 4px;
        transition: all 0.3s linear;

        @media screen and (max-width: 994px) {
          text-align: center;
        }

        @media screen and (max-width: 576px) {
          text-align: left;
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

          @media screen and (max-width: 576px) {
            display: inline;
          }
        }
      }
    }
  }

  &.open {
    ul {
      li {
        opacity: 1;
        transform: translateX(0);
      }
    }
  }
}
</style>