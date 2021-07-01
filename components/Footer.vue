<template>
  <footer class="footer">
    <div class="container">
      <h3>医療DXといえば MEDICAL♡DX</h3>
      <p>
        MEDICAL♡DXは医療業界のDXに特化したメディアです。医療DXの取り組み事例やサービス紹介、業界の課題など取り上げています。医療の未来をよくするため、メディアを通じて情報発信をしてまいります。
      </p>
      <p>
        『日本の医療費を減らして子どもたちに明るい未来を。』をビジョンに、医療に関わるプレイヤーのあらゆる角度で医療DXを推進し、より良い社会をつくることに貢献します。
      </p>
    </div>
    <div class="container">
      <h3>サイトマップ</h3>
      <ul class="lists">
        <li class="list">
          <nuxt-link :to="`/`">トップ</nuxt-link>
        </li>
        <li class="list">
          <nuxt-link :to="`/articles/`">すべての記事</nuxt-link>
        </li>
        <li v-for="category in categories" :key="category.id" class="list">
          <nuxt-link :to="`/${category.id}/`">
            {{ category.name }}
          </nuxt-link>
        </li>
        <li class="list">
          <nuxt-link :to="`/about/`">メディアについて</nuxt-link>
        </li>
      </ul>
    </div>
    <div class="container">
      <p>&copy; 2021 Toshiki Nishihata</p>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
.footer {
  position: relative;
  padding: 30px 40px 30px;
  z-index: 10;
  color: #fff;
  background-color: var(--color-text-main);
  margin-top: 120px;
  text-align: center;

  h3 {
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    margin: 30px 0 12px;
  }

  p {
    margin: 16px auto;
    color: #fff;
    /* font-size: 14px; */
    line-height: 2.2;
  }
}

.container {
  margin: 80px auto;
}

.lists {
  align-items: center;
  justify-content: center;
  margin: 16px auto;
  line-height: 2.2;
}

.list {
  a {
    color: #fff;
  }
}

@media (min-width: 768px) {
  .container {
    width: 680px;
  }
}
@media (max-width: 767px) {
  .container {
    font-size: 14px;

    h3 {
      font-size: 20px;
    }
  }
}
</style>
