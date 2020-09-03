import React from 'react';
import { renderRoutes } from "react-router-config";
// 利用 Link 组件进行路由跳转 https://reacttraining.com/react-router/web/guides/quick-start
import { Link } from 'react-router-dom';
import {
  Top,
  Tab,
  TabItem,
  Buoy,
} from './style';

function Home(props) {
  const { route } = props;

  return (
    <div>
      <Buoy><Link to="/demo" className="Buoy">Demo</Link></Buoy>
      <Top>
        <span className="iconfont menu">&#xe65c;</span>
        <span className="title">WebApp</span>
        <span className="iconfont search">&#xe62b;</span>
      </Top>
      <Tab>
        <Link to="/recommend" className="selected"><TabItem><span > 推荐 </span></TabItem></Link>
        <Link to="/singers" className="selected"><TabItem><span > 歌手 </span></TabItem></Link>
        <Link to="/rank" className="selected"><TabItem><span > 排行榜 </span></TabItem></Link>
      </Tab>
      { renderRoutes(route.routes) }
    </div>
  )
}

export default React.memo(Home);