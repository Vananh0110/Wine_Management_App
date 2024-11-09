import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { Appbar, Card, ActivityIndicator, Searchbar, BottomNavigation } from 'react-native-paper';
import styles from '../assets/styles/styles';
import axios from '../assets/api/axios';
import Home from '../components/Home';
import Country from '../components/Country';
import Search from '../components/Search';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

function HomeScreen() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Home', icon: 'home' },
    { key: 'country', title: 'Country', icon: 'flag' },
    { key: 'search', title: 'Search', icon: 'magnify' },
  ]);

  const [appBarTitle, setAppBarTitle] = useState(routes[0].title);


  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'home':
        return <Home />;
      case 'country':
        return <Country />;
      case 'search':
        return <Search />;
      default:
        return null;
    }
  };

  const handleIndexChange = (index) => {
    setIndex(index);
    setAppBarTitle(routes[index].title);
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: '#62D2A2' }}>
      <Appbar.Content
            title={appBarTitle}
            titleStyle={{
              fontSize: 20,
              textAlign: 'center',
              color: '#000000',
              fontWeight: 'bold',
            }}
          />
      </Appbar.Header>
      <BottomNavigation
          navigationState={{ index, routes }}
          onIndexChange={handleIndexChange}
          renderScene={renderScene}
          renderIcon={({ route, focused, color }) => (
            <MaterialCommunityIcons name={route.icon} color={color} size={24} />
          )}
          activeColor="#000000"
          inactiveColor="#4b4b4b"
          barStyle={{
            backgroundColor: '#ffffff',
            borderWidth: 0.5,
            borderColor: '#ccccccac',
          }}
          activeIndicatorStyle={{
            backgroundColor: '#9DF3C4',
          }}
        />

    </>
  );
}

export default HomeScreen;
