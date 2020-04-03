module.exports = function () {
  this.cacheable();
  return `
  import React from 'react';
  import ReactDom from 'react-dom';

  import Entry from '${this.resourcePath.replace(/\\/g, '\\\\')}';
  const state = window.__INITIAL_STATE__;
  const render = (App)=>{
    
    const root = document.getElementById('app');
    const renderMode = root.children.length ? 'hydrate' : 'render';
    ReactDom[renderMode](EASY_ENV_IS_DEV ? <App {...state} /> : <App {...state} />, root);
  };

  if (EASY_ENV_IS_DEV && module.hot) {
    module.hot.accept('${this.resourcePath.replace(/\\/g, '\\\\')}', () => { render(Entry) });
  }
  render(Entry);
`;
};
