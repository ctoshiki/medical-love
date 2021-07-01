<template>
  <div>
    <header class="header">
      <h1 class="logo">
        <nuxt-link :to="`/`">
          <img class="logoImg" src="/images/logo.svg" alt="医療DX" />
        </nuxt-link>
      </h1>
      <button class="menuBtn" @click="toggleOpen()">
        <img src="/images/icon_menu.svg" alt="menu" />
      </button>
      <div v-if="open" class="mask" @click="setOpen(false)"></div>

      <div class="menu" :class="{ isOpen: open }">
        <ul class="lists">
          <li class="list">
            <nuxt-link :to="`/articles/`">Articles</nuxt-link>
          </li>
          <li class="list">
            <nuxt-link :to="`/about/`">About</nuxt-link>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script>
export default {
  data() {
    return {
      params: this.params || '',
      open: false,
    };
  },
  mounted() {
    this.params = location.search || '';
  },
  methods: {
    setOpen(value) {
      this.open = value;
    },
    toggleOpen() {
      this.open = !this.open;
    },
  },
};
</script>

<style scoped>
@media (min-width: 768px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    padding: 12px 40px;
    z-index: 10;
    background-color: #fff;
    font-family: 'Europa', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .logo {
    padding: 8px 0;
    margin-right: 30px;

    a {
      display: block;
      height: 30px;
    }
  }

  .logoImg {
    height: 30px;
  }

  .menuBtn {
    display: none;
  }

  .menu {
    display: flex;
    padding: 12px 0;
  }

  .lists {
    display: flex;
    align-items: center;
  }

  .list {
    margin-right: 30px;
    white-space: nowrap;

    &:last-child {
      margin: 0;
    }

    a,
    a:visited {
      color: var(--color-text-main);
    }
  }
}

@media (max-width: 767px) {
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #fff;
    padding: 16px;
    z-index: 10;
    font-family: 'Europa', sans-serif;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 2px;
  }

  .logo {
    display: inline-block;
    height: 28px;
  }

  .logoImg {
    height: 28px;
  }

  .menuBtn {
    border: none;
    background: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
  }

  .menu {
    position: absolute;
    left: 0;
    top: 60px;
    display: none;
    flex-direction: column-reverse;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid var(--color-border);
    z-index: 2001;
    padding-top: 8px;

    &.isOpen {
      display: flex;
    }
  }

  .lists {
    padding: 8px 0;

    &:first-child {
      padding-top: 0;
    }
  }

  .list {
    padding: 8px 16px;
    white-space: nowrap;

    a {
      display: block;
      color: var(--color-text-main);
      padding: 8px 0 16px 0;
      border-bottom: 1px solid var(--color-border);
    }

    &:last-child a {
      border-bottom: none;
    }
  }

  .mask {
    position: fixed;
    top: 61px;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 2000;
  }
}
</style>
