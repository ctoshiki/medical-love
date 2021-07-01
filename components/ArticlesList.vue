<template>
  <div class="wrapper">
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.category.id}/${content.id}/`" class="link">
          <img
            :data-src="content.ogimage.url + '?w=670'"
            class="item lazyload"
            :alt="content.title"
          />
          <dl class="item">
            <dt class="title">
              <h3>{{ content.title }}</h3>
            </dt>
            <dd>
              <p>{{ content.description }}</p>
              <Meta
                :created-at="content.publishedAt || content.createdAt"
                :author="content.writer !== null ? content.writer.name : ''"
                :category="content.category"
              />
            </dd>
          </dl>
        </nuxt-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    contents: {
      type: Array,
      required: false,
      default: () => [],
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  .list {
    padding: 36px 0;
  }

  .link {
    display: flex;
    justify-content: space-between;
  }

  .item {
    width: 450px;
  }

  .title {
    font-size: 32px;
    font-weight: bold;
    margin-bottom: 30px;
    color: var(--color-text-main);
  }

  p {
    line-height: 1.8;
    letter-spacing: 0.2px;
    margin: 10px 0;
    color: var(--color-text-main);
  }
}

@media (max-width: 1023px) {
  .list {
    padding: 32px 0 0;
    border-bottom: 1px solid var(--color-border);

    &:first-child {
      padding-top: 16px;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  .item {
    width: 100%;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    margin-top: 10px;
    color: var(--color-text-main);
  }

  p {
    line-height: 1.8;
    letter-spacing: 0.2px;
    margin: 10px 0;
    color: var(--color-text-main);
  }
}
</style>
