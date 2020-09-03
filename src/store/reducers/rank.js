import { createActions, handleActions } from '../../utils/redux';
import {
  getRankListRequest,
} from '../../api/rank';

const getRankListRequestAction = 'rank/getRankList';

export const actions = createActions({
  [getRankListRequestAction]: getRankListRequest,
});

const reducer = handleActions({
  [getRankListRequestAction](state, action) {
    return {
      ...state,
      rankList: action.payload.list,
      enterLoading: false,
    }
  },
}, {
  rankList: [],
  // 数据是异步获取的，所以放在redux中处理
  enterLoading: true,
});

export default reducer;