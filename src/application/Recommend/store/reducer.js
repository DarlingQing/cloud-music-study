// 存放initialState和reducer函数
import * as actionTypes from './constants';

const defaultState = {
  bannerList: [],
  recommendList: [],
  enterLoading: true,
};

// set方法设置新状态，同时获取用get方法
const getRecommends = (state = defaultState, action) => {
  switch(action.type) {
    case actionTypes.CHANGE_BANNER:
      return {
        ...state,
        bannerList: action.data,
      };
    case actionTypes.CHANGE_RECOMMEND_LIST:
      return {
        ...state,
        recommendList: action.data,
      };
    case actionTypes.CHANGE_ENTER_LOADING:
      return {
        ...state,
        enterLoading: action.data,
      };
    default:
      return state;
  }
};

export default getRecommends;