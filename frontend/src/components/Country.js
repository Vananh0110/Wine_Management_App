import React, { useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { DataTable, ActivityIndicator, Searchbar, IconButton, Button } from 'react-native-paper';
import styles from '../assets/styles/styles';
import axios from '../assets/api/axios';

function Country() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortAscending, setSortAscending] = useState(true);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const searchBarWidth = useState(new Animated.Value(0))[0]; // Width for search bar animation

  const fetchCountries = async () => {
    try {
      const response = await axios.get('/get-countries');
      setCountries(response.data.results);
      setFilteredCountries(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleSort = () => {
    const sortedCountries = [...filteredCountries].sort((a, b) => {
      if (sortAscending) {
        return a.CountryCode.localeCompare(b.CountryCode);
      }
      return b.CountryCode.localeCompare(a.CountryCode);
    });
    setFilteredCountries(sortedCountries);
    setSortAscending(!sortAscending);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query) {
      const filtered = countries.filter((country) =>
        country.CountryName.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries(countries);
    }
  };

  const toggleSearchBar = () => {
    if (isSearchBarVisible) {
      Animated.timing(searchBarWidth, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsSearchBarVisible(false));
    } else {
      setIsSearchBarVisible(true);
      Animated.timing(searchBarWidth, {
        toValue: 250,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator animating={true} size="large" color="#1FAB89" />
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      {/* Header with Search Icon and Add Country Button */}
      <View style={styles.headerContainer}>
        <IconButton
          icon="magnify"
          size={24}
          onPress={toggleSearchBar}
          style={styles.searchIcon}
        />

        <Animated.View style={[styles.animatedSearchBar, { width: searchBarWidth }]}>
          {isSearchBarVisible && (
            <Searchbar
              placeholder="Search by Country Name"
              value={searchQuery}
              onChangeText={handleSearch}
              style={styles.searchbar}
              placeholderTextColor="gray"
              selectionColor="#62D2A2"
            />
          )}
        </Animated.View>

        <Button
          mode="contained"
          onPress={() => console.log('Add Country')}
          style={styles.addButton}
        >
          Add Country
        </Button>
      </View>

      {/* DataTable to display the list of countries */}
      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 0.5 }}>#</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }} onPress={handleSort}>
              Code {sortAscending ? '↑' : '↓'}
            </DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
            <DataTable.Title style={{ flex: 4 }}>Description</DataTable.Title>
          </DataTable.Header>

          {filteredCountries.map((country, index) => (
            <DataTable.Row key={country.CountryCode}>
              <DataTable.Cell style={{ flex: 0.5 }}>{index + 1}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <Text>{country.CountryCode}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                <Text>{country.CountryName}</Text>
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 4 }}>
                <Text>{country.Description}</Text>
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>
    </View>
  );
}

export default Country;
