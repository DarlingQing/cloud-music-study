import React from 'react';
import { withRouter } from 'react-router-dom';
import LazyLoad from "react-lazyload";
import { getCount } from "../../api/util";
import { 
  ListWrapper,
  ListItem,
  List
} from './style';

function RecommendList(props) {
  const { recommendList, history } = props;

  // List作为Recommend子组件，并不能从props拿到history变量，无法跳转路由，需要借助withRouter
  // withRouter: 把不是通过路由切换过来的组件中，将react-router 的 history、location、match 三个对象传入props对象上
  const enterDetail = (id) => {
    history.push(`/recommend/${id}`);
  }

  return (
    <ListWrapper>
      <h1 className="title">推荐歌单</h1>
      <List>
        {
          recommendList.map((item, index) => (
            <ListItem key={item.id + index} onClick={() => enterDetail(item.id)}>
              <div className="img_wrapper">
                <div className="decorate" />
                <LazyLoad placeholder={<img width="100%" height="100%" src={require('./music.png')} alt="music"/>}>
                  <img src={item.picUrl + "?param=300x300"} width="100%" height="100%" alt="music"/>
                </LazyLoad>
                <div className="play_count">
                  <i className="iconfont play">&#xe885;</i>
                  <span className="count">{getCount(item.playCount)}</span>
                </div>
              </div>
              <div className="desc">{ item.name }</div>
            </ListItem>
          ))
        }
      </List>
    </ListWrapper>
  )
}

export default React.memo(withRouter(RecommendList));