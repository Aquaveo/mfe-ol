const { ModuleFederationPlugin } = require('webpack').container;
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: 'http://localhost:3000/', // Set the public path for assets
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
    new Dotenv({
      path: '.env',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true, // Enable hot module replacement
  },
};
