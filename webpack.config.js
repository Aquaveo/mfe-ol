const { ModuleFederationPlugin } = require('webpack').container;
// const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    libraryTarget: "commonjs2",
    publicPath: "http://localhost:3000/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Matches .js and .jsx files
        exclude: /node_modules/,
        use: 'babel-loader', // Simplified loader syntax
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'], // Loaders for CSS files
      },
      {
        test: /\.(scss|sass)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'], // Loaders for SCSS/SASS files
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'mfe_ol',
      filename: 'remoteEntry.js',
      exposes: {
        './Map': './src/App', // Adjusted path to exposed module
      },
      shared: {
        'react': {
          singleton: true,
          requiredVersion: '^18.3.1',
          eager: true,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.3.1',
          eager: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true, // Enable hot module replacement
  },
};
