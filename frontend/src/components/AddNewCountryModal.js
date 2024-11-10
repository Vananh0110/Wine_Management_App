import React from 'react';
import { View, Text } from 'react-native';
import { Modal, Portal, TextInput, Button } from 'react-native-paper';
import styles from '../assets/styles/styles';

const AddCountryModal = ({ visible, onDismiss, onSave, newCountry, setNewCountry }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.modalTitle}>Add New Country</Text>
        
        <TextInput
          label="Country Code"
          value={newCountry.code}
          onChangeText={(text) => setNewCountry({ ...newCountry, code: text })}
          style={styles.input}
        />
        
        <TextInput
          label="Country Name"
          value={newCountry.name}
          onChangeText={(text) => setNewCountry({ ...newCountry, name: text })}
          style={styles.input}
        />
        
        <TextInput
          label="Description"
          value={newCountry.description}
          onChangeText={(text) => setNewCountry({ ...newCountry, description: text })}
          style={styles.input}
        />
        
        <Button mode="contained" onPress={onSave} style={styles.saveButton}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
};

export default AddCountryModal;
