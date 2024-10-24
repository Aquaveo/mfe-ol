const path = require('path');
const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Set the mode to 'development' or 'production' as needed
  entry: path.resolve(__dirname, '../src/index.js'), // Adjusted entry path
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'), // Output directory adjusted
    publicPath: 'http://localhost:3000/', // Set the public path for assets
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
      {
        test: /\.(jpe?g|png|gif|svg|mp4|mp3)$/,
        type: 'asset/resource', // Use asset modules instead of file-loader
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
        react: {
          singleton: true,
          requiredVersion: '^17.0.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^17.0.0',
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../src/index.html'), // Adjusted template path
    }),
    new Dotenv(), // Include dotenv plugin if needed
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: path.resolve(__dirname, '../public'), // Updated for Webpack 5
    port: 3000,
    open: true,
    hot: true, // Enable hot module replacement
    historyApiFallback: true, // For SPA routing
  },
};
