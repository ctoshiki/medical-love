<template>
  <div class="wrapper">
    <Header />
    <div class="divider">
      <div class="container">
        <PageTitle :title="title" />
        <Breadcrumb
          :category="selectedCategory"
          :title="selectedCategory ? '' : 'すべての記事'"
        />
        <div v-show="contents.length === 0" class="loader">
          記事がありません
        </div>
        <ArticlesList :contents="contents" />
        <ul v-show="contents.length > 0" class="pager">
          <li
            v-for="p in pager"
            :key="p"
            class="page"
            :class="{ active: page === `${p + 1}` }"
          >
            <nuxt-link
              :to="`/${
                selectedCategory !== undefined
                  ? `${selectedCategory.id}`
                  : 'articles'
              }${p == 0 ? '/' : `/page/${p + 1}/`}`"
            >
              {{ p + 1 }}
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
    <Footer :categories="categories" />
  </div>
</template>

<script>
import axios from 'axios';

export default {
  async asyncData({ params, payload, $config }) {
    const page = params.id || '1';
    const categoryId =
      params.categoryId === 'articles' ? undefined : params.categoryId;
    const limit = 10;
    const { data } = await axios.get(
      `https://${$config.serviceId}.microcms.io/api/v1/articles?limit=${limit}${
        categoryId === undefined
          ? '&filters=category[not_equals]service[and]cateogory[not_equals]about'
          : `&filters=category[equals]${categoryId}`
      }&offset=${(page - 1) * limit}`,
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
    const selectedCategory =
      categoryId !== undefined
        ? (
            await axios.get(
              `https://${$config.serviceId}.microcms.io/api/v1/categories/${categoryId}`,
              {
                headers: { 'X-API-KEY': $config.apiKey },
              }
            )
          ).data
        : undefined;
    const title = selectedCategory ? selectedCategory.name : 'すべての記事';
    return {
      ...data,
      categories: categories.data.contents,
      selectedCategory,
      page,
      pager: [...Array(Math.ceil(data.totalCount / limit)).keys()],
      title,
    };
  },
  data() {
    return {};
  },
  head() {
    return {
      title: this.title,
    };
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .loader {
    color: #ccc;
    font-size: 20px;
    text-align: center;
    padding: 150px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 40px;
    height: 40px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 10px;

    &.active {
      background-color: #616269;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #616269;
    }
  }

  .divider {
    width: 980px;
    margin: 200px auto 0;
  }

  .container {
    margin: 150px auto 150px;
  }
}

@media (max-width: 1023px) {
  .loader {
    color: #ccc;
    font-size: 16px;
    padding-top: 20px;
  }

  .pager {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    padding: 40px 0 0;
  }

  .page {
    width: 32px;
    height: 32px;
    background-color: #e5eff9;
    border-radius: 5px;
    margin: 6px;

    &.active {
      background-color: #616269;

      a {
        color: #fff;
      }
    }

    a {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      color: #616269;
    }
  }

  .divider {
    margin: 60px auto 0;
    padding: 0 20px;
  }

  .container {
    margin: 150px auto 150px;
  }
}
</style>
