import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Alert } from 'react-native';
import { TextInput, Button, ActivityIndicator, Card } from 'react-native-paper';
import axios from '../assets/api/axios';
import { Picker } from '@react-native-picker/picker';
import styles from '../assets/styles/styles';

function Search() {
  const [countryList, setCountryList] = useState([]);
  const [selectedCountryName, setSelectedCountryName] = useState('France'); // Mặc định là France
  const [selectedAlcoholPercentage, setSelectedAlcoholPercentage] = useState('5'); // Mặc định là 5%
  const [filteredWines, setFilteredWines] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCountryList();
  }, []);

  const fetchCountryList = async () => {
    try {
      const response = await axios.get('/get-countries');
      setCountryList(response.data.results);

      // Đặt mặc định là France và 5%
      setSelectedCountryName('France');
      fetchWinesByCountryAndAlcohol('France', '5'); // Tải danh sách rượu của Pháp với 5% alcohol
      setLoading(false);
    } catch (error) {
      console.error('Error fetching country list:', error);
      setLoading(false);
    }
  };

  const fetchWinesByCountryAndAlcohol = async (countryName, alcoholPercentage) => {
    if (isNaN(alcoholPercentage) || alcoholPercentage === '') return; // Kiểm tra giá trị hợp lệ
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
      <Text style={styles.label}>Select Country</Text>
      <Picker
        selectedValue={selectedCountryName}
        onValueChange={(value) => {
          setSelectedCountryName(value);
          if (value && selectedAlcoholPercentage !== '') {
            fetchWinesByCountryAndAlcohol(value, selectedAlcoholPercentage);
          }
        }}
        style={styles.picker}
      >
        {countryList.map((country) => (
          <Picker.Item
            label={country.CountryName}
            value={country.CountryName}
            key={country.CountryCode}
          />
        ))}
      </Picker>

      <Text style={styles.label}>Alcohol Percentage</Text>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          mode="outlined"
          onPress={() => {
            const newPercentage = Math.max(0, Number(selectedAlcoholPercentage) - 1);
            setSelectedAlcoholPercentage(newPercentage.toString());
            if (selectedCountryName) {
              fetchWinesByCountryAndAlcohol(selectedCountryName, newPercentage.toString());
            }
          }}
          style={styles.adjustButton}
        >
          -
        </Button>
        <TextInput
          style={[styles.inputSearch, { textAlign: 'center', width: 100 }]}
          value={selectedAlcoholPercentage}
          underlineColor='#62D2A2'
          activeUnderlineColor='#1FAB89'
          onChangeText={(value) => {
            if (/^\d*$/.test(value)) {
              setSelectedAlcoholPercentage(value);
              if (selectedCountryName && value !== '') {
                fetchWinesByCountryAndAlcohol(selectedCountryName, value);
              }
            }
          }}
          keyboardType="numeric"
        />
        <Button
          mode="outlined"
          onPress={() => {
            const newPercentage = Number(selectedAlcoholPercentage) + 1;
            setSelectedAlcoholPercentage(newPercentage.toString());
            if (selectedCountryName) {
              fetchWinesByCountryAndAlcohol(selectedCountryName, newPercentage.toString());
            }
          }}
          style={styles.adjustButton}
        >
          +
        </Button>
      </View>

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
  );
}

export default Search;
