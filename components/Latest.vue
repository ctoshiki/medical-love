<template>
  <div class="wrapper">
    <h3 class="pageTitle">Latest Articles</h3>
    <ul>
      <li v-for="content in contents" :key="content.id" class="list">
        <nuxt-link :to="`/${content.category.id}/${content.id}/`" class="link">
          {{ content.title }}
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
.wrapper {
  padding: 40px 0;
}

.pageTitle {
  padding: 16px 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-family: 'Europa', sans-serif;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
}

.list {
  border-bottom: 1px solid var(--color-border);

  &:last-child {
    border-bottom: none;
  }
}

.link {
  display: block;
  padding: 10px;
  color: var(--color-text-main);
}
</style>
