<template>
  <div class="wrapper">
    <h3 class="pageTitle">Category</h3>
    <ul>
      <li v-for="category in categories" :key="category.id" class="list">
        <nuxt-link :to="`/${category.id}/`" class="link">{{
          category.name
        }}</nuxt-link>
      </li>
    </ul>
  </div>
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

  a {
    display: block;
    padding: 10px;
    color: var(--color-text-main);
  }

  &:last-child {
    border-bottom: none;
  }
}

@media (max-width: 767px) {
  .link {
    font-size: 14px;
  }
}
</style>
