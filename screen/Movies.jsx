import { useState } from 'react';
import { View, ActivityIndicator, FlatList, Alert } from 'react-native';
import styled from '@emotion/native';
import Swiper from 'react-native-swiper';
import MovieInfoSlide from '../components/MovieInfoSlide';
import TopMovieItem from '../components/TopMovieItem';
import UpcomingMovieItem from '../components/UpcomingMovieItem';
import { useInfiniteQuery, useQuery, useQueryClient } from 'react-query';
import { getNowPlayings, getTopRatedMovies, getUpcomingMovies } from '../api';

export default function Movies() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const queryClient = useQueryClient(); // 캐시메모리 사용을 위한 변수

  const { data: nowPlayingData, isLoading: isLoadingNP } = useQuery(['Movies', 'NowPlaying'], getNowPlayings);
  const {
    data: topRatedData,
    isLoading: isLoadingTR,
    fetchNextPage: fetchNextPageTR,
    hasNextPage: HasNextPageTR,
  } = useInfiniteQuery(['Movies', 'TopRated'], getTopRatedMovies, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });
  const {
    data: upcomingData,
    isLoading: isLoadingUC,
    fetchNextPage: fetchNextPageUC,
    hasNextPage: hasNextPageUC,
  } = useInfiniteQuery(['Movies', 'Upcoming'], getUpcomingMovies, {
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.total_pages) {
        return lastPage.page + 1;
      }
    },
  });

  // 새로고침 시
  const onRefresh = async () => {
    setIsRefreshing(true);
    // refetch 부분 필요.
    await queryClient.refetchQueries(['Movies']);
    setIsRefreshing(false);
  };

  // 하나라도 로딩중이면 로딩창
  const isLoading = isLoadingNP || isLoadingTR || isLoadingUC;

  // UpcomingMovies 무한스크롤 fetch
  const fetchMoreUpcoming = async () => {
    if (hasNextPageUC) {
      await fetchNextPageUC();
    }
  };

  // TopRated 무한스트롤 fetch
  const fetchMoreTopRated = async () => {
    if (HasNextPageTR) {
      await fetchNextPageTR();
    }
  };

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
      onEndReached={fetchMoreUpcoming}
      onEndReachedThreshold={0.5}
      refreshing={isRefreshing}
      onRefresh={onRefresh}
      ListHeaderComponent={
        <>
          <Swiper height={'100%'} showsPagination={false} autoplay loop>
            {nowPlayingData.results.map((movie) => (
              <MovieInfoSlide key={movie.id} movie={movie} />
            ))}
          </Swiper>
          <Title>Top Rated Movies</Title>
          <FlatList
            onEndReached={fetchMoreTopRated}
            onEndReachedThreshold={0.5}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 20 }}
            ItemSeparatorComponent={<View style={{ width: 10 }} />}
            data={topRatedData.pages.map((page) => page.results).flat()}
            renderItem={({ item }) => <TopMovieItem movie={item} />}
            keyExtractor={(item) => item.id}
          />
          <Title>UpComing Movies</Title>
        </>
      }
      data={upcomingData.pages.map((page) => page.results).flat()}
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
