import { type Configuration } from 'webpack'
import { ESBuildMinifyPlugin } from 'esbuild-loader'
import * as fs from 'fs'
import * as path from 'path'

let env: ("development" | "production") = process.env.NODE_ENV as ("development" | "production")

!env && (env = 'development')

const config: Configuration = {
  mode: env,

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@cfg': path.resolve(__dirname, 'cfg'),
    },
    extensions: ['.ts','.js'],
  },

  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `${env}.js`,
  },

  optimization: {
    minimizer: [
      new ESBuildMinifyPlugin({
        target: 'es2015',
        banner: fs
          .readFileSync(path.resolve(__dirname, './src/header.ts'), 'utf-8')
          .replace(/(==\/UserScript==)[\s\S]+$/, '$1'),
      }),
    ],
  },

  module: {
    rules: [
      {
        test: /\.(ts)$/i,
        loader: 'esbuild-loader',
        options: {
          loader: 'ts',
          target: 'es2015',
        },
      },
    ],
  },
}

export default config
