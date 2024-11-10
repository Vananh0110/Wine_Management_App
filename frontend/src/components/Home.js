import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image } from 'react-native';
import { Appbar, Card, ActivityIndicator, Searchbar } from 'react-native-paper';
import styles from '../assets/styles/styles';
import axios from '../assets/api/axios';

function Home() {
  const [wineData, setWineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchWineData = async () => {
    try {
      const response = await axios.get('/get-wines');
      setWineData(response.data.results);
      console.log(response.data.results);
      setFilteredData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWineData();
  }, []);

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = wineData.filter(
        (item) =>
          item.WineName.toLowerCase().includes(query.toLowerCase()) ||
          item.CountryCode.toLowerCase().includes(query.toLowerCase()) ||
          item.AlcoholPercentage.toString().includes(query) ||
          item.Age.toString().includes(query)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(wineData);
    }
  };

  const renderWineItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.Image }} style={styles.image} />
      <Card.Content>
        <Text style={styles.wineName}>{item.WineName}</Text>
        <Text style={styles.infoText}>
          {item.CountryCode} - {item.Age} years
        </Text>
        <Text style={styles.alcohol}>Alcohol: {item.AlcoholPercentage}%</Text>
      </Card.Content>
    </Card>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#1FAB89" />
      </View>
    );
  }

  return (
      <View style={styles.mainContainer}>
        <Searchbar
          placeholder="Search by name, country, age, ..."
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={[styles.searchbar, { backgroundColor: '#D7FBE8' }]}
          placeholderTextColor="gray"
          selectionColor="#62D2A2"
        />

        <FlatList
          data={filteredData}
          renderItem={renderWineItem}
          keyExtractor={(item, index) => `${item.WineCode}-${index}`}
          contentContainerStyle={styles.list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
  );
}

export default Home;
