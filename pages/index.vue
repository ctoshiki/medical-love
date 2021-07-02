<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <!-- ファーストビュー -->
      <div class="hero">
        <div class="item">
          <h2>デザインの力で、<br />社会を変える。</h2>
          <p>
            「MEDICAL&hearts;DX」は『日本の医療費を減らして子どもたちに明るい未来を。』をビジョンに、医療に関わるプレイヤーのあらゆる角度で医療DXを推進し、より良い社会をつくることに貢献します。
          </p>
        </div>
        <img
          class="image"
          src="/images/top_image.jpg"
          alt="医療DXといえば【MEDICAL♡DX】"
        />
      </div>
      <!-- 最新の記事 -->
      <div class="container">
        <PageTitle title="Recent Article" />
        <ArticlesList :contents="recentArticlesContents" />
      </div>
      <!-- サービス -->
      <!-- <div class="container">
        <PageTitle title="Service" />
        <ArticlesList :contents="serviceArticlesContents" />
      </div> -->
      <!-- About -->
      <div class="container">
        <PageTitle title="About" />
        <ArticlesList :contents="aboutArticlesContents" />
      </div>
    </div>
    <Footer :categories="categories" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ params, payload, $config }) {
    const limit = 10;
    const recentArticles = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/articles?filters=category[not_equals]service[and]cateogory[not_equals]company&limit=${limit}`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const recentArticlesContents = recentArticles.data.contents;

    // const serviceArticles = await axios.get(
    //   `https://${$config.serviceId}.microcms.io/api/v1/articles?limit=${limit}&filters=category[equals]service`,
    //   {
    //     headers: { 'X-API-KEY': $config.apiKey },
    //   }
    // );
    // const serviceArticlesContents = serviceArticles.data.contents;

    const aboutArticles = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/articles?limit=${limit}&filters=category[equals]about`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const aboutArticlesContents = aboutArticles.data.contents;

    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?filters=id[not_equals]service[and]id[not_equals]about&limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    return {
      recentArticlesContents,
      // serviceArticlesContents,
      aboutArticlesContents,
      categories: categories.data.contents,
    };
  },
  data() {
    return {};
  },
  head() {
    return {
      titleTemplate: '',
      title: '医療DXといえば【MEDICAL♡DX】',
    };
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .divider {
    width: 980px;
    margin: 100px auto 0;
  }

  .container {
    margin: 150px auto 150px;
  }

  .hero {
    margin-top: -100px;
    height: 100vh;
    min-height: 500px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    h2 {
      font-size: 44px;
      font-weight: bold;
      margin-bottom: 30px;
    }

    p {
      line-height: 1.8;
      letter-spacing: 0.2px;
    }

    .item {
      width: 360px;
    }

    .image {
      width: 560px;
    }
  }
}

@media (max-width: 1023px) {
  .divider {
    margin: 60px auto 0;
    padding: 0 20px;
  }

  .container {
    margin: 150px auto 150px;
  }

  .hero {
    display: flex;
    flex-direction: column-reverse;
    margin-bottom: 50px;

    h2 {
      font-size: 36px;
      font-weight: bold;
      margin: 30px 0;
    }

    p {
      line-height: 1.8;
      letter-spacing: 0.2px;
      margin: 40px 0;
    }

    .item,
    .image {
      width: 100%;
    }
  }
}
</style>
