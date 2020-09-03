import React, { useState, useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch, useSelector } from 'react-redux';
import HorizontalItem from '../../baseUI/HorizontalItem';
import Scroll from '../../baseUI/Scroll';
import Loading from '../../baseUI/Loading/index';
import { categoryTypes, alphaTypes } from '../../api/config';
import { actions } from '../../store/reducers/singers';
import './index.css';

function Singers(props) {
  const dispatch = useDispatch();
  const singersActions = actions.singers;
  
  const {
    singerList,
    enterLoading,
    pullUpLoading,
    pullDownLoading,
    pageCount,
  } = useSelector(({ singers }) => ({
    singerList: singers.singerList,
    enterLoading: singers.enterLoading,
    pullUpLoading: singers.pullUpLoading,
    pullDownLoading: singers.pullDownLoading,
    pageCount: singers.pageCount,
  }));

  // 分类
  const [category, setCategory] = useState('');
  // 首字母
  const [alpha, setAlpha] = useState('');


  useEffect(() => {
    dispatch(singersActions.getHotSingerList(0));
  // eslint-disable-next-line
  }, []);

  // 滑到最底部刷新部分的处理
  const pullUpRefreshDispatch = (category, alpha, hot, page) => {
    dispatch(singersActions.changePullDownLoading(true));
    dispatch(singersActions.changePageCount(page + 1));
    if (hot) {
      dispatch(singersActions.refreshMoreHotSingerList(0));
    } else {
      dispatch(singersActions.refreshMoreSingerList(category, alpha, pageCount));
    }
  }

  // 顶部下拉刷新
  const pullDownRefreshDispatch = (category, alpha) => {
    dispatch(singersActions.changePullDownLoading(true));
    if(category === '' && alpha === ''){
      dispatch(singersActions.getHotSingerList(0));
    } else {
      dispatch(singersActions.getSingerList(category, alpha, 0));
    }
  }
  
  const updateDispatch = (category, alpha) => {
    dispatch(singersActions.changePageCount(0));
    // TODO loading是不是可以不放在redux中
    dispatch(singersActions.changeEnterLoading(true));
    dispatch(singersActions.getSingerList(category, alpha, 0));
  };

  const handleUpdateCatogory = (val) => {
    setCategory(val);
    updateDispatch(val, alpha);
  };

  const handleUpdateAlpha = (val) => {
    setAlpha(val);
    updateDispatch(category, val);
  };

  const handlePullUp = () => {
    pullUpRefreshDispatch(category, alpha, category === '', pageCount);
  };

  const handlePullDown = () => {
    pullDownRefreshDispatch(category, alpha);
  }

  const enterDetail = (id) => {
    console.log(111, id);
    props.history.push(`/singers/${id}`);
  };

  // 渲染函数，返回歌手列表
  const renderSingerList = () => {
    return (
      <div className="Singers-list">
        {
          singerList && singerList.map((item, index) => {
            return (
              <div
                onClick={() => enterDetail(item.id)}
                key={`${item.accountId}${index}`}
                className="Singers-list-item"
              >
                <div className="Singers-list-item-imgWrapper">
                  <img src={`${item.picUrl}?param=300x300`} width="100%" height="100%" alt="music"/>
                </div>
                <span className="Singers-list-item-name">{item.name}</span>
              </div>
            )
          })
        }
      </div>
    )
  };

  return (
    <div className="Singers">
      <div className="Singers-nav-container"> 
        <HorizontalItem list={categoryTypes} title={"分类 (默认热门):"} handleClick={handleUpdateCatogory} oldVal={category} />
        <HorizontalItem list={alphaTypes} title={"首字母:"} handleClick={handleUpdateAlpha} oldVal={alpha} />
      </div>
      <div className="Singers-list-container">
        <Scroll
          pullUp={ handlePullUp }
          pullDown = { handlePullDown }
          pullUpLoading = { pullUpLoading }
          pullDownLoading = { pullDownLoading }
        >
          { renderSingerList() }
        </Scroll>
        { enterLoading ? <Loading /> : null }
        { renderRoutes(props.route.routes) }
      </div>
    </div>
  )
}

export default React.memo(Singers);
