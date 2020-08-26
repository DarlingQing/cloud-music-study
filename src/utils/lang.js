/**
 * 检测类型
 */
const { toString } = Object.prototype;

const is = type => obj => toString.call(obj) === `[object ${type}]`;

export const isError = is('Error');

export const isPromise = (obj) => {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
};
