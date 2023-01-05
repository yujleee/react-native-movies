import { useNavigation } from '@react-navigation/native';
import styled from '@emotion/native';
import { MovieTitle, Star, MovieText } from './MovieInfoSlide';
import { getImgPath } from '../util';

export default function UpcomingMovieItem({ movie }) {
  const { navigate } = useNavigation();

  return (
    <MovieWrapper onPress={() => navigate('Stacks', { screen: 'Detail', params: { movieId: movie.id } })}>
      <MoivePoster source={{ uri: getImgPath(movie.poster_path) }} />
      <MovieTextWrapper>
        <Title>{movie.title}</Title>
        <Date>{movie.release_date}</Date>
        <MovieDesc numberOfLines={3} ellipsizeMode={'tail'}>
          {movie.overview}
        </MovieDesc>
      </MovieTextWrapper>
    </MovieWrapper>
  );
}

const MovieWrapper = styled.TouchableOpacity`
  flex-direction: row;
  padding: 0 20px;
`;

const MoivePoster = styled.Image`
  width: 100px;
  height: 150px;
  border-radius: 4px;
`;

const Title = styled(MovieTitle)`
  font-size: 18px;
  color: ${(props) => props.theme.movieTitle};
`;

const MovieTextWrapper = styled.View`
  width: 100%;
  flex: 1;
  padding: 0 20px;
`;

const Date = styled(Star)`
  margin: 10px 0;
  font-size: 14px;
  color: ${(props) => props.theme.movieText};
`;

const MovieDesc = styled(MovieText)`
  font-size: 14px;
  color: ${(props) => props.theme.movieText};
`;
