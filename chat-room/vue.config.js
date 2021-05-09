module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://104.214.48.227:8080/api/',
        pathRewrite: { '^/api': ''},
        changeOrigin: true,
        ws: true
      }
    }
  }
}
