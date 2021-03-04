const path = require('path')
const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const themeVars = require('./themeVars')

module.exports = function (options) {
  const {
    context,
    entry,
    output,
    mode,
    watch,
    externals,
    resolveModules,
    htmlTemplatePath,
    htmlTemplateData = {
      meta: {},
    },
    definePlugin = {},
  } = options
  const isDevelopment = mode !== 'production'
  let plugins = [
    new HtmlWebpackPlugin({
      template: htmlTemplatePath,
      filename: 'index.html',
      cache: false,
      templateParameters: htmlTemplateData,
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[contenthash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[contenthash].css',
    }),
    new webpack.DefinePlugin(
      Object.assign(
        {
          'process.env.isMiniprogram': false, // 注入环境变量，用于业务代码判断
          'process.env.SSR': false,
        },
        definePlugin
      )
    ),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../assets'),
          to: '.',
          noErrorOnMissing: true,
        },
      ],
    }),
  ]
  if (isDevelopment) {
    plugins.concat([new HardSourceWebpackPlugin()])
  } else {
    plugins = plugins.concat([
      new webpack.HashedModuleIdsPlugin({
        hashFunction: 'sha256',
        hashDigest: 'hex',
        hashDigestLength: 20,
      }),
      new webpack.EnvironmentPlugin({
        SSR: false,
        WEBPACK_ENV: 'production',
      }),
    ])
  }
  return {
    context,
    entry,
    mode,
    watch,
    output,
    externals,
    cache: {
      type: 'memory',
    },
    devtool: isDevelopment ? 'eval-source-map' : false,
    resolve: {
      extensions: ['.js', '.jsx', '.tsx', '.json', '.scss', '.css'],
      modules: [...resolveModules],
      symlinks: false,
      cacheWithContext: false,
      alias: {
        '@': path.resolve(__dirname, '../src'),
        // react: 'preact/compat',
        // 'react-dom/test-utils': 'preact/test-utils',
        // 'react-dom': 'preact/compat',
      },
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          exclude: /node_modules|gsd-kbone-react/,
          options: {
            compact: false,
            cacheDirectory: true,
            cwd: context,
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    esmodules: true,
                  },
                },
              ],
              '@babel/preset-react',
            ],
            plugins: [
              [
                'babel-plugin-import',
                {
                  libraryName: '@govcloud/gsd-kbone-react',
                  libraryDirectory: 'lib/components',
                  camel2DashComponentName: false,
                },
              ],
              '@babel/plugin-proposal-class-properties',
              ['@babel/plugin-proposal-decorators', { legacy: true }],
              '@babel/plugin-proposal-export-default-from',
              ['@babel/plugin-transform-modules-commonjs', { noInterop: true }],
              '@babel/plugin-proposal-export-namespace-from',
              '@babel/plugin-proposal-optional-chaining',
              '@babel/plugin-proposal-partial-application',
              [
                '@babel/plugin-proposal-pipeline-operator',
                { proposal: 'minimal' },
              ],
            ].filter(Boolean),
          },
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => {
                  return [
                    require('postcss-pxtorem')({
                      rootValue: 14,
                      propList: ['*'],
                      // todo
                      selectorBlackList: ['.weui-picker__indicator'],
                    }),
                  ]
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('dart-sass'),
              },
            },
          ],
        },
        {
          test: /\.(css|less)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                modules: false,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                plugins: (loader) => [
                  require('postcss-pxtorem')({
                    rootValue: 14,
                    propList: ['*'],
                    // todo
                    selectorBlackList: ['.weui-picker__indicator'],
                  }),
                ],
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: themeVars,
                },
              },
            },
          ],
        },
        {
          test: /\.(jpe?g|png|gif|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          loader: 'base64-inline-loader',
        },
      ],
    },
    plugins,
    optimization: true
      ? {
          minimize: false,
          removeAvailableModules: false,
          removeEmptyChunks: false,
          splitChunks: false,
        }
      : {
          minimizer: [
            new TerserPlugin({
              test: /\.js(\?.*)?$/i,
              cache: true,
              parallel: true,
              sourceMap: true,
              terserOptions: {
                compress: {
                  // eslint-disable-next-line @typescript-eslint/camelcase
                  drop_console: false,
                },
              },
            }),
          ],
          splitChunks: {
            cacheGroups: {
              commons: {
                test: /[\\/]node_modules[\\/]/,
                // cacheGroupKey here is `commons` as the key of the cacheGroup
                name(module, chunks, cacheGroupKey) {
                  const { name: moduleFileName } = path
                    .parse(module.identifier())
                    .reduceRight((item) => item)
                  const allChunksNames = chunks
                    .map((item) => item.name)
                    .join('~')
                  return `${cacheGroupKey}-${allChunksNames}-${moduleFileName}`
                },
                chunks: 'all',
              },
            },
          },
        },
  }
}
