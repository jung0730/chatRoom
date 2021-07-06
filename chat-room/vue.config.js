const path = require('path')
const resolve = (dir) => path.resolve(__dirname, `src/${dir}`)

module.exports = {
  publicPath: '/',
  productionSourceMap: false,
  transpileDependencies: ['vuetify'],
  css: {
    sourceMap: false
  },
  chainWebpack: (config) => {
  config.module
    .rule('images')
    .test(/\.svg$/)
    .include.add(resolve('assets'))
    .end()
    .use('url-loader')
    .loader('url-loader')
    .tap(options => Object.assign(options, { limit: 15360 }))
  }
}
