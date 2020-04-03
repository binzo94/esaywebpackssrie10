
module.exports = {
  devtool: 'eval',
  entry: {
    include: ['app/web/page'],
    exclude: ['app/web/page/[a-z]+/component', 'app/web/page/test'],
    loader: {
      client: 'app/web/framework/entry/client-loader.js',
      server: 'app/web/framework/entry/server-loader.js'
    }
  },
  dll: ['react', 'react-dom'],
  loaders: {
    eslint: false
  },

  plugins:{
    copy: [{
      from: 'app/web/asset/js/polyfill.js',
      to: 'asset/js/polyfill.js'
    }]
  },

  done() {
    console.log('---webpack compile finish---');
  }
};
