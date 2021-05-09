module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    proxy: {
      '/api': {
        target: 'http://104.214.48.227:8080/api/',
        pathRewrite: { '^/api': ''},
        changeOrigin: true,
        ws: true,
        headers: { 'X-Request-UID': 'fe4b814c-0c4f-44d5-b3e5-c6a38cc0cba6'}
      }
    }
  }
}
