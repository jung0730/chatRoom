const path = require('path')
const resolve = (dir) => path.resolve(__dirname, `src/${dir}`)

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  chainWebpack: (config) => {
    config.module.rules.delete('svg')
    config.module
    .rule('images')
    .test(/\.(png|svg)$/)
    .include.add(resolve('assets/img'))
    .end()
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, { limit: 15360 }))
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: `
        @import "~@/sass/variables.scss";
        `
      }
    }
  }
}
