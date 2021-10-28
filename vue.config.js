/* eslint-disable prettier/prettier */
module.exports={
    // eslint-disable-next-line prettier/prettier
    publicPath://
        process.env.NODE_ENV === 'production' ? '': '/',
    outputDir: //构建项目生成的目录
        process.env.NODE_ENV === 'production'? 'dist': 'dev-dist',
    lintOnSave: //关闭编译时候的警告
        true,
        css: {
            loaderOptions: {             
              scss: {
                prependData: `@import "./src/styles/main.scss";`
              }
            }
          }
}