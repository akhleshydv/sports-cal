const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './web/index.web.js',
  mode: 'development',
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            configFile: './babel.web.config.js',
          },
        },
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  resolve: {
    extensions: ['.web.js', '.js', '.jsx', '.ts', '.tsx'],
    alias: {
      'react-native$': 'react-native-web',
      'react-native/Libraries/EventEmitter/NativeEventEmitter': 'react-native-web/dist/modules/NativeEventEmitter',
      'react-native/Libraries/Components/View/ViewNativeComponent': 'react-native-web/dist/exports/View',
      'react-native-vector-icons/MaterialIcons': path.resolve(__dirname, 'web/mockIcons.js'),
      'react-native-dropdown-picker': path.resolve(__dirname, 'web/mockDropdown.js'),
      'react-native-calendars': path.resolve(__dirname, 'web/mockCalendar.js'),
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './web/index.html',
      title: 'Sports Tournament Calendar',
    }),
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};