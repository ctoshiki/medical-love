<template>
  <div class="share">
    <p class="label">SHARE ON:</p>
    <ul class="shareLists">
      <li class="shareList">
        <a :href="getTwitterLink()" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_twitter.svg" alt="Twitter" />
        </a>
      </li>
      <li class="shareList">
        <a :href="getFacebookLink()" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_facebook.svg" alt="Facebook" />
        </a>
      </li>
      <li class="shareList">
        <a :href="getHatenaLink()" target="_blank" rel="noopener noreferrer">
          <img src="/images/icon_hatena.svg" alt="はてなブックマーク" />
        </a>
      </li>
      <li class="shareList">
        <a
          :href="`${baseUrl}/feed.xml`"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/images/icon_feed.svg" alt="フィード" />
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: Object,
      required: true,
    },
    baseUrl: {
      type: String,
      required: true,
    },
  },
  methods: {
    getTwitterLink() {
      return `https://twitter.com/intent/tweet?text=${this.title}&url=${this.baseUrl}/${this.category.id}/${this.id}/&hashtags=iryo_dx`;
    },
    getFacebookLink() {
      return `https://www.facebook.com/sharer.php?u=${this.baseUrl}/${this.category.id}/${this.id}/`;
    },
    getHatenaLink() {
      return `https://b.hatena.ne.jp/entry/${this.baseUrl}/${this.category.id}/${this.id}/`;
    },
  },
};
</script>

<style scoped>
.label {
  font-size: 10px;
  padding: 16px 10px;
  margin-bottom: 10px;
  font-family: 'Europa', sans-serif;
  letter-spacing: 2px;
  color: var(--color-text-sub);
  text-align: center;
}

.share {
  margin: 40px 0 0;

  img {
    max-height: 16px;
  }
}

.shareLists {
  display: flex;
  justify-content: center;
}

.shareList {
  text-align: center;
  margin: 0 20px;
}
</style>
