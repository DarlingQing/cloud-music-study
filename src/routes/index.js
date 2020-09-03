//routes/index.js

import React from 'react';
import { Redirect } from 'react-router-dom';
import Home from '../application/Home';
import Recommend from '../application/Recommend';
import Singers from '../application/Singers';
import Singer from '../application/Singer';
import Rank from '../application/Rank';
import Album from '../application/Album';
import Demo from '../application/Demo/index';
import UseMemoDemo from '../application/Demo/useMemo';

export default [
  {
    path: "/",
    component: Home,
    routes: [
      {
        path: "/",
        exact: true,
        render: () => (
          <Redirect to={"/recommend"}/>
        )
      },
      // Demo，关于react相关的学习demo案例
      {
        path: "/demo",
        component: Demo,
        routes: [{
          path: '/demo/UseMemoDemo',
          component: UseMemoDemo,
        }]
      },
      // 推荐页
      {
        path: "/recommend",
        component: Recommend,
        // 推荐详情页
        routes: [{
          path: '/recommend/:id',
          component: Album,
        }],
      },
      // 歌手页面
      {
        path: "/singers",
        component: Singers,
        routes: [{
          path: '/singers/:id',
          component: Singer,
        }],
      },
      // 排行榜页面
      {
        path: "/rank",
        component: Rank,
        routes: [{
          path: "/rank/:id",
          component: Album
        }]
      }
    ]
  }
]