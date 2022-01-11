import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {moderateScale} from 'react-native-size-matters';
import {useDispatch, useSelector} from 'react-redux';
import CardMovie from '../../component/cardMovie';
import GenreCard from '../../component/genreCard';
import Poppins from '../../component/Poppins';
import {URL} from '../../helpers/url';

// import action redux
import {setChangePassword} from '../Account/redux/action';
import {setDetailMovie} from '../Explore/redux/action';
import {setDatapopulars} from './redux/action';

export default function Home(props) {
  const [genres, setGenres] = useState([
    {
      title: 'Action',
      isActive: false,
      id: 1,
    },
    {
      title: 'Sci-fi',
      isActive: false,
      id: 2,
    },
    {
      title: 'Drama',
      isActive: false,
      id: 3,
    },
    {
      title: 'Horror',
      isActive: false,
      id: 4,
    },
    {
      title: 'Thriller',
      isActive: false,
      id: 5,
    },
    {
      title: 'Anime',
      isActive: false,
      id: 6,
    },
    {
      title: 'Comedy',
      isActive: false,
      id: 7,
    },
    {
      title: 'Romance',
      isActive: false,
      id: 8,
    },
  ]);
  const dataPerkakas = useSelector(state => state);
  console.log(dataPerkakas);

  const switchSelectedGenre = index => {
    setGenres(prevState => {
      const newListGenres = prevState.map(value => {
        return {
          ...value,
          isActive: false,
        };
      });
      newListGenres[index].isActive = true;
      return newListGenres;
    });
  };

  // declare dulu statenya
  const [populars, setPopulars] = useState([]);
  const [dataTopRated, setDataTopRated] = useState([]);
  const [dataNowPlaying, setDataNowPlaying] = useState([]);
  const dispatch = useDispatch();
  const reducer = useSelector(state => state);
  const HomeData = useSelector(state => state);

  //dispatch Action All Reducer
  const dispatchAction = () => {
    //Reducer Home
    dispatch(setDatapopulars(['audy', 'wildan', 'kelvin']));
    //Reducer Explore
    dispatch(setDetailMovie({title: 'spiderman', photo: 'dsadad'}));

    //Account Reducer
    dispatch(setChangePassword('5678'));

    //Help Center
    dispatch({
      type: 'SET_HELP_CENTER',
      data: ['0897654633'],
    });

    //Login Reducer
    dispatch({
      type: 'SET_LOGIN',
      data: ['wilman'],
    });

    //MyList Reducer
    dispatch({
      type: 'SET_MYLIST',
      data: ['Waikiki', 'avengers'],
    });

    //Register Reducer
    dispatch({
      type: 'SET_REGISTER',
      data: ['wildan Shobara'],
    });
  };
  // console.log(reducer);

  const fetchDataPopular = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${URL.baseUrl}/movie/popular`,
        headers: {authorization: `Bearer ${URL.token}`},
      });
      setPopulars(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataTopRated = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${URL.baseUrl}/movie/top_rated`,
        headers: {authorization: `Bearer ${URL.token}`},
      });
      setDataTopRated(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchDataNowPlaying = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${URL.baseUrl}/movie/now_playing`,
        headers: {authorization: `Bearer ${URL.token}`},
      });
      setDataNowPlaying(res.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataPopular();
    fetchDataTopRated();
    fetchDataNowPlaying();
  }, []);

  return (
    <SafeAreaView>
      <FlatList
        showsHorizontalScrollIndicator={false}
        style={{marginTop: moderateScale(24)}}
        horizontal
        data={genres}
        renderItem={({item, index}) => {
          return (
            <GenreCard
              onPress={() => switchSelectedGenre(index)}
              title={item.title}
              isActive={item.isActive}
            />
          );
        }}
        keyExtractor={item => item.id}
      />
      <ScrollView>
        <TouchableOpacity onPress={dispatchAction}>
          <Poppins>Dispatch Please</Poppins>
        </TouchableOpacity>
        <View>
          <CardMovie
            navigation={props.navigation}
            title={'Popular'}
            data={populars}
          />
        </View>

        <View>
          <CardMovie
            navigation={props.navigation}
            title={'Top Rated'}
            data={dataTopRated}
          />
        </View>

        <View>
          <CardMovie
            navigation={props.navigation}
            title={'Now Playing'}
            data={dataNowPlaying}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
