// var bodyParser = require('body-parser')

module.exports = {
  transpileDependencies: ["vuetify"],
  devServer: {
    // before(app) {
    //   app.use(bodyParser.json());
    //   app.use(bodyParser.urlencoded({ extended: false }))
    // },
    proxy: {
      '/api': {
        target: 'http://104.214.48.227:8080/api/',
        pathRewrite: { '^/api': ''},
        changeOrigin: true,
        ws: true, 
        // onProxyReq: function(proxyReq, req, res) {
        //   proxyReq.setHeader('X-Request-UID', 'fe4b814c-0c4f-44d5-b3e5-c6a38cc0cba6')
        //   if (req.body) {
        //     let bodyData = JSON.stringify(req.body)
        //     // incase if content-type is application/x-www-form-urlencoded -> we need to change to application/json
        //     proxyReq.setHeader('Content-Type','application/json')
        //     proxyReq.setHeader('Content-Length', Buffer.byteLength(bodyData))
        //     // stream the content
        //     proxyReq.write(bodyData)
        //     console.log(bodyData, 'bodyData')
        //     proxyReq.end()
        //   }
        // }
      }
    }
  }
}
