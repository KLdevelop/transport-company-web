import path from 'path';
import { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import FaviconsWebpackPlugin from 'favicons-webpack-plugin';

export interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const isDev = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  mode: isDev ? 'development' : 'production',
  target: 'web',
  entry: path.resolve(__dirname, '../src', 'index.tsx'),
  output: {
    filename: isDev ? '[name].bundle.js' : '[name].[fullhash:8].js',
    chunkFilename: isDev ? '[name].chunk.js' : '[name].[fullhash:8].chunk.js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
    modules: ['src', 'node_modules'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, '../tsconfig.json'),
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.css', '.scss', '.json'],
      }) as never,
    ],
  },
  module: {
    rules: [
      {
        test: /\.html/,
        use: ['html-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public', 'index.html'),
      publicPath: './',
      minify: {
        removeComments: !isDev,
        collapseWhitespace: !isDev,
      },
      meta: {
        viewport:
          'width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0',
      },
    }),
    new ForkTsCheckerWebpackPlugin({
      devServer: isDev,
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx'],
    }),
    // new FaviconsWebpackPlugin(path.resolve(__dirname, '../src/assets/logo/logo.png')),
  ],
  performance: {
    hints: false,
  },
  stats: {
    modules: false,
  },
};

export default config;
