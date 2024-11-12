import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { Button, Appbar, ActivityIndicator, Card } from 'react-native-paper';
import axios from '../assets/api/axios';
import { Picker } from '@react-native-picker/picker';
import styles from '../assets/styles/styles';

function Search() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState('');
  const [selectedAlcoholPercentage, setSelectedAlcoholPercentage] =
    useState('0');
  const [filteredWines, setFilteredWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryList();
  }, []);

  const fetchCountryList = async () => {
    try {
      const response = await axios.get('/get-countries');
      setCountryList(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching country list:', error);
      setLoading(false);
    }
  };

  const fetchWinesByCountryAndAlcohol = async (
    countryName,
    alcoholPercentage
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/filter-wines-by-alcohol-percentage/${countryName}/${alcoholPercentage}`
      );
      setFilteredWines(response.data.results);
    } catch (error) {
      console.error('Error fetching wines:', error);
      Alert.alert(
        'Error',
        'Could not fetch wines by country and alcohol percentage'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCountrySelect = (countryName) => {
    setSelectedCountryName(countryName);
    if (countryName && selectedAlcoholPercentage !== '') {
      fetchWinesByCountryAndAlcohol(countryName, selectedAlcoholPercentage);
    }
  };

  const handleAlcoholSelect = (alcoholPercentage) => {
    setSelectedAlcoholPercentage(alcoholPercentage);
    if (selectedCountryName && alcoholPercentage !== '') {
      fetchWinesByCountryAndAlcohol(selectedCountryName, alcoholPercentage);
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
    <>
      <View style={styles.mainContainer}>
        <Text style={styles.label}>Select Country</Text>
        <Picker
          selectedValue={selectedCountryName}
          onValueChange={(value) => handleCountrySelect(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Country" value="" />
          {countryList.map((country) => (
            <Picker.Item
              label={country.CountryName}
              value={country.CountryName}
              key={country.CountryCode}
            />
          ))}
        </Picker>

        <Text style={styles.label}>Select Alcohol Percentage</Text>
        <Picker
          selectedValue={selectedAlcoholPercentage}
          onValueChange={(value) => handleAlcoholSelect(value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Alcohol Percentage" value="" />
          <Picker.Item label="0%" value="0" />
          <Picker.Item label="5%" value="5" />
          <Picker.Item label="10%" value="10" />
          <Picker.Item label="15%" value="15" />
          <Picker.Item label="20%" value="20" />
          <Picker.Item label="25%" value="25" />
        </Picker>

        <Text style={styles.resultText}>Results: {filteredWines.length}</Text>

        <FlatList
          data={filteredWines}
          renderItem={renderWineItem}
          keyExtractor={(item) => item.WineCode}
          contentContainerStyle={styles.list}
          numColumns={2}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </>
  );
}

export default Search;
