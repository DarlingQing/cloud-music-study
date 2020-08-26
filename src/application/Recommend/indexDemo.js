import React, {
  useEffect,
} from 'react';
import { connect } from "react-redux";
import Slider from '../../components/Slider';
import RecommendList from '../../components/List';
import Scroll from '../../baseUI/Scroll/index';
import * as actionTypes from './store/actionCreators';
import { Content } from './style';

function Recommend(props) {
  const { bannerList, recommendList } = props;

  const { getBannerDataDispatch, getRecommendListDataDispatch } = props;

  useEffect(() => {
    // if(!bannerList){
    getBannerDataDispatch();
    // }
    if (!recommendList.length){
      getRecommendListDataDispatch();
    }
    // eslint-disable-next-line
  }, []);


  return (
    <Content>
      <Scroll>
        <Slider bannerList={bannerList} />
        <RecommendList recommendList={recommendList} />
      </Scroll>
    </Content>
  )
}

// 映射Redux全局的state到组件的props上
const mapStateToProps = (state, props) => {
  return {
    bannerList: state.getIn(['recommend', 'bannerList']),
    recommendList: state.getIn(['recommend', 'recommendList']),
  };
};

// 映射dispatch到props上
const mapDispatchToProps = (dispatch) => {
  return {
    getBannerDataDispatch() {
      dispatch(actionTypes.getBannerList());
    },
    getRecommendListDataDispatch() {
      dispatch(actionTypes.getRecommendList());
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(React.memo(Recommend));