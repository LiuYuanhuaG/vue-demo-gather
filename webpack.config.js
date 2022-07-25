const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver, AntDesignVueResolver } = require('unplugin-vue-components/resolvers')// 添加ant 与element puls的 自动导入

module.exports = {
  // ...
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver(), AntDesignVueResolver()],
    }),
  ],
}