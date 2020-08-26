import React, {
  useEffect,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Slider from '../../components/Slider';
import RecommendList from '../../components/List';
import Scroll from '../../baseUI/Scroll/index';
import Loading from '../../baseUI/Loading/index';
import { actions } from '../../store/reducers/recommend';
import './index.css';

function Recommend(props) {
  const dispatch = useDispatch();
  const recommendActions = actions.recommend;

  const {
    bannerList,
    recommendList,
    enterLoading,
  } = useSelector(({ recommend }) => ({
    bannerList: recommend.bannerList,
    recommendList: recommend.recommendList,
    enterLoading: recommend.enterLoading,
  }));

  useEffect(() => {
    if (!bannerList?.length) dispatch(recommendActions.getBanner());
    if (!recommendList?.length) dispatch(recommendActions.getRecommendList());
    // eslint-disable-next-line
  }, []);


  return (
    <div className="Recommend">
      <Scroll>
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
        { enterLoading ? <Loading /> : null }
      </Scroll>
    </div>
  )
}

export default React.memo(Recommend);