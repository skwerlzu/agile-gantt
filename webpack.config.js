const path = require('path');
const { VueLoaderPlugin } = require('vue-loader');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = [
  {
    mode: 'production',
    entry: './src/bundle.js',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js'
    },
    devtool: 'source-map',
    externals: {
      vue: 'Vue'
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
    optimization: {
      minimize: true,
      namedModules: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false
          }
        })
      ]
    },
    /*resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js'
      }
    },*/
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  },
  {
    mode: 'production',
    optimization: {
      minimize: false,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false
          }
        })
      ]
    },
    entry: './src/AgileGantt.vue',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'AgileGantt.umd.js',
      library: 'AgileGantt',
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    devtool: 'source-map',
    externals: {
      vue: 'Vue'
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  },
  {
    mode: 'production',
    optimization: {
      minimize: true,
      namedModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false
          }
        })
      ]
    },
    entry: './src/AgileGantt.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'AgileGantt.umd.min.js',
      library: 'AgileGantt',
      libraryTarget: 'umd',
      libraryExport: 'default'
    },
    externals: {
      vue: 'Vue'
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  },
  {
    mode: 'production',
    optimization: {
      minimize: false
    },
    entry: './src/AgileGantt.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'AgileGantt.common.js',
      library: 'AgileGantt',
      libraryTarget: 'commonjs2',
      libraryExport: 'default'
    },
    externals: {
      vue: 'Vue'
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  },
  {
    mode: 'production',
    optimization: {
      minimize: true,
      namedModules: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            mangle: false
          }
        })
      ]
    },
    entry: './src/AgileGantt.vue',
    devtool: 'source-map',
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'AgileGantt.common.min.js',
      library: 'AgileGantt',
      libraryTarget: 'commonjs2',
      libraryExport: 'default'
    },
    externals: {
      vue: 'Vue'
      //vuex: 'Vuex'
      //dayjs: 'dayjs'
    },
    module: {
      rules: [
        {
          test: /\.vue$/,
          use: 'vue-loader'
        },
        {
          test: /\.css$/,
          use: ['vue-style-loader', 'css-loader']
        }
      ]
    },
    plugins: [new VueLoaderPlugin()]
  }
];
