const AutoImport = require("unplugin-auto-import/webpack")
const Components = require("unplugin-vue-components/webpack")
const { ElementPlusResolver, AntDesignVueResolver } = require("unplugin-vue-components/resolvers") // 添加ant 与element puls的 自动导入

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
      "import",
      {
        libraryName: "ant-design-vue",
        libraryDirectory: "lib",
        style: "css", // `style: true` 会加载 less 文件
      },
    ],

  ],
}

