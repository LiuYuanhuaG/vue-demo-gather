const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false, //关闭eslint 报错不影响编译 可选
  devServer: {
    open: true
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-demo-gather/'
    : '/'
})
