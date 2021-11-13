const path = require("path");
/* eslint-disable prettier/prettier */
module.exports = {
  // eslint-disable-next-line prettier/prettier
  publicPath://
    process.env.NODE_ENV === 'production' ? '' : '/',

  outputDir: //构建项目生成的目录
    process.env.NODE_ENV === 'production' ? 'dist' : 'dev-dist',

  lintOnSave: //关闭编译时候的警告
    true,
  chainWebpack: config => {
    config.module.rules.delete("svg");
    config.module.rule("svg-sprite-loader")
      .test(/\.svg$/)
      .include
      .add(path.resolve('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        SymbolId: "icon-[name]"
      })
  },

  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "./src/styles/main.scss";`
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableLegacy: true,
      runtimeOnly: false,
      compositionOnly: true,
      fullInstall: true
    }
  }
  ,  devServer: {
    proxy: {
      '/devapi': {
        target: 'http://localhost:44370',
        pathRewrite: { '^/devapi': '' },
      },
    },
  },
}
