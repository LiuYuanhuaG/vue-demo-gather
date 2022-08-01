# vue-demo-gather

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

##### 部署到GitHub

1. 在vue.config.js 文件中配置publicPath

   ```js
   module.exports = {
     publicPath: process.env.NODE_ENV === 'production'
       ? '/my-project/'
       : '/'
   }
   ```

   

2. 添加deploy.sh 文件

   ```sh
   #!/usr/bin/env sh
   
   # 确保脚本抛出遇到的错误
   set -e
   
   # 删除旧的文件
   rm -rf dist
   
   rm -rf ./src/views/.DS_Store
   
   # 生成新的压缩文件
   yarn build
   
   # 进入生成的文件夹
   cd dist
   
   # 复制一个 index.html并命名为 404.html 解决 historyAPI 404问题
   cp index.html 404.html
   
   # 如果是发布到自定义域名
   # echo 'www.example.com' > CNAME
   
   git init
   git add -A
   git commit -m 'deploy'
   
   # 一下都可以使用两种方法 http  ssh（需要配置ssh密匙） 
   # 如果发布到 https://<USERNAME>.github.io
   # git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master
   
   # 如果发布到 https://<USERNAME>.github.io/<REPO>
   git push -f https://github.com/LiuYuanhuaG/vue-demo-gather.git master:gh-pages
   cd -
   ```

   

3. 执行 deploy.sh

   如果在window 下 则用git Bash 执行该文件

   ![2022-08-01-134026](./Markdown/2022-08-01-134026.png)

   或者在git Bash 命令行中键入

   ```
   sh deploy.sh 
   ```

   

4. 在GitHub项目 setting中配置

   ![image-20220801133315836](./Markdown/image-20220801133315836.png)