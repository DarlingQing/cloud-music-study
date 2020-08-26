import { createActions, handleActions } from '../../utils/redux';
import {
  getBanner,
  getRecommendList,
} from '../../api/recommend';

const getBannerAction = 'recommend/getBanner';
const getRecommendListAction = 'recommend/getRecommendList';

export const actions = createActions({
  [getBannerAction]: getBanner,
  [getRecommendListAction]: getRecommendList,
});

const reducer = handleActions({
  [getBannerAction](state, action) {
    // 返回一个新的state
    return {
      ...state,
      bannerList: action.payload.banners,
    }
  },

  [getRecommendListAction](state, action) {
    return {
      ...state,
      recommendList: action.payload.result,
      enterLoading: false,
    }
  },
}, {
  bannerList: [],
  recommendList: [],
  // 数据是异步获取的，所以放在redux中处理
  enterLoading: true,
});

export default reducer;