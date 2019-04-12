module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/assets/scss/_variables.scss";
          @import "@/assets/scss/_bootstrap-custom.scss";
          @import "@/assets/scss/_mixins.scss";
        `
      }
    }
  },
  publicPath: '/',
  pwa: {
    name: 'YA Frontend',
    themeColor: '#10090c',
    msTileColor: '#10090c',
    orientation: 'portrait',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    clientsClaim: true,
    skipWaiting: true,

    // configure the workbox plugin
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      importScripts: ['https://cdn.jsdelivr.net/npm/idb@2.1.3/lib/idb.min.js'],
      swSrc: 'src/service-worker.js'
    }
  }
}
