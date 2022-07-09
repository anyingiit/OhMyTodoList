1. 关于`next`使用TypeScript
    1. 在根目录创建空`tsconfig.json`并且执行`next dev`后, `next`会自动注意到根目录下定义的`tsconfig.json`文件, 并且会自动提示需要安装的必须包
    2. 同时会在根目录创建`next-env.d.ts`文件, **你不能删除或者编辑该文件**
    3. `next`是使用`babel`处理`TypeScript`的, 并不是使用`ts-loader`, 所以根目录下的`tsconfig.json`开启了`noEmit(不输出)`模式
        1. 如果需要`ts`类型检查, 那么需要使用`tsc --watch`进行检查
    4. `tsconfig.tsbuildinfo`是啥?
        1. Typescript 编译器在第一次编译时，会生产一个可以存储编译信息的文件；编译器在二次编译时，可以根据此文件进行增量编译。
    5. 遇到`Option '--resolveJsonModule' cannot be specified without 'node' module resolution strategy.`问题
        1. 没有找到解决方案, 先注释
        2. 后记
            1. 注释了会在运行`next dev`时强制自动加上
            2. 碰巧的是, 在这之前设置了`"moduleResolution": "node"`, 然后就解决了

2. 关于`next`的默认css行为和`tailwindcss`
    1. 如果需要使用`tailwindcss`, 那么必须需要`postcss`的支持, 而`postcss`是需要手动安装的

    2. 但是实际上就算不安装`postcss`, `next`也会神奇的使用`postcss`解析css, 并且附带一些默认配置, 配置如下(主要是配置兼容的)
        ```json
        {
          "plugins": [
            "postcss-flexbugs-fixes",
            [
              "postcss-preset-env",
              {
                "autoprefixer": {
                  "flexbox": "no-2009"
                },
                "stage": 3,
                "features": {
                  "custom-properties": false
                }
              }
            ]
          ]
        }
        ```

        1. 而一旦我们自己创建了`postcss.config.js`, 以上默认配置就无效了
    3. 按照文档配置`tailwindcss`后不生效怎么办, 也没有报错
        1. 实际上是缓存导致的, 删除`.next`文件夹再运行`next dev`即可
    4. `idea`中如何智能提示`tailwindcss`的具体css内容
        1. 在出现代码提示后，按ctrl+q快捷键，就会出现css预览窗口。在点击三个点按钮，选择自动显示
3. 关于`next/image`的使用
    1. 如果是本地文件, 考虑使用`require`引入图片, 并且`next`会自动设置其宽高为实际宽高
    2. 如果是远程文件, 必须在其添加两个标签属性`width`, `height`以确定其宽高
    3. 如果图片大小不确定, 或者想要通过css控制图片大小, `必须在外侧包括一层盒子, 并且其必须为position: relative;`
4. 关于开发过程中遇到的问题
    1. `Warning: Function components cannot be given refs`
        1. 原因: 使用`<Link></Link>`组件时, 子节点不是`<a></a>`
        2. 解决: 子节点使用`<a></a>`即可, 如果有其他子节点, 请作为`<a></a>`的子节点即可
    2. `FExtra attributes from the server: control-id`
        1. 原因: 浏览器的其他插件影响的
        2. 解决: 开隐私模式即可