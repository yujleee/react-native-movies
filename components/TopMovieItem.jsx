import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';
import { Star } from './MovieInfoSlide';
import { getImgPath } from '../util';

export default function TopMovieItem({ movie }) {
  const { navigate } = useNavigation();

  return (
    <MovieWrapper onPress={() => navigate('Stacks', { screen: 'Detail', params: { movieId: movie.id } })}>
      <MoviePoster source={{ uri: getImgPath(movie.poster_path) }} />
      <TextWapper>
        <Star>⭐️{movie.vote_average}/10</Star>
        <MovieTitle numberOfLines={1}>{movie.title}</MovieTitle>
      </TextWapper>
    </MovieWrapper>
  );
}

const MovieWrapper = styled.TouchableOpacity`
  width: 120px;
`;

const MoviePoster = styled.Image`
  width: 120px;
  height: 170px;
  background-color: grey;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const TextWapper = styled.View`
  width: 100%;
  flex: 1;
  padding: 8px 8px 12px 8px;
  background-color: #2d3436;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
`;

const MovieTitle = styled.Text`
  color: #eaeaea;
  margin-top: -2px;
`;
