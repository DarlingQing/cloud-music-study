import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Container,
  TopDesc,
  Menu,
  SongList,
  SongItem,
} from './style';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import Header from './../../baseUI/Header';
import Scroll from '../../baseUI/Scroll';
import Loading from '../../baseUI/Loading/index';
import { getCount, getName, isEmptyObject } from '../../api/util';
import { actions } from '../../store/reducers/album';
import style from "../../assets/global-style";

const HEADER_HEIGHT = 45;

function Album (props) {
  const { match: { params }} = props;
  const dispatch = useDispatch();
  const ablumActions = actions.album;

  const {
    currentAlbum,
    enterLoading,
  } = useSelector(({ album }) => ({
    currentAlbum: album.currentAlbum,
    enterLoading: album.enterLoading,
  }))

  const [showStatus, setShowStatus] = useState(true);
  // 是否跑马灯
  const [isMarquee, setIsMarquee] = useState(false);
  const [title, setTitle] = useState("歌单");
  
  const headerEl = useRef();
  // const id = props.match.params.id;

  useEffect(() => {
    dispatch(ablumActions.getAlbumDetail(params.id));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const handleBack = () => {
  //   setShowStatus(false);
  // };

  // 传给子组件的函数用useCallBack包裹，避免父组件每次执行会生成不一样的handleBack，不然子组件每一次memo的结果都会不一样
  const handleBack = useCallback(() => {
    setShowStatus(false);
    // 放在这里，动画不会有，路由变化，当前组件会被立即卸载，相关动画就不会有，放在onExited中，先切除动画执行一次，动画执行完瞬间跳转路由，
    // props.history.goBack()
  }, []);

  // 头部header部分处理
  const handleScroll = useCallback((pos) => {
    const minScrollY = -HEADER_HEIGHT;
    let percent = Math.abs(pos.y / minScrollY);
    const headerDom = headerEl.current;
    if (pos.y < minScrollY) {
      headerDom.style.backgroundColor = style["theme-color"];
      headerDom.style.opacity = Math.min(1, (percent - 1) / 2);
      setTitle(currentAlbum.name);
      setIsMarquee(true);
    } else {
      headerDom.style.background = "";
      headerDom.style.opacity = 1;
      setTitle("歌单");
      setIsMarquee(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  
  const renderTopDesc = () => {
    return (
      <TopDesc background={currentAlbum.coverImgUrl}>
        <div className="background">
          <div className="filter"></div>
        </div>
        <div className="img_wrapper">
          <div className="decorate"></div>
          <img src={currentAlbum.coverImgUrl} alt="" />
          <div className="play_count">
            <i className="iconfont play">&#xe885;</i>
            <span className="count">{getCount(currentAlbum.subscribedCount)}</span>
          </div>
        </div>
        <div className="desc_wrapper">
          <div className="title">{currentAlbum.name}</div>
          <div className="person">
            <div className="avatar">
              <img src={currentAlbum.creator.avatarUrl} alt="" />
            </div>
            <div className="name">{currentAlbum.creator.nickname}</div>
          </div>
        </div>
      </TopDesc>
    );
  };

  const renderMenu = () => {
    return (
      <Menu>
        <div>
          <i className="iconfont">&#xe6ad;</i>
          评论
        </div>
        <div>
          <i className="iconfont">&#xe86f;</i>
          点赞
        </div>
        <div>
          <i className="iconfont">&#xe62d;</i>
          收藏
        </div>
        <div>
          <i className="iconfont">&#xe606;</i>
          更多
        </div>
      </Menu>
    );
  };

  const renderSongList = () => {
    return (
      <SongList>
        <div className="first_line">
          <div className="play_all">
            <i className="iconfont">&#xe6e3;</i>
            <span>播放全部 <span className="sum">(共{currentAlbum.tracks.length}首)</span></span>
          </div>
          <div className="add_list">
            <i className="iconfont">&#xe62d;</i>
            <span>收藏({getCount(currentAlbum.subscribedCount)})</span>
          </div>
        </div>
        <SongItem>
          {
            currentAlbum.tracks.map((item, index) => {
              return (
                <li key={index}>
                  <span className="index">{index + 1}</span>
                  <div className="info">
                    <span>{item.name}</span>
                    <span>
                      {getName(item.ar)} - {item.al.name}
                    </span>
                  </div>
                </li>
              )
            })
          }
        </SongItem>
      </SongList>
    );
  };

  return (
    <CSSTransition
      in={showStatus}
      timeout={300} 
      appear={true} 
      unmountOnExit
      onExited={props.history.goBack}
      classNames="fly" 
    >
      <Container>
        <Header
          handleClick={handleBack}
          ref={headerEl}
          isMarquee={isMarquee}
          title={title}
        />
        {
          !isEmptyObject(currentAlbum) ? (
            <Scroll bounceTop={false} onScroll={handleScroll}>
              <div>
                { renderTopDesc() }
                { renderMenu() }
                { renderSongList() }
              </div>
            </Scroll>
          ) : null
        }
        { enterLoading ? <Loading /> : null }
      </Container>
    </CSSTransition>
  )
}

export default Album;