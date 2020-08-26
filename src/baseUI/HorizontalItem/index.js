import React, {
  useRef,
  useEffect,
} from 'react';
import PropTypes from "prop-types";
import Scroll from '../../baseUI/Scroll/index';
import { List, ListItem } from './style';

function HorizontalItem({
  title,
  oldVal,
  list,
  handleClick,
}) {
  const Catogory = useRef(null);


  // 加入初始化内容宽度的逻辑
  useEffect(() => {
    let categoryDOM = Catogory.current;
    let tagElems = categoryDOM.querySelectorAll('span');
    let totalWidth = 0;
    // NodeList to Array 还可以 Array.from()
    Array.prototype.slice.call(tagElems).forEach(ele => {
      totalWidth += ele.offsetWidth;
    });
    categoryDOM.style.width = `${totalWidth}px`;
  }, []);

  // const { title, oldVal, list, handleClick } = props;
  // const { handleClick } = props;

  return (
    <Scroll direction={"horizontal"}>

      
      <div ref={Catogory}>
        <List>
          <span>{title}</span>
          {
            list.map(item => {
              return (
                <ListItem
                  key={item.key}
                  className={`${oldVal === item.key ? 'selected' : ''}`}
                  onClick={() => handleClick(item.key)}
                >
                  { item.name }
                </ListItem>
              )
            })
          }
        </List>
      </div>
    </Scroll>
  )
}

HorizontalItem.propTypes = {
  // 列表数据
  list: PropTypes.array,
  // 当前的item值
  oldVal: PropTypes.string,
  // 左边标题
  title: PropTypes.string,
  handleClick: PropTypes.func,
};

HorizontalItem.defaultProps = {
  list: [],
  oldVal: '',
  title: '',
  handleClick: null,

};

export default React.memo(HorizontalItem);