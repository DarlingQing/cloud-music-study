import React, { useState, useEffect, useMemo } from 'react';
import './index.css';

function UseMemoDemo(props) {
  const nameList = ['apple', 'peer', 'banna', 'lemom'];
  const [price, setPrice] = useState(0);
  const [name, setName] = useState('apple');

  const getProductName = () => {
    console.log('getProductName触发');
    return name;
  };

  // useEffect: 完成对DOM的更改后运行副作用函数
  useEffect(() => {
    console.log('name effect触发');
    getProductName();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  useEffect(() => {
    console.log('price effect触发');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price]);
  
  // 若只改变价格，useMemo相关的不会执行，只有name变化时，才会触发memo的执行
  // 点击修改名字时，会先触发name的memo，memo是在DOM更新前触发的，就像官方所说的，类比生命周期就是shouldComponentUpdate
  // useMemo中使用setState会发生死循环，并且会有警告，useMemo是在渲染中进行的，你在其中操作DOM后，又会导致触发memo
  const memoName = useMemo(() => {
    console.log('name memo触发');
    return () => name;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);

  return (
    <div className="UseMemoDemo">
      <p>{ name }</p>
      <p>{ price }</p>
      <p>{ getProductName() }</p>
      <p>{ memoName() }</p>
      <button onClick={() => setPrice(price + 1)}>价钱+1</button>
      <button onClick={() => setName(nameList[Math.random() * nameList.length << 0])}>修改名字</button>
    </div>
  )
}

export default React.memo(UseMemoDemo);