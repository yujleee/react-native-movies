import { AntDesign } from '@expo/vector-icons';
import styled from '@emotion/native';
import { useColorScheme } from 'react-native';

const VideoItem = ({ item, onPress }) => {
  const isDark = useColorScheme() === 'dark';

  return (
    <VideoWrapper onPress={() => onPress(item.key)}>
      <AntDesign name="youtube" size={24} color={isDark ? '#fff' : '#333'} />
      <VideoTitle numberOfLines={1}>{item.name}</VideoTitle>
    </VideoWrapper>
  );
};

export default VideoItem;

const VideoWrapper = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 10px 0;
  padding: 0 20px;
`;

const VideoTitle = styled.Text`
  color: ${(props) => props.theme.movieText};
  font-size: 14px;
  margin-left: 10px;
  padding-right: 20px;
`;
