import { createActions, handleActions } from '../../utils/redux';
import {
  getHotSingerListRequest,
  getSingerListRequest,
} from '../../api/singers';

const getHotSingerListRequestAction = 'singers/getHotSingerList';
const refreshMoreHotSingerListAction = 'singers/refreshMoreHotSingerList';
const getSingerListAction = 'singers/getSingerList';
const refreshMoreSingerListAction = 'singers/refreshMoreSingerList';
const changePageCountAction = 'singers/changePageCount';
const changeEnterLoadingAction = 'singers/changeEnterLoading';
const changePullDownLoadingAction = 'singers/changePullDownLoading';
const changePullUpLoadingAction = 'singers/changePullUpLoading';

export const actions = createActions({
  [getHotSingerListRequestAction]: getHotSingerListRequest,
  [refreshMoreHotSingerListAction]: getHotSingerListRequest,
  [getSingerListAction]: getSingerListRequest,
  [refreshMoreSingerListAction]: getSingerListRequest,
  [changePageCountAction]: pageNo => pageNo,
  [changeEnterLoadingAction]: loading => loading,
  [changePullDownLoadingAction]: data => data,
  [changePullUpLoadingAction]: data => data,
});


const reducer = handleActions({
  // 获取热门歌手列表
  [getHotSingerListRequestAction](state, action) {
    // 返回一个新的state
    return {
      ...state,
      singerList: action.payload.artists,
      enterLoading: false,
      pullDownLoading: false,
    }
  },
  // 刷新更多热门歌手列表：参数（pageCount），need try catch
  [refreshMoreHotSingerListAction](state, action) {
    // 返回一个新的state
    return {
      ...state,
      singerList: [...state.singerList, action.payload.artists],
      changePullUpLoading: false,
    }
  },
  // 获取歌手列表：参数（category，alpha），need try catch
  [getSingerListAction](state, action) {
    // 返回一个新的state
    return {
      ...state,
      singerList: action.payload.artists,
      enterLoading: false,
      pullDownLoading: false,
    }
  },
  // 刷新更多热门歌手列表：参数（category，alpha, pageCount），need try catch
  [refreshMoreSingerListAction](state, action) {
    // 返回一个新的state
    return {
      ...state,
      singerList: [...state.singerList, action.payload.artists],
      changePullUpLoading: false,
    }
  },
  // 改变页数
  [changePageCountAction](state, action) {
    return {
      ...state,
      pageCount: action.payload,
    };
  },
  [changeEnterLoadingAction](state, action) {
    return {
      ...state,
      enterLoading: action.payload,
    };
  },
  // 顶部下拉刷新loading
  [changePullDownLoadingAction](state, action) {
    return {
      ...state,
      pullDownLoading: action.payload,
    };
  },
  // 滑动最底部loading
  [changePullUpLoadingAction](state, action) {
    return {
      ...state,
      pullUpLoading: action.payload,
    };
  },
}, {
  singerList: [],
  // 数据是异步获取的，所以放在redux中处理
  enterLoading: true,
  // 控制上拉加载动画
  pullUpLoading: false,
  // 控制下拉加载动画
  pullDownLoading: false,
  // 当前页数
  pageCount: 0,
});

export default reducer;