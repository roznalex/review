const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app         : path.join(__dirname, 'resources/assets/js'),
  build       : path.join(__dirname, 'public/js'),
  node_modules: path.join(__dirname, 'node_modules'),
  styles      : path.join(__dirname, 'resources/assets/styles/main.scss')
};

const common = {
  entry  : {
    app: [
      "babel-polyfill",
      'webpack/hot/dev-server',
      PATHS.app,
      PATHS.styles
    ]
  },
  output : {
    path      : PATHS.build,
    filename  : 'bundle.js',
    publicPath: 'http://localhost:8080/'
  },
  resolve: {
    extensions        : ['', '.js', '.jsx'],
    modulesDirectories: ['resources/assets/js', 'node_modules'],
    root              : path.resolve(__dirname),
    alias             : {
      config: 'resources/assets/js/constants/config'
    }
  },
  module : {
    loaders: [
      {
        test   : /\.scss$/,
        loaders: ['style', 'css', 'sass?sourceMap&-minimize!'],
        exclude: PATHS.node_modules
      },
      {
        test   : /\.jsx?$/,
        loader : 'babel',
        query  : {
          cacheDirectory: true,
          plugins       : ['transform-decorators-legacy'],
          presets       : ['react', 'es2015', 'stage-0', 'react-hmre']
        },
        include: PATHS.app
      },
      {
        test  : /\.(png|jpg|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  }
};

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool  : 'eval-source-map',
    devServer: {
      contentBase       : PATHS.build,
      historyApiFallback: true,
      hot               : true,
      inline            : true,
      progress          : true,
      stats             : 'errors-only',
      host              : process.env.HOST,
      port              : process.env.PORT
    },
    plugins  : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        '__DEV__': true
      })
    ]
  });
}

if (TARGET === 'start-prod' || TARGET === 'build') {
  module.exports = merge(common, {
    devServer: {
      contentBase       : PATHS.build,
      historyApiFallback: true,
      hot               : false,
      inline            : true,
      progress          : true,
      stats             : 'errors-only',
      host              : process.env.HOST,
      port              : process.env.PORT
    },
    plugins  : [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings     : false,
          properties   : true,
          sequences    : true,
          dead_code    : true,
          conditionals : true,
          comparisons  : true,
          evaluate     : true,
          booleans     : true,
          unused       : true,
          loops        : true,
          hoist_funs   : true,
          cascade      : true,
          if_return    : true,
          join_vars    : true,
          drop_console : true,
          drop_debugger: true,
          unsafe       : true,
          hoist_vars   : true,
          negate_iife  : true
        },
        mangle  : {
          toplevel  : true,
          sort      : true,
          eval      : true,
          properties: true
        },
        output  : {
          space_colon: false,
          comments   : function(node, comment) {
            var text = comment.value;
            var type = comment.type;
            if (type == "comment2") {
              // multiline comment
              return /@copyright/i.test(text);
            }
          }
        }
      }),
      new webpack.optimize.DedupePlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        },
        '__DEV__'    : false
      })
    ]
  });
}
