<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <div class="ogimageWrap">
        <picture v-if="ogimage">
          <source
            media="(min-width: 1160px)"
            type="image/webp"
            :srcset="`${ogimage.url}?w=820&fm=webp, ${ogimage.url}?w=1640&fm=webp 2x`"
          />
          <source
            media="(min-width: 820px)"
            type="image/webp"
            :srcset="`${ogimage.url}?w=740&fm=webp, ${ogimage.url}?w=1480&fm=webp 2x`"
          />
          <source
            media="(min-width: 768px)"
            type="image/webp"
            :srcset="`${ogimage.url}?w=728&fm=webp, ${ogimage.url}?w=1456&fm=webp 2x`"
          />
          <source
            media="(max-width: 768px)"
            type="image/webp"
            :srcset="`${ogimage.url}?w=375&fm=webp, ${ogimage.url}?w=750&fm=webp 2x`"
          />
          <img
            ref="ogimage"
            :src="ogimage.url + '?w=820&q=100'"
            class="ogimage"
            alt
          />
        </picture>
      </div>
      <article class="article">
        <Breadcrumb :category="category" :title="title" />
        <div class="main">
          <div class="container">
            <h1 class="title">{{ title }}</h1>
            <Meta
              :created-at="publishedAt || createdAt"
              :author="writer !== null ? writer.name : ''"
              :category="category"
            />
            <Post :body="body" />
            <Writer v-if="writer" :writer="writer" />
            <RelatedArticles
              v-if="related_articles.length > 0"
              :articles="related_articles"
            />
          </div>
          <Share
            :id="id"
            :title="title"
            :category="category"
            :base-url="baseUrl"
          />
          <Categories :categories="categories" />
          <PopularArticles :contents="popularArticles" />
          <Latest :contents="contents" />
        </div>
      </article>
    </div>
    <Footer :categories="categories" />
  </div>
</template>

<script>
import axios from 'axios';
import cheerio from 'cheerio';
import hljs from 'highlight.js';

export default {
  async asyncData({ params, payload, $config }) {
    const data =
      payload !== undefined
        ? payload.content
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/articles/${params.slug}?depth=2`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data;
    const popularArticles =
      payload !== undefined
        ? payload.popularArticles
        : (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/popular-articles`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data.articles;
    const {
      data: { contents },
    } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/articles`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const categories = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/categories?filters=id[not_equals]service[and]id[not_equals]about&limit=100`,
      {
        headers: { 'X-API-KEY': $config.apiKey },
      }
    );
    const $ = cheerio.load(data.body);

    $('pre code').each((_, elm) => {
      const res = hljs.highlightAuto($(elm).text());
      $(elm).html(res.value);
      $(elm).addClass('hljs');
    });
    $('img').each((_, elm) => {
      $(elm).attr('class', 'lazyload');
      $(elm).attr('data-src', elm.attribs.src);
      $(elm).removeAttr('src');
    });

    return {
      ...data,
      popularArticles,
      body: $.html(),
      categories: categories.data.contents,
      contents,
      baseUrl: $config.baseUrl,
    };
  },
  data() {
    return {
      publishedAt: '',
      ogimage: null,
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        { hid: 'description', name: 'description', content: this.description },
        { hid: 'og:title', property: 'og:title', content: this.title },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.description,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: `${this.baseUrl}/${this.category}/${this.id}/`,
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.ogimage && this.ogimage.url,
        },
      ],
    };
  },
};
</script>

<style scoped>
.category {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 3px;
  color: #fff;
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
}
.ogimageWrap {
  position: relative;
  overflow: hidden;
  width: calc(100% + 32px);
  margin: 0 -16px;
  height: 60vh;
}

.ogimage {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (min-width: 768px) {
  .wrapper {
    position: relative;
  }

  .divider {
    padding: 0 16px;
  }

  .article {
    width: 680px;
    margin: 20px auto 0;
  }

  .main {
    display: flex;
    flex-direction: column;
    margin-top: 40px;
    align-items: strech;
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    display: block;
    font-weight: bold;
    font-size: 40px;
    color: #2b2c30;
  }

  .meta {
    padding: 10px 0 40px;
  }

  .timestamp {
    display: inline-flex;
    align-items: center;
    color: #919299;
    margin-right: 20px;

    img {
      margin-right: 6px;
    }
  }

  .author {
    display: inline-flex;
    align-items: center;
    color: #919299;

    img {
      margin-right: 6px;
    }
  }
}

@media (max-width: 767px) {
  .wrapper {
    position: relative;
  }

  .divider {
    padding: 0 16px;
  }

  .article {
    width: 100%;
  }

  .main {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
  }

  .container {
    position: relative;
    flex: 1;
    background-color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  .title {
    display: block;
    font-weight: bold;
    font-size: 32px;
    color: #2b2c30;
  }
}
</style>
