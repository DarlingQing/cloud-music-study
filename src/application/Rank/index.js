import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import { actions } from '../../store/reducers/rank';
import Scroll from '../../baseUI/Scroll';
import { filterIndex } from '../../api/util';
import Loading from '../../baseUI/Loading';
// import './index.css';
import {
  List, 
  ListItem,
  SongList,
  Container
} from './style';


function Rank(props) {
  const dispatch = useDispatch();
  const rankActions = actions.rank;

  const {
    rankList,
    enterLoading,
  } = useSelector(({ rank }) => ({
    rankList: rank.rankList,
    enterLoading: rank.enterLoading,
  }));

  useEffect(() => {
    if(!rankList.length) dispatch(rankActions.getRankList());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterDetail = (detail) => {
    props.history.push(`/rank/${detail.id}`)
  };

  const globalStartIndex = filterIndex(rankList);
  const officialList = rankList.slice(0, globalStartIndex);
  const globalList = rankList.slice(globalStartIndex);

  const renderSongList = (list) => {
    return list.length ? (
      <SongList>
        {
          list.map((item, index) => {
            return <li key={index}>{index+1}. {item.first} - {item.second}</li>
          })
        }
      </SongList>
    ) : null;
  }

  // global控制样式问题
  const renderRankList = (list, global) => {
    return (
      <List globalRank={global}>
        {
          list.map((item, index) => {
            return (
              <ListItem
                key={index}
                tracks={item.tracks}
                onClick={() => enterDetail(item)}
              >
                 <div className="img_wrapper">
                  <img src={item.coverImgUrl} alt=""/>
                  <div className="decorate" />
                  <span className="update_frequecy">{item.updateFrequency}</span>
                </div>
                { renderSongList(item.tracks) }
              </ListItem>
            )
          })
        }
      </List>
    )
  }
  const displayStyle = enterLoading ? { "display": "none"} : { "display": ""};

  return (
    <Container>
      <Scroll>
        <div>
          <h1 className="offical" style={displayStyle}>官方榜</h1>
          { renderRankList(officialList) }
          <h1 className="global" style={displayStyle}>全球榜</h1>
          { renderRankList(globalList, true) }
          { enterLoading ? <Loading />  : null }
        </div>
      </Scroll>
      {/* TODO暂时没有用到 */}
      { renderRoutes(props.route.routes) }
    </Container>
  )
}

export default React.memo(Rank);