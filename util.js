import { Dimensions } from 'react-native';

// 기기별 너비와 높이 구하는 변수
// Dimensions 기기의 가로너비와 세로너비를 계산해줌.
export const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// 이미지 패스
export const getImgPath = (path) => {
  return `https://image.tmdb.org/t/p/w500${path}`;
};
