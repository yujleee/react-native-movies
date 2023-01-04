import { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList } from 'react-native';
import styled from '@emotion/native';
import Swiper from 'react-native-swiper';
import MovieInfoSlide from '../components/MovieInfoSlide';
import TopMovieItem from '../components/TopMovieItem';
import UpcomingMovieItem from '../components/UpcomingMovieItem';

const BASE_URL = 'https://api.themoviedb.org/3/movie';
const API_KEY = '07a8c1016ba33e1636341cd8ddebd15c';

export default function Movies() {
  const [nowPlayings, setNowPlayings] = useState([]);
  const [topLatedMovies, setTopLatedMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getNowPlayings = async () => {
    const { results } = await fetch(`${BASE_URL}/now_playing?api_key=${API_KEY}&language=en-US&page=1`).then((res) =>
      res.json()
    );

    setNowPlayings(results);
  };

  const getTopRatedMovies = async () => {
    const { results } = await fetch(`${BASE_URL}/top_rated?api_key=${API_KEY}&language=en-US&page=1`).then((res) =>
      res.json()
    );

    setTopLatedMovies(results);
  };

  const getUpcomingMovies = async () => {
    const { results } = await fetch(`${BASE_URL}/upcoming?api_key=${API_KEY}&language=en-US&page=1`).then((res) =>
      res.json()
    );

    setUpcomingMovies(results);
  };

  // 데이터를 모두 받아왔을 때 로딩이 끝나도록
  const getData = async () => {
    await Promise.all([getNowPlayings(), getTopRatedMovies(), getUpcomingMovies()]);
    setIsLoading(false);
  };

  // 새로고침 시
  const onRefresh = async () => {
    setIsRefreshing(true);
    await getData();
    setIsRefreshing(false);
  };

  useEffect(() => {
    getData();
  }, []);

  // 로딩에 여부에 따라서 로더 보여줌
  if (isLoading) {
    return (
      <Loader>
        <ActivityIndicator />
      </Loader>
    );
  }

  return (
    <FlatList
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height={'100%'} showsPagination={false} autoplay loop>
            {nowPlayings.map((movie) => (
              <MovieInfoSlide key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <Title>Top Rated Movies</Title>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
            data={topLatedMovies}
            renderItem={({ item }) => <TopMovieItem movie={item} />}
            keyExtractor={(item) => item.id}
          />
          <Title>UpComing Movies</Title>
        </>
      }
      data={upcomingMovies}
      renderItem={({ item }) => <UpcomingMovieItem movie={item} />}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={<View style={{ height: 15 }} />}
    />
  );
}

export const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text`
  font-size: 20px;
  margin: 30px 0 14px;
  padding-left: 20px;
  font-weight: 600;
  color: ${(props) => props.theme.title};
`;
