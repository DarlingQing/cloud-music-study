import { createActions, handleActions } from '../../utils/redux';
import {
  getAlbumDetailRequest,
} from '../../api/request';

const getAlbumDetailRequestAction = 'album/getAlbumDetail';

export const actions = createActions({
  [getAlbumDetailRequestAction]: getAlbumDetailRequest,
});

const reducer = handleActions({
  [getAlbumDetailRequestAction](state, action) {
    return {
      ...state,
      currentAlbum: action.payload.playlist,
      enterLoading: false,
    }
  },
}, {
  currentAlbum: {},
  // 数据是异步获取的，所以放在redux中处理
  enterLoading: true,
});

export default reducer;