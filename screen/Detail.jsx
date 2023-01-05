import { useQuery } from 'react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Image, Linking, View, FlatList, useColorScheme } from 'react-native';
import styled from '@emotion/native';
import { Loader } from './Movies';
import { getImgPath } from '../util';
import { SCREEN_HEIGHT } from '../util';
import VideoItem from '../components/VideoItem';
import { getDetail } from '../api';
import { authService } from '../firebase';

const Detail = ({
  navigation: { reset },
  route: {
    params: { movieId },
  },
}) => {
  const isDark = useColorScheme() === 'dark';
  const { data, isLoading } = useQuery(['Detail', movieId], getDetail);

  const handleAddingReview = () => {
    if (!authService.currentUser) {
      reset({
        index: 1,
        routes: [
          { name: 'Tabs', params: { screen: 'Moives' } },
          { name: 'Stacks', params: { screen: 'Login' } },
        ],
      });

      return;
    }
  };

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    await Linking.openURL(url);
  };

  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <ImgWrapper>
            <Image style={{ ...StyleSheet.absoluteFill }} source={{ uri: getImgPath(data.backdrop_path) }} />
            <LinearGradient style={{ ...StyleSheet.absoluteFill, zIndex: 10 }} colors={['transparent', 'black']} />
            <Title>{data.title}</Title>
          </ImgWrapper>
          <Overview>{data.overview}</Overview>
        </>
      }
      data={data?.videos?.results}
      renderItem={(item) => <VideoItem item={item.item} onPress={openYoutube} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ marginBottom: 6 }} />}
      ListFooterComponent={
        <>
          <ReviewTitle>Reviews</ReviewTitle>
          <AddReviewButton onPress={handleAddingReview}>
            <ButtonText>Add Review</ButtonText>
          </AddReviewButton>
        </>
      }
    />
  );
};

export default Detail;

const ImgWrapper = styled.View`
  height: ${SCREEN_HEIGHT / 4 + 'px'};
  justify-content: flex-end;
`;

const Title = styled.Text`
  font-size: 24px;
  color: #fff;
  z-index: 20;
  padding: 10px 20px;
  font-weight: 600;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.movieText};
  padding: 0 20px;
  margin: 10px 0 30px;
`;

const ReviewTitle = styled.Text`
  padding: 0 20px;
  margin: 30px 0 0;
  color: ${(props) => props.theme.title};
  font-size: 22px;
  font-weight: 600;
`;

const AddReviewButton = styled.TouchableOpacity`
  width: 90%;
  height: 46px;
  margin: 30px auto;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  border-color: ${(props) => props.theme.backgroundColor};
  border-radius: 4px;
`;

const ButtonText = styled.Text`
  font-size: 16px;
  color: ${(props) => props.theme.backgroundColor};
`;
