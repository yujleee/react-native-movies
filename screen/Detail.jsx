import { useEffect, useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Image, Linking, View, useColorScheme, FlatList } from 'react-native';
import styled from '@emotion/native';
import { AntDesign } from '@expo/vector-icons';
import { Loader } from './Movies';
import { getImgPath } from '../util';
import { SCREEN_HEIGHT } from '../util';
import VideoItem from '../components/VideoItem';

const Detail = ({
  navigation: { navigate },
  route: {
    params: { movieId },
  },
}) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isDark = useColorScheme() === 'dark';

  const BASE_URL = 'https://api.themoviedb.org/3/movie';
  const API_KEY = '07a8c1016ba33e1636341cd8ddebd15c';

  const getDetail = async () => {
    const response = await fetch(
      `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
    ).then((res) => res.json());

    setData(response);
    setIsLoading(false);
  };

  const openYoutube = async (key) => {
    const url = `https://www.youtube.com/watch?v=${key}`;
    await Linking.openURL(url);
  };

  useEffect(() => {
    getDetail();
  }, []);

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
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.movieText};
  padding: 0 20px;
  margin: 10px 0 30px;
`;
