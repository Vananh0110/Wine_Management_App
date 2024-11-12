import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Image, Alert, FlatList } from 'react-native';
import {
  Card,
  ActivityIndicator,
  Searchbar,
  IconButton,
  Portal,
  Modal,
  Button,
  FAB,
} from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import styles from '../assets/styles/styles';
import axios from '../assets/api/axios';
import * as ImagePicker from 'expo-image-picker';

function Home() {
  const [wineData, setWineData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWine, setSelectedWine] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isAddWineModalVisible, setIsAddWineModalVisible] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [newWineData, setNewWineData] = useState({
    WineCode: '',
    WineName: '',
    AlcoholPercentage: '',
    Age: '',
    CountryCode: '',
  });
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchWineData = async () => {
    try {
      const response = await axios.get('/get-wines');
      setWineData(response.data.results);
      setFilteredData(response.data.results);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const fetchCountryData = async () => {
    try {
      const response = await axios.get('/get-countries');
      setCountryList(response.data.results);
    } catch (error) {
      console.error('Error fetching country data:', error);
    }
  };

  useEffect(() => {
    fetchWineData();
    fetchCountryData();
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

  const handleSave = async () => {
    if (
      !newWineData.WineCode ||
      !newWineData.WineName ||
      !newWineData.AlcoholPercentage ||
      !newWineData.Age ||
      !newWineData.CountryCode ||
      !selectedImage
    ) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      setLoading(true);
      const imageResponse = await fetch(selectedImage.uri);
      const blob = await imageResponse.blob();

      const formData = new FormData();
      formData.append('wine_code', newWineData.WineCode);
      formData.append('wine_name', newWineData.WineName);
      formData.append('alcohol_percentage', newWineData.AlcoholPercentage);
      formData.append('age', newWineData.Age);
      formData.append('country_code', newWineData.CountryCode);
      formData.append('image', blob, selectedImage.uri.split('/').pop());

      const uploadResponse = await fetch('http://localhost:5000/insert-wine', {
        method: 'POST',
        body: formData,
      });

      const result = await uploadResponse.json();

      if (uploadResponse.ok) {
        Alert.alert('Success', 'Wine added successfully');
        setIsAddWineModalVisible(false);
        fetchWineData();
      } else {
        console.error('Error:', result);
        Alert.alert('Error', result.message || 'Could not add wine');
      }
    } catch (error) {
      console.error('Error adding wine:', error);
      Alert.alert('Error', 'Could not add wine');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (wine) => {
    setSelectedWine(wine);
    setIsEditModalVisible(true);
  };

  const saveEdit = async () => {
    try {
      await axios.put('/update-wine', {
        wine_code: selectedWine.WineCode,
        wine_name: selectedWine.WineName,
        alcohol_percentage: selectedWine.AlcoholPercentage,
        age: selectedWine.Age,
        country_code: selectedWine.CountryCode,
      });
      fetchWineData();
      setIsEditModalVisible(false);
    } catch (error) {
      console.error('Error updating wine:', error);
    }
  };

  const handleDelete = (wine) => {
    setSelectedWine(wine);
    setIsDeleteModalVisible(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete('/delete-wine', {
        data: { wine_code: selectedWine.WineCode },
      });
      setWineData((prev) =>
        prev.filter((item) => item.WineCode !== selectedWine.WineCode)
      );
      setFilteredData((prev) =>
        prev.filter((item) => item.WineCode !== selectedWine.WineCode)
      );
      setIsDeleteModalVisible(false);
    } catch (error) {
      console.error('Error deleting wine:', error);
    }
  };

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const image = result.assets[0];
      setSelectedImage({
        uri: image.uri,
        name: image.uri.split('/').pop(),
        type: image.type || 'image/jpeg',
      });
    }
  };

  const renderWineItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: item.Image }} style={styles.image} />
      <Card.Actions style={styles.cardActions}>
        <IconButton
          icon="pencil"
          size={16}
          onPress={() => handleEdit(item)}
          containerColor="#1FAB89"
          iconColor="#FFFFFF"
        />
        <IconButton
          icon="delete"
          size={16}
          onPress={() => handleDelete(item)}
          containerColor="#1FAB89"
          iconColor="#FFFFFF"
        />
      </Card.Actions>
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
        inputStyle={styles.searchbarInput}
      />

      <FlatList
        data={filteredData}
        renderItem={renderWineItem}
        keyExtractor={(item, index) => `${item.WineCode}-${index}`}
        contentContainerStyle={styles.list}
        numColumns={2}
        showsVerticalScrollIndicator={false}
      />

      <Portal>
        <Modal
          visible={isDeleteModalVisible}
          onDismiss={() => setIsDeleteModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <View style={styles.modalDelete}>
            <Text>
              Are you sure you want to delete {selectedWine?.WineName}?
            </Text>
            <View style={styles.modalButton}>
              <Button
                mode="contained"
                onPress={confirmDelete}
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

      {/* Edit Wine Modal */}
      <Portal>
        <Modal
          visible={isEditModalVisible}
          onDismiss={() => setIsEditModalVisible(false)}
          contentContainerStyle={styles.modalEditContainer}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Wine</Text>
            <IconButton
              icon="close"
              size={24}
              onPress={() => setIsEditModalVisible(false)}
              style={styles.closeModal}
            />
          </View>
          <Text style={styles.label}>Name</Text>
          <TextInput
            placeholder="Wine Name"
            value={selectedWine?.WineName}
            onChangeText={(text) =>
              setSelectedWine((prev) => ({ ...prev, WineName: text }))
            }
            style={styles.input}
          />
          <Text style={styles.label}>Alcohol Percentage</Text>
          <TextInput
            placeholder="Alcohol Percentage"
            value={selectedWine?.AlcoholPercentage?.toString()}
            onChangeText={(text) =>
              setSelectedWine((prev) => ({ ...prev, AlcoholPercentage: text }))
            }
            style={styles.input}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Age</Text>
          <TextInput
            placeholder="Age"
            value={selectedWine?.Age?.toString()}
            onChangeText={(text) =>
              setSelectedWine((prev) => ({ ...prev, Age: text }))
            }
            style={styles.input}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Country Code</Text>
          <Picker
            selectedValue={selectedWine?.CountryCode}
            onValueChange={(value) =>
              setSelectedWine((prev) => ({ ...prev, CountryCode: value }))
            }
            style={styles.picker}
          >
            {countryList.map((country) => (
              <Picker.Item
                style={styles.picker}
                label={`${country.CountryCode} - ${country.CountryName}`}
                value={country.CountryCode}
                key={country.CountryCode}
              />
            ))}
          </Picker>
          <Button mode="contained" onPress={saveEdit} style={styles.saveButton}>
            Save Changes
          </Button>
        </Modal>
      </Portal>

      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => setIsAddWineModalVisible(true)}
        color="white"
      />

      {/* Add Wine Modal */}
      <Portal>
        <Modal
          visible={isAddWineModalVisible}
          onDismiss={() => setIsAddWineModalVisible(false)}
          contentContainerStyle={styles.modalContainer}
        >
          <Text style={styles.formTitle}>Add New Wine</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter wine code"
            value={newWineData.WineCode}
            onChangeText={(text) =>
              setNewWineData((prev) => ({ ...prev, WineCode: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter wine name"
            value={newWineData.WineName}
            onChangeText={(text) =>
              setNewWineData((prev) => ({ ...prev, WineName: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter alcohol percentage"
            value={newWineData.AlcoholPercentage}
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewWineData((prev) => ({ ...prev, AlcoholPercentage: text }))
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Enter age"
            value={newWineData.Age}
            keyboardType="numeric"
            onChangeText={(text) =>
              setNewWineData((prev) => ({ ...prev, Age: text }))
            }
          />
          <Picker
            selectedValue={newWineData.CountryCode}
            onValueChange={(value) =>
              setNewWineData((prev) => ({ ...prev, CountryCode: value }))
            }
            style={styles.picker}
          >
            <Picker.Item label="Select Country" value="" />
            {countryList.map((country) => (
              <Picker.Item
                label={`${country.CountryCode} - ${country.CountryName}`}
                value={country.CountryCode}
                key={country.CountryCode}
              />
            ))}
          </Picker>
          <Button
            mode="outlined"
            icon="camera"
            textColor="black"
            onPress={handleImagePicker}
            style={{
              borderColor: '#1FAB89',
              borderWidth: 1,
            }}
          >
            Choose Image
          </Button>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.uri }}
              style={styles.imagePreview}
            />
          )}
          <Button
            mode="contained"
            onPress={handleSave}
            style={styles.saveFormButton}
          >
            {loading ? <ActivityIndicator animating={true} /> : 'Save Wine'}
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

export default Home;
