import { Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import styled from '@emotion/native';
import { getImgPath, SCREEN_HEIGHT } from '../util';
import { useNavigation } from '@react-navigation/native';

export default function MovieInfoSlide({ movie }) {
  const { navigate } = useNavigation();

  return (
    <SwiperChild onPress={() => navigate('Stacks', { screen: 'Detail', params: { movieId: movie.id } })}>
      <LinearGradient style={{ ...StyleSheet.absoluteFill, zIndex: 10 }} colors={['transparent', 'black']} />
      <Image style={{ ...StyleSheet.absoluteFill }} source={{ uri: getImgPath(movie.backdrop_path) }} />

      <MovieInfoWrapper>
        <MovieThumbnail source={{ uri: getImgPath(movie.poster_path) }} />
        <MovieTextWrapper>
          <MovieTitle>{movie.title}</MovieTitle>
          <Star>⭐️{movie.vote_average}/10</Star>
          <MovieText numberOfLines={4} ellipsizeMode={'tail'}>
            {movie.overview}
          </MovieText>
        </MovieTextWrapper>
      </MovieInfoWrapper>
    </SwiperChild>
  );
}

const SwiperChild = styled.TouchableOpacity`
  position: relative;
  height: ${SCREEN_HEIGHT / 3 + 'px'};
`;

const MovieInfoWrapper = styled.View`
  position: absolute;
  bottom: 10px;
  left: 20px;
  flex-direction: row;
  flex: 1;
  z-index: 20;
`;

const MovieThumbnail = styled.Image`
  width: 100px;
  height: 160px;
  border-radius: 4px;
  padding: 0;
`;

export const MovieTextWrapper = styled.View`
  width: 100%;
  flex: 1;
  margin-left: 10px;
  padding-right: 20px;
`;

export const Star = styled.Text`
  margin: 8px 0;
  color: #ccc;
`;

export const MovieTitle = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: #f0f0f0;
`;

export const MovieText = styled.Text`
  flex: 1;
  color: #ccc;
  font-size: 13px;
  padding-right: 10px;
`;
