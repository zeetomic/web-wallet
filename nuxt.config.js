export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap'}
    ],
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#92fb85' },
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    { src: '~/plugins/vue-qrcode-reader', ssr: false },
  ],
  /*
  ** Nuxt.js modules
  */
  modules: ['@nuxtjs/pwa'],
  router: {
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [/^element-ui/],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  },
  env: {
    baseUrl: 'https://api.zeetomic.com/gql',
    apiUrl: 'https://testnet-api.zeetomic.com/pub/v1'
  },
  // PWA
  icon: {
    iconSrc: '/assets/Zeetomic_Logo.png'
  },
  manifest: {
    short_name: 'zeetomic',
    name: 'zeetomic',
    start_url: '/',
    theme_color: '#15151a',
  },
}
