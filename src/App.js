import React from 'react';
import { renderRoutes } from 'react-router-config';//renderRoutes 读取路由配置转化为 Route 标签
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import './App.css';
import { GlobalStyle } from  './style';
import { IconStyle } from "./assets/iconfont/iconfont";
import routes from './routes/index.js';
// import store from './store';
import store from './store/createStore';
// import logo from './logo.svg';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        { renderRoutes(routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
