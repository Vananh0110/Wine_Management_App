import React, { useEffect, useState } from 'react';
import { View, Text, Animated, Alert, TextInput } from 'react-native';
import {
  DataTable,
  ActivityIndicator,
  Searchbar,
  IconButton,
  Button,
  Portal,
  Modal,
  Snackbar,
} from 'react-native-paper';
import styles from '../assets/styles/styles';
import axios from '../assets/api/axios';

function Country() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalActionVisible, setIsModalActionVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [newCountry, setNewCountry] = useState({
    code: '',
    name: '',
    description: '',
  });
  const searchBarWidth = useState(new Animated.Value(0))[0];
  const [page, setPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [addErrors, setAddErrors] = useState({});
  const [editErrors, setEditErrors] = useState({});

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, filteredCountries.length);

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

  const handleSearch = (query) => {
    setSearchQuery(query);

    if (query) {
      const filtered = countries.filter(
        (country) =>
          country.CountryName.toLowerCase().includes(query.toLowerCase()) ||
          country.CountryCode.toLowerCase().includes(query.toLowerCase())
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

  const validateAddFields = () => {
    const errors = {};

    if (!newCountry.code.trim()) {
      errors.code = 'Country code is required.';
    } else if (
      countries.some(
        (country) =>
          country.CountryCode.toLowerCase() === newCountry.code.toLowerCase()
      )
    ) {
      errors.code = 'Country code must be unique.';
    }

    if (!newCountry.name.trim()) {
      errors.name = 'Country name is required.';
    }

    if (!newCountry.description.trim()) {
      errors.description = 'Description is required.';
    }

    setAddErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const validateEditFields = () => {
    const errors = {};

    if (!selectedCountry.CountryName.trim()) {
      errors.name = 'Country name is required.';
    }

    if (!selectedCountry.Description.trim()) {
      errors.description = 'Description is required.';
    }

    setEditErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const addCountry = async () => {
    if (!validateAddFields()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    try {
      const response = await axios.post('/insert-country', {
        country_code: newCountry.code,
        country_name: newCountry.name,
        country_description: newCountry.description,
      });

      if (response.status === 200) {
        const updatedCountries = [
          ...countries,
          {
            CountryCode: newCountry.code,
            CountryName: newCountry.name,
            Description: newCountry.description,
          },
        ];
        setCountries(updatedCountries);
        setFilteredCountries(updatedCountries);
        setNewCountry({ code: '', name: '', description: '' });
        setIsModalVisible(false);
        setSnackbarMessage('Country added successfully');
        setSnackbarVisible(true);
      }
    } catch (error) {
      console.error('Error adding country:', error);
    }
  };

  const handleRowPress = (country) => {
    setSelectedCountry(country);
    setIsModalActionVisible(true);
  };

  const editCountry = async () => {
    if (!validateEditFields()) {
      Alert.alert('Validation Error', 'Please fix the errors before saving.');
      return;
    }

    try {
      const response = await axios.put('/update-country', {
        country_code: selectedCountry.CountryCode,
        new_name: selectedCountry.CountryName,
        new_description: selectedCountry.Description,
      });
      if (response.status === 200) {
        fetchCountries();
        setSnackbarMessage('Country updated successfully');
        setSnackbarVisible(true);
      }
      setIsEditModalVisible(false);
      setIsModalActionVisible(false);
    } catch (error) {
      console.error('Error updating country:', error);
    }
  };

  const deleteCountry = async () => {
    try {
      const response = await axios.delete('/delete-country', {
        data: { country_code: selectedCountry.CountryCode },
      });
      if (response.status === 200) {
        fetchCountries();
        setSnackbarMessage('Country deleted successfully');
        setSnackbarVisible(true);
      }
      setIsDeleteModalVisible(false);
      setIsModalActionVisible(false);
    } catch (error) {
      console.error('Error deleting country:', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Animated.View style={styles.animatedSearchBar}>
          {isSearchBarVisible && (
            <Searchbar
              placeholder="Search by code, name"
              value={searchQuery}
              onChangeText={handleSearch}
              inputStyle={styles.searchbarInput}
              style={styles.searchbar2}
              contentStyle={styles.searchbarContent}
              placeholderTextColor="gray"
              selectionColor="#62D2A2"
              icon={() => null}
            />
          )}
        </Animated.View>
        <IconButton
          icon="magnify"
          size={24}
          onPress={toggleSearchBar}
          style={styles.searchIcon}
        />
        <IconButton
          icon="plus"
          size={24}
          onPress={() => setIsModalVisible(true)}
          style={styles.addButton}
        />
      </View>

      {/* Add New Country */}
      <Portal>
        <Modal
          visible={isModalVisible}
          onDismiss={() => setIsModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Add New Country</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setIsModalVisible(false)}
              style={styles.closeIcon}
            />
          </View>

          <Text style={styles.label}>Country Code</Text>
          <TextInput
            placeholder="Enter country code"
            placeholderTextColor="gray"
            value={newCountry.code}
            onChangeText={(text) =>
              setNewCountry((prev) => ({ ...prev, code: text }))
            }
            style={styles.input}
          />
          {addErrors.code && (
            <Text style={styles.errorText}>{addErrors.code}</Text>
          )}
          <Text style={styles.label}>Country Name</Text>
          <TextInput
            placeholder="Enter country name"
            placeholderTextColor="gray"
            value={newCountry.name}
            onChangeText={(text) =>
              setNewCountry((prev) => ({ ...prev, name: text }))
            }
            style={styles.input}
          />
          {addErrors.name && (
            <Text style={styles.errorText}>{addErrors.name}</Text>
          )}
          <Text style={styles.label}>Description</Text>
          <TextInput
            placeholder="Enter description"
            placeholderTextColor="gray"
            value={newCountry.description}
            onChangeText={(text) =>
              setNewCountry((prev) => ({ ...prev, description: text }))
            }
            style={styles.descriptionInput}
            multiline={true}
            numberOfLines={4}
          />
          {addErrors.description && (
            <Text style={styles.errorText}>{addErrors.description}</Text>
          )}
          <Button
            mode="contained"
            onPress={addCountry}
            style={styles.saveButton}
          >
            Save
          </Button>
        </Modal>
      </Portal>

      <View style={styles.tableContainer}>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title style={{ flex: 0.5 }}>#</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Code</DataTable.Title>
            <DataTable.Title style={{ flex: 2 }}>Name</DataTable.Title>
            <DataTable.Title style={{ flex: 4 }}>Description</DataTable.Title>
          </DataTable.Header>
          {filteredCountries.slice(from, to).map((country, index) => (
            <DataTable.Row
              key={country.CountryCode}
              onPress={() => handleRowPress(country)}
            >
              <DataTable.Cell style={{ flex: 0.5 }}>
                {index + 1 + from}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                {country.CountryCode}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 2 }}>
                {country.CountryName}
              </DataTable.Cell>
              <DataTable.Cell style={{ flex: 4 }}>
                {country.Description}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
          <DataTable.Pagination
            page={page}
            numberOfPages={Math.ceil(filteredCountries.length / itemsPerPage)}
            onPageChange={(newPage) => setPage(newPage)}
            label={`${from + 1}-${to} of ${filteredCountries.length}`}
            showFastPaginationControls
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            optionsLabel="Rows per page"
          />
        </DataTable>
      </View>

      {/* Action Modal */}
      <Portal>
        <Modal
          visible={isModalActionVisible && !!selectedCountry}
          onDismiss={() => setIsModalActionVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          {selectedCountry && (
            <View style={styles.modal}>
              <View style={styles.modalHeader2}>
                <Text style={styles.modalTitle}>Information</Text>
                <IconButton
                  icon="close"
                  size={24}
                  onPress={() => setIsModalActionVisible(false)}
                  style={styles.closeModal}
                />
              </View>
              <View style={styles.modalContent}>
                <Text>
                  <Text style={styles.textTitle}>Code:</Text>{' '}
                  {selectedCountry.CountryCode}
                </Text>
                <Text>
                  <Text style={styles.textTitle}>Name:</Text>
                  {selectedCountry.CountryName}
                </Text>
                <Text>
                  <Text style={styles.textTitle}>Description: </Text>
                  {selectedCountry.Description}
                </Text>
              </View>
              <View style={styles.modalButton}>
                <Button
                  buttonColor="#1FAB89"
                  textColor="#FFFFFF"
                  style={styles.editButton}
                  onPress={() => setIsEditModalVisible(true)}
                >
                  Edit
                </Button>
                <Button
                  buttonColor="red"
                  textColor="#FFFFFF"
                  onPress={() => setIsDeleteModalVisible(true)}
                >
                  Delete
                </Button>
              </View>
            </View>
          )}
        </Modal>
      </Portal>

      {/* Edit Country Modal */}
      <Portal>
        <Modal
          visible={isEditModalVisible}
          onDismiss={() => setIsEditModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Country</Text>
              <IconButton
                icon="close"
                size={24}
                onPress={() => setIsEditModalVisible(false)}
                style={styles.closeIcon}
              />
            </View>
            <Text style={styles.label}>Country Name</Text>
            <TextInput
              value={selectedCountry?.CountryName}
              onChangeText={(text) =>
                setSelectedCountry((prev) => ({ ...prev, CountryName: text }))
              }
              style={styles.input}
            />
            {editErrors.name && (
              <Text style={styles.errorText}>{editErrors.name}</Text>
            )}
            <Text style={styles.label}>Description</Text>
            <TextInput
              value={selectedCountry?.Description}
              onChangeText={(text) =>
                setSelectedCountry((prev) => ({ ...prev, Description: text }))
              }
              style={styles.descriptionInput}
              multiline={true}
              numberOfLines={4}
            />
            {editErrors.description && (
              <Text style={styles.errorText}>{editErrors.description}</Text>
            )}
            <Button
              mode="contained"
              onPress={editCountry}
              style={styles.saveButton}
            >
              Save Changes
            </Button>
          </View>
        </Modal>
      </Portal>

      {/* Delete Confirmation Modal */}
      <Portal>
        <Modal
          visible={isDeleteModalVisible}
          onDismiss={() => setIsDeleteModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalDelete}>
            <Text>Are you sure you want to delete this country?</Text>

            <View style={styles.modalButton}>
              <Button
                mode="contained"
                onPress={deleteCountry}
                buttonColor="red"
                textColor="#FFFFFF"
                style={styles.deleteButton}
              >
                Yes, Delete
              </Button>
              <Button
                mode="outlined"
                onPress={() => setIsDeleteModalVisible(false)}
                style={styles.cancelButton}
                textColor="#000000"
              >
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
      >
        {snackbarMessage}
      </Snackbar>
    </View>
  );
}

export default Country;
