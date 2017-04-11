const { resolve } = require('path');
const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');
const SassPlugin = require('sass-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const isProd = process.env.NODE_ENV === 'production';

const config = {
  title: 'webpack-on-rails',
  port: 3000,
  src: (...rest) => resolve('.', 'src', ...rest),
  out: (...rest) => resolve('.', 'dist', ...rest),
  rule: (custom) => Object.assign({ test: /\.js$/, exclude: /node_modules/ }, custom)
};

var entry = [];
var plugins = [];

if(isProd) {
  plugins.push(
    new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
    new webpack.DefinePlugin({
      'process.env': { 'NODE_ENV': JSON.stringify('production') }
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, mangle: { screw_ie8: true, keep_fnames: true },
      compress: { screw_ie8: true }, comments: false
    })
  );
} else {
  entry.push(
    'react-hot-loader/patch',
    `webpack-dev-server/client?http://localhost:${config.port}`,
    'webpack/hot/only-dev-server'
  );
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new VisualizerPlugin()
  );
}

entry.push(config.src('js', 'index.js'));
plugins.push(
  new HTMLPlugin({
    inject: false,
    hash: isProd,
    template: require('html-webpack-template'),
    // template config
    title: config.title,
    favicon: config.src('favicon.png'),
    appMountId: 'app',
    links: ['/index.css']
  }),
  new SassPlugin(config.src('css', 'index.scss'), process.env.NODE_ENV),
  new CopyPlugin([{ context: config.src(), from: 'assets', to: 'assets' }])
);

module.exports = {
  entry: entry,
  output: {
    filename: 'index.[hash].js',
    path: config.out(),
    publicPath: '/'
  },
  plugins: plugins,
  module: {
    rules: [
      config.rule({
        enforce: 'pre',
        use: {
          loader: 'eslint-loader',
          options: { fix: true, cache: true, emitError: true}
        }
      }),
      config.rule({
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', {'modules': false}],
              'react'
            ],
            plugins: ['react-hot-loader/babel']
          }
        }
      })
    ]
  },
  devtool: (isProd ? false : 'inline-source-map'),
  devServer: {
    hot: true,
    port: config.port,
    stats: 'minimal',
    historyApiFallback: true,
    staticOptions: { extensions: ['html'] },
    contentBase: config.out(),
  }
}
