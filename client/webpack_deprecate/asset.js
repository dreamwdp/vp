var webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CompressionPlugin = require("compression-webpack-plugin");

const HOST = "127.0.0.1",
  PORT = "3001",
  antDir = process.platform === 'win32' ? /node_modules\\antd\\lib/ :  /node_modules\/antd\/lib/,
  FAVICON = './client/content/img/favicon.ico',
  VENDORS = [
    //'react',
    //'react-dom',
    'redux',
    'react-redux',
    'react-router',
    'react-router-redux',
    'redux-saga',
    'redux-actions',
    'immutable',
    'classnames',
    'es6-promise',
    'isomorphic-fetch',
    'js-cookie',
    'merge',
    'rc-queue-anim',
    'react-color-picker',
    'node-vibrant',
    'slideout',
  ];

var commonsChunk = new webpack.optimize.CommonsChunkPlugin({
  name: 'vendor',
  filename: 'vendor.js',
  minChunks: Infinity
});

var htmlHelper = new HtmlWebpackPlugin({
    title: 'ColorPK | Your Best Color Picker, Pal',
    template: 'client/template/index.html',
    //favicon: FAVICON,
    //hash:true,
    showErrors: false
});

var baseTemplate = {
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modulesDirectories:['node_modules',  './client/modules/']
  }
};


var loaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['@babel/preset-env','@babel/preset-react'],
            plugins: [
                '@babel/plugin-transform-runtime',
                ['import', {
                    libraryName: 'antd',
                    libraryDirectory: "lib",
                    style: true  // use less, 'css' to css build
                }]
            ]
        }
    },
  {
    test: /\.less$/,
    loader: "style!css!less",
    include: antDir

  },

  {
    test: /\.less$/,
    loader: 'style!css?module=true&localIdentName=[hash:base64:4]!less!autoprefixer-loader?{browsers:["not ie <= 8","iOS >= 7"]}',
    exclude: antDir
  },
  {
    test: /\.css$/,
    loader: "style!css?modules!autoprefixer-loader"
  },
  { test: /\.(gif|png|jpg|jpeg)($|\?)/, loader: 'url?limit=10000' },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
  { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
];



var plugins = {
  hot: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("dev")
      }
    }),
    htmlHelper,
    //commonsChunk
  ],
  watch: [
    htmlHelper,
    //commonsChunk,
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        //NODE_ENV: JSON.stringify("production"),
        NODE_ENV: JSON.stringify("dev"),
      }
    }),
  ],
  build: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mange:{
        "screw-ie8" : true
      },
      compress : {
        "screw_ie8" : true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new HtmlWebpackPlugin({
      title: 'ColorPK | Your Best Color Picker, Pal',
      template: 'client/template/index_prod.html',
      //favicon: FAVICON,
      //hash:true,
      showErrors: false
    }),
    new CompressionPlugin({
      asset: "[path]",
      algorithm: "gzip",
      test: /\.js$/,
    }),
    commonsChunk,
  ],
  build1: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      mange:{
        "screw-ie8" : true
      },
      compress : {
        "screw_ie8" : true,
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
  ]
};

var entry = {
  hot:[
    'webpack-dev-server/client?http://' + HOST + ':' + PORT,
    'webpack/hot/only-dev-server',
    './client/entry/index.jsx'
  ],
  watch: './client/entry/index.jsx',
  build:{
    app: './client/entry/index_prod.jsx',
    vendor: VENDORS
  }
};


module.exports = {
  loaders: loaders,
  plugins: function(mode){
      return plugins[mode]
  },
  entry: function(mode){
      return entry[mode];
  },
  template: baseTemplate,
  constant: {
    port: PORT,
    host: HOST
  }
};
