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
import { renderRoutes } from 'react-router-config';

function Recommend(props) {
  const dispatch = useDispatch();
  const recommendActions = actions.recommend;
  const { route: { routes } } = props;

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
        {/*  better-scroll 有且只能有一个子元素，所以在轮播图跟列表组件外面需要包裹一层div */}
        <div>
          <Slider bannerList={bannerList} />
          <RecommendList recommendList={recommendList} />
        </div>
        { enterLoading ? <Loading /> : null }
        {/* 这个方法中传入参数为路由配置数组，我们在组件中调用这个方法后只能渲染一层路由，再深层的路由就无法渲染 */}
        { renderRoutes(routes) }
      </Scroll>
    </div>
  )
}

export default React.memo(Recommend);