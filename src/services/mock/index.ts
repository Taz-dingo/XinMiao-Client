// import Mock from 'mockjs';
// import { baseURL } from '../src/config';
// import { userList } from './data/userList';

// // Mock.mock(
// //     baseURL + '/login',
// //     'post',
// //     (username: "", password: "") => {
// //         console.log(username + ' ' + password);
// //     }
// // )


// let mockList = [
//     {
//         url: "/mock",// 要模拟的接口url
//         data: userList,// 这个直接写方法就行，mock内部自己会判断来调用
//         isMock: true, // 这个参数很关键，区分这个接口是否还需要mock模拟,后期可能有的接口后段已经给出了，不需要模拟了，也不需要把这个方法删掉，只需要isMock改为false即可，以后接口万一需要更改，留下来随时可以模拟，不需要重新建数据。
//         type: 'post'
//     }
// ]
// mockList.forEach(item => {
//     //把需要进行mock的请求进行mock
//     item.isMock && Mock.mock(baseURL + item.url, item.type || 'post', item.data)
// })