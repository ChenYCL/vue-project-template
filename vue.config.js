const path = require("path");
const debug = process.env.NODE_ENV !== "production";
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin; //Webpack包文件分析器
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

const resolve = dir => {
    return path.join(__dirname, "./", dir);
};

// cdn预加载使用
const externals = {
    "vue": "Vue",
    "vue-router": "VueRouter",
    "vuex": "Vuex",
    "axios": "axios",
    "@antv/g2":'G2'
};

const cdn = {
    // 开发环境
    dev: {
        css: [
            // "https://unpkg.com/element-ui/lib/theme-chalk/index.css"
            //   "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css"
        ],
        js: []
    },
    // 生产环境
    build: {
        css: [
            //   "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
            //   "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css"
        ],
        js: [
            "https://cdn.bootcss.com/vue/2.5.21/vue.min.js",
            "https://cdn.bootcss.com/vue-router/3.0.2/vue-router.min.js",
            "https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js",
            "https://cdn.bootcss.com/axios/0.18.0/axios.min.js",
            "https://gw.alipayobjects.com/os/lib/antv/g2/3.4.10/dist/g2.min.js"
            //   "https://unpkg.com/element-ui/lib/index.js",
            //   "https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js",
            //   "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js"
        ]
    }
};

module.exports = {
    publicPath: !debug ? "./" : "./", // 根域上下文目录
    outputDir: "dist",
    assetsDir: !debug ? "static" : "static",
    lintOnSave: false, // 是否开啓eslint保存检测
    runtimeCompiler: true, // 运行时版本是否需要编译
    transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
    productionSourceMap: false, // 是否在构建生产包时生成 sourceMap 文件
    configureWebpack: config => {
        // webpack配置，值位对象时会合并配置，爲方法时会改写配置
        if (debug) {
            // 开发环境配置
            config.devtool = "cheap-module-eval-source-map";
            config.devServer = {
                disableHostCheck: true
            };
        } else {
            // 生产环境配置
            config.externals = externals; // npm包转cdn
            config.entry.app = ["babel-polyfill", "./src/main.js"];
            //  构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
            let pluginsPro = [
                new CompressionWebpackPlugin({
                    compressionOptions: {
                        numiterations: 15
                    },
                    test: productionGzipExtensions,
                    threshold: 8192, //达到10kb的静态文件进行压缩 按字节计算
                    minRatio: 0.8, //只有压缩率比这个值小的资源才会被处理
                    deleteOriginalAssets: false //使用删除压缩的源文件
                }),
                new BundleAnalyzerPlugin({
                    analyzerPort: 8889
                })
            ];
            config.plugins = [...config.plugins, ...pluginsPro];
        }

    },
    chainWebpack: config => {
        // webpack链接API，用于生成和修改webapck配置，
        if (debug) {
            // 本地开发配置
        } else {
            // 生产开发配置
            config.optimization.minimize(true);
            config.optimization.splitChunks({
                chunks: "all"
            });
        }
        config.resolve.alias
            .set('@', resolve('src'))
            .set('assets', resolve('src/assets'))
            .set('components', resolve('src/components'))
            .set('utils', resolve('src/utils'))
            .set('static', resolve('src/static'))
            .set('views', resolve('src/views'));

        config.module
            .rule('images')
            .use('url-loader')
            .loader('url-loader')
            .tap(options => Object.assign(options, {limit: 10240}))

        // config.module
        //     .rule('images')
        //     .use('image-webpack-loader')
        //     .loader('image-webpack-loader')
        //     .options({
        //         bypassOnDebug: true
        //     })
        //     .end()


        /**
         * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
         */
        config.plugin("html").tap(args => {
            if (!debug) {
                args[0].cdn = cdn.build;
            }
            if (debug) {
                console.log(args);
                args[0].cdn = cdn.dev;
            }
            return args;
        });

    },
    parallel: require("os").cpus().length > 1, // 构建时开啓多进程处理babel编译
    pluginOptions: {
        // 第三方插件配置
    },
    css: {
        modules: false,
        extract: true,
        sourceMap: false,
        // css预设器配置项
        loaderOptions: {
            sass: {
                data: `
                  @import 'assets/scss/variable.scss';
                  @import 'assets/scss/common.scss';
                  @import 'assets/scss/reset.scss';
              `
                // publicPath:'../../'
            }
        }
    },
    pwa: {
        // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
    },
    devServer: {
        proxy: {
            // 配置跨域
            "/api": {
                target: "http://xx.com/",
                // target: 'http://106.75.154.119:9000/',
                secure: false,
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            },
            "/home/": {
                target: "http://xx.com/",
                // target: 'http://106.75.154.119:9000/',
                secure: false,
                changeOrigin: true,
                ws: true,
                pathRewrite: {}
            }
        }
    }
};
