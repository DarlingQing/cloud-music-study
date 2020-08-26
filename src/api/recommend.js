import { axiosInstance } from './config';

export const getBanner = () => {
  return axiosInstance.get('/banner');
};

export const getRecommendList = () => {
  return axiosInstance.get ('/personalized');
}