const path = require('path')
const common = require('./webpack.common')
const { merge } = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');





module.exports = merge(common, {
  mode: 'production',

  output: {
    filename: "[name].[contenthash].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader

          },

          {
            loader: 'css-loader'
          },

          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          },


        ],
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  },
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line

      new CssMinimizerPlugin(),
      new TerserPlugin()
    ],
  },

  plugins: [new MiniCssExtractPlugin({ filename: "[name].[contenthash].css" }), new HtmlWebpackPlugin({
    template: './src/template.html',
    minify: {
      removeComments:true,
      removeAttributeQuotes:true,
      collapseWhitespace:true,
      removeEmptyAttributes:true
    }

  })]



});