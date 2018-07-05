import path from 'path'
import packagejson from "./package.json"

export default {
  entry: path.resolve(__dirname, 'src', 'js') + '/index.jsx',

  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },

  output: {
    // output path は gulpfile の dest() で指定
    // path: path.resolve(__dirname, 'public', 'js'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      // es2015 jsx react [need]: babel-loader babel-core && babel-presets...
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          // options: {presets: ['es2015', 'react']}
          options: packagejson.babel
        }],
      },
      // sass [need]: style-loader, css-loader, sass-loader, node-sass
      // {
      //   test: /\.(scss|sass|css)$/,
      //   use: [{
      //     loader: "style-loader" // creates style nodes from JS strings
      //   }, {
      //     loader: "css-loader", // translates CSS into CommonJS
      //     options: {
      //       sourceMap: true,
      //     }
      //   }, {
      //     loader: "sass-loader", // compiles Sass to CSS
      //     options: {
      //       sourceMap: true,
      //     }
      //   }]
      // },
      // img [need]: url-loader, file-loader
      // {
      //   test: /\.(gif|png|jpg|eot|wof|woff|ttf|svg)$/,
      //   // 画像をBase64として取り込む
      //   loader: 'url-loader'
      // },
    ],
  },

  plugins: []
}
