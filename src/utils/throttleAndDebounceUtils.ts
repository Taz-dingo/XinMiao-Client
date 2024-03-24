import _ from 'lodash';

// 节流函数
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  return _.throttle(func, wait);
};

// 防抖函数
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
) => {
  return _.debounce(func, wait);
};

// // 示例函数
// const exampleFunction = () => {
//   console.log('Function called');
// };

// // 使用节流函数
// const throttledFunction = throttle(exampleFunction, 1000);
// throttledFunction(); // 立即执行，冷却1000ms

// // 使用防抖函数
// const debouncedFunction = debounce(exampleFunction, 500);
// debouncedFunction(); // 如果在 500ms 内再次调用该函数，则之前的调用会被取消，函数将在最后一次调用后 500ms 执行