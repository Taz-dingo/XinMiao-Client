import _ from 'lodash';

// 节流函数
export const throttle = (func: Function, wait: number) => {
  return _.throttle(func, wait);
};

// 防抖函数
export const debounce = (func: Function, wait: number) => {
  return _.debounce(func, wait);
};