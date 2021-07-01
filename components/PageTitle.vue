<template>
  <div class="wrapper">
    <h2>{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
      default: '',
    },
  },
};
</script>

<style scoped>
@media (min-width: 1024px) {
  h2 {
    font-family: 'Europa', sans-serif;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    margin: 100px auto;
    color: var(--color-text-main);
  }
}
@media (max-width: 1023px) {
  h2 {
    font-family: 'Europa', sans-serif;
    font-size: 18px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
    margin: 80px auto;
    color: var(--color-text-main);
  }
}
</style>
