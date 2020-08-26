##### immutable 数据？
immutable 数据一种利用结构共享形成的持久化数据结构，一旦有部分被修改，那么将会返回一个全新的对象，并且原来相同的节点会直接共享。

具体点来说，immutable 对象数据内部采用是多叉树的结构，凡是有节点被改变，那么它和与它相关的所有上级节点都更新。

immutable 也有一些被部分开发者吐槽的点，首先是 immutable 对象和 JS 对象要注意转换，不能混用，这个大家注意适当的时候调用 toJS 或者 fromJS 即可，问题并不大


```
1.fromJS
它的功能是将 JS 对象转换为 immutable 对象。

import {fromJS} from 'immutable';
const immutableState = fromJS ({
    count: 0
});

2. toJS
和 fromJS 功能刚好相反，用来将 immutable 对象转换为 JS 对象。但是值得注意的是，这个方法并没有在 immutable 库中直接导出，而是需要让 immutable 对象调用。比如:

const jsObj = immutableState.toJS ();
```

//mock 数据
const singerList = [1, 2,3, 4,5,6,7,8,9,10,11,12].map (item => {
  return {
    picUrl: "https://p2.music.126.net/uTwOm8AEFFX_BYHvfvFcmQ==/109951164232057952.jpg",
    name: "隔壁老樊",
    accountId: 277313426,
  }
}); 


<ListContainer>
      <Scroll>
        { renderSingerList () }
      </Scroll>