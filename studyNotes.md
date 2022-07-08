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