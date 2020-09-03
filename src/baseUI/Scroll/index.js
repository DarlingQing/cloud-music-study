import React, {
  forwardRef,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import PropTypes from "prop-types";
import BScroll from "better-scroll";
import { debounce } from "../../api/util";
import "./index.css";

// scroll组件在业务中会被经常取到原生DOM对象，函数式组件需要forwardRef进行包裹
const Scroll = forwardRef((props, ref) => {
  // better-scroll 实例对象
  const [bScroll, setBScroll] = useState();

  // current只想bs实例需要的DOM元素
  const scrollContaninerRef = useRef();

  const {
    direction,
    click,
    refresh,
    // pullUpLoading,
    // pullDownLoading,
    bounceTop,
    bounceBottom,
  } = props;

  const {
    onScroll,
    pullUp,
    pullDown,
  } = props;

  const pullUpDebounce = useMemo(() => {
    return debounce(pullUp, 300);
  }, [pullUp]);

  let pullDownDebounce = useMemo(() => {
    return debounce(pullDown, 300);
  }, [pullDown]);



  useEffect(() => {
    const scroll = new BScroll(scrollContaninerRef.current, {
      scrollX: direction === "horizontal",
      scrollY: direction === "vertical",
      probeType: 3,
      click: click,
      bounce:{
        top: bounceTop,
        bottom: bounceBottom,
      }
    });
    setBScroll(scroll);
    // why 要加return
    return () => {
      setBScroll(null);
    }
    // eslint-disable-next-line
  }, []);

  // onScroll事件
  useEffect(() => {
    if(!bScroll || !onScroll) return;
    bScroll.on('scroll', (scroll) => {
      onScroll(scroll);
    })
    // 会有bug，需要重新解绑，再绑定事件
    return () => {
      bScroll.off('scroll');
    }
  }, [onScroll, bScroll]);

  // 进行上拉到底的判断
  useEffect(() => {
    if (!bScroll || !pullUp) return;
    // 判断是否滑动到了底部
    const handlePullUp = (pos) => {
      if (bScroll.y <= bScroll.maxScrollY + 100) {
        // pullUp();
        pullUpDebounce();
      }
    }
    bScroll.on('scrollEnd', handlePullUp);
    return () => {
      bScroll.off('scrollEnd', handlePullUp);
    };
  }, [pullUp, pullUpDebounce, bScroll]);


  // 进行下拉的判断，调用下拉刷新的函数
  useEffect(() => {
    if (!bScroll || !pullDown) return;

    const handlePullSown = (pos) => {
      if (pos.y > 50) {
        pullDownDebounce();
      }
    }
    // 判断是否滑动到了底部
    bScroll.on('touchEnd', handlePullSown);
    return () => {
      bScroll.off('touchEnd', handlePullSown);
    };
  }, [pullDown, pullDownDebounce, bScroll]);



  // 每次都会渲染
  useEffect (() => {
    if (refresh && bScroll){
      bScroll.refresh ();
    }
  });

  // 一般和forwardRef一起使用，ref已经在forwardRef中默认传入
  // 向父组件暴露refresh方法和bs实例
  useImperativeHandle(ref, () => ({
    refresh() {
      if (bScroll) {
        bScroll.refresh();
        bScroll.scrollTo(0, 0);
      }
    },
    getBScroll() {
      if (bScroll) {
        return bScroll;
      }
    }
  }));

  return (
    <div
      ref={scrollContaninerRef}
      className="Scroll"
    >
      {props.children}
    </div>
  );
})

Scroll.propTypes = {
  direction: PropTypes.oneOf(['vertical', 'horizontal']),
  refresh: PropTypes.bool,
  onScroll: PropTypes.func,
  pullUp: PropTypes.func,
  pullDown: PropTypes.func,
  pullUpLoading: PropTypes.bool,
  pullDownLoading: PropTypes.bool,
  bounceTop: PropTypes.bool,//是否支持向上吸顶
  bounceBottom: PropTypes.bool//是否支持向上吸顶
};

Scroll.defaultProps = {
  direction: "vertical",
  click: true,
  refresh: true,
  onScroll:null,
  pullUpLoading: false,
  pullDownLoading: false,
  pullUp: null,
  pullDown: null,
  bounceTop: true,
  bounceBottom: true
};

export default Scroll;
