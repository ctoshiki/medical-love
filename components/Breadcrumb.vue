<template>
  <ul class="breadcrumb">
    <li class="breadcrumbList">
      <nuxt-link to="/" class="a">医療DXといえば【MEDICAL♡DX】</nuxt-link>
    </li>
    <li
      v-if="category.id !== undefined && category.id !== null"
      class="breadcrumbList"
    >
      <nuxt-link :to="`/${category.id}/`">{{ category.name }}</nuxt-link>
    </li>
    <li
      v-if="title !== undefined && title !== null && title != ''"
      class="breadcrumbList"
    >
      {{ title }}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    category: {
      type: Object,
      required: false,
      default: () => ({}),
    },
    title: {
      type: String,
      required: false,
      default: '',
    },
  },
};
</script>

<style scoped>
.breadcrumb {
  display: flex;
  flex-wrap: wrap;
  padding-top: 20px;
}

.breadcrumbList {
  color: var(--color-text-sub);

  a {
    color: var(--color-text-sub);
  }

  &::after {
    content: '>';
    margin: 0 10px;
  }

  &:last-child&::after {
    content: '';
    margin: 0;
  }
}
@media (max-width: 767px) {
  .breadcrumbList {
    font-size: 14px;
  }
}
</style>
