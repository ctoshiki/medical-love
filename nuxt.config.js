import axios from 'axios';
require('dotenv').config();
const { API_KEY, SERVICE_ID, BASE_URL, GA_ID } = process.env;

export default {
  publicRuntimeConfig: {
    apiKey: process.env.NODE_ENV !== 'production' ? API_KEY : undefined,
    serviceId: process.env.NODE_ENV !== 'production' ? SERVICE_ID : undefined,
    baseUrl: process.env.NODE_ENV !== 'production' ? BASE_URL : undefined,
  },
  privateRuntimeConfig: {
    apiKey: API_KEY,
    serviceId: SERVICE_ID,
    baseUrl: BASE_URL,
  },
  target: 'static',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      prefix: 'og: http://ogp.me/ns#',
      lang: 'ja',
    },
    titleTemplate: '%s | 医療DXといえば【MEDICAL♡DX】',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          '【MEDICAL♡DX】は医療業界のDXに特化したメディアです。医療DXの取り組み事例やサービス紹介、業界の課題などを取り上げています。医療の未来をよくするため、メディアを通じて情報発信をしてまいります。',
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: '医療DXといえば【MEDICAL♡DX】',
      },
      { hid: 'og:type', property: 'og:type', content: 'website' },
      {
        hid: 'og:url',
        property: 'og:url',
        content: `${BASE_URL}`,
      },
      { hid: 'og:title', property: 'og:title', content: '医療DXといえば【MEDICAL♡DX】' },
      {
        hid: 'og:description',
        property: 'og:description',
        content:
          '【MEDICAL♡DX】は医療業界のDXに特化したメディアです。医療DXの取り組み事例やサービス紹介、業界の課題などを取り上げています。医療の未来をよくするため、メディアを通じて情報発信をしてまいります。',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: `${BASE_URL}/images/ogp.png`,
      },

      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: `${BASE_URL}/favicon.png`,
      },
      {
        rel: 'alternate',
        type: 'application/atom+xml',
        href: `${BASE_URL}/feed.xml`,
        title: 'Atom',
      },
    ],
    script: [
      {
        src:
          'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.2.2/lazysizes.min.js',
        async: true,
      },
    ],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#331cbf' },
  /*
   ** Global CSS
   */
  css: [
    '@/assets/styles/reset.css',
    {
      src: '~/node_modules/highlight.js/styles/hybrid.css',
      lang: 'css',
    },
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  components: true,
  buildModules: ['@nuxtjs/eslint-module', '@nuxtjs/pwa'],
  /*
   ** Nuxt.js modules
   */
  modules: [
    ['@nuxtjs/dayjs'],
    [
      '@nuxtjs/google-analytics',
      {
        id: GA_ID,
      },
    ],
    ['@nuxtjs/sitemap'],
    '@nuxtjs/feed',
    '@nuxtjs/proxy',
  ],
  dayjs: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  proxy: ['http://localhost:9000/.netlify'],
  pwa: {
    workbox: {
      offlineAssets: [
        '/images/icon_author.svg',
        '/images/icon_clock.svg',
        '/images/icon_facebook.svg',
        '/images/icon_feed.svg',
        '/images/icon_hatena.svg',
        '/images/icon_menu.svg',
        '/images/icon_quote.svg',
        '/images/icon_twitter.svg',
        '/images/icon_link.svg',
        '/images/logo.svg',
      ],
      runtimeCaching: [
        {
          urlPattern: 'https://images.microcms-assets.io/.*',
          handler: 'staleWhileRevalidate',
        },
      ],
    },
  },
  /*
   ** Build configuration
   */
  build: {
    postcss: {
      plugins: {
        'postcss-custom-properties': {
          preserve: false,
          importFrom: ['assets/styles/colors.css'],
        },
        'postcss-nested': {},
      },
    },
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
        });
      }
    },
  },
  router: {
    trailingSlash: true,
    middleware: 'redirect',
    extendRoutes(routes, resolve) {
      routes.push({
        path: '/:categoryId/',
        component: resolve(__dirname, 'pages/_categoryId/index.vue'),
        name: 'category',
      });
      routes.push({
        path: '/:categoryId/page/1/',
        redirect: '/:categoryId',
      });
      routes.push({
        path: '/:categoryId/page/:id/',
        component: resolve(__dirname, 'pages/_categoryId/index.vue'),
        name: 'category-page',
      });
      routes.push({
        path: '*',
        component: resolve(__dirname, 'pages/404.vue'),
        name: 'custom',
      });
    },
  },
  generate: {
    interval: 100,
    async routes() {
      const range = (start, end) =>
        [...Array(end - start + 1)].map((_, i) => start + i);
      const limit = 50;
      const popularArticles = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/popular-articles`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.articles;
        });

      // 詳細ページ
      const getArticles = (offset = 0) => {
        return axios
          .get(
            `https://${SERVICE_ID}.microcms.io/api/v1/articles?offset=${offset}&limit=${limit}&depth=2`,
            {
              headers: { 'X-API-KEY': API_KEY },
            }
          )
          .then(async (res) => {
            let articles = [];
            if (res.data.totalCount > offset + limit) {
              articles = await getArticles(offset + limit);
            }
            return [
              ...res.data.contents.map((content) => ({
                route: `/${content.category.id}/${content.id}/`,
                payload: { content, popularArticles },
              })),
              ...articles,
            ];
          });
      };
      const articles = await getArticles();

      // 一覧ページ
      const index = {
        route: '/articles/',
        payload: { popularArticles },
      };

      // 一覧のページング
      const pages = await axios
        .get(
          `https://${SERVICE_ID}.microcms.io/api/v1/articles?filters=id[not_equals]service[and]id[not_equals]company&limit=1&fields=id`,
          {
            headers: { 'X-API-KEY': API_KEY },
          }
        )
        .then((res) =>
          range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
            route: p === 1 ? `/articles/` : `articles/page/${p}/`,
            payload: { popularArticles },
          }))
        );

      const categories = await axios
        .get(`https://${SERVICE_ID}.microcms.io/api/v1/categories?fields=id`, {
          headers: { 'X-API-KEY': API_KEY },
        })
        .then(({ data }) => {
          return data.contents.map((content) => content.id);
        });

      // カテゴリーページ
      const categoryPages = await Promise.all(
        categories.map((category) =>
          axios
            .get(
              `https://${SERVICE_ID}.microcms.io/api/v1/articles?limit=1&fields=id&filters=category[equals]${category}`,
              {
                headers: {
                  'X-API-KEY': API_KEY,
                },
              }
            )
            .then((res) => {
              return range(1, Math.ceil(res.data.totalCount / 10)).map((p) => ({
                route: p === 1 ? `/${category}/` : `/${category}/page/${p}/`,
                payload: { popularArticles },
              }));
            })
        )
      );
      const flattenCategoryPages = [].concat.apply([], categoryPages);
      return [index, ...articles, ...pages, ...flattenCategoryPages];
    },
    dir: 'dist',
  },
  sitemap: {
    path: '/sitemap.xml',
    hostname: `${BASE_URL}`,
    exclude: ['/404'],
    gzip: true,
    trailingSlash: true,
  },
  feed: [
    {
      path: '/feed.xml',
      async create(feed) {
        feed.options = {
          title: '医療DXといえば【MEDICAL♡DX】',
          link: `${BASE_URL}/feed.xml`,
          description:
            '【MEDICAL♡DX】は医療業界のDXに特化したメディアです。医療DXの取り組み事例やサービス紹介、業界の課題などを取り上げています。医療の未来をよくするため、メディアを通じて情報発信をしてまいります。',
        };

        const posts = await axios
          .get(`https://${SERVICE_ID}.microcms.io/api/v1/articles`, {
            headers: { 'X-API-KEY': API_KEY },
          })
          .then((res) => res.data.contents);

        posts.forEach((post) => {
          feed.addItem({
            title: post.title,
            id: post.id,
            link: `${BASE_URL}/${post.category.id}/${post.id}/`,
            description: post.description,
            content: post.description,
            date: new Date(post.publishedAt || post.createdAt),
            image: post.ogimage && post.ogimage.url,
          });
        });
      },
      cacheTime: 1000 * 60 * 15,
      type: 'rss2',
    },
  ],
};
