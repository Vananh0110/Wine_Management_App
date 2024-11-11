import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { Modal, Portal, Button, IconButton } from 'react-native-paper';
import styles from '../assets/styles/styles';

const AddCountryModal = ({ visible, onDismiss, onSave, newCountry, setNewCountry }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onDismiss}
        contentContainerStyle={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Add New Country</Text>
          <IconButton
            icon="close"
            size={24}
            onPress={onDismiss}
            style={styles.closeIcon}
          />
        </View>

        <Text style={styles.label}>Country Code</Text>
        <TextInput
          placeholder="Enter country code"
          placeholderTextColor="gray"
          value={newCountry.code}
          onChangeText={(text) => setNewCountry({ ...newCountry, code: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Country Name</Text>
        <TextInput
          placeholder="Enter country name"
          placeholderTextColor="gray"
          value={newCountry.name}
          onChangeText={(text) => setNewCountry({ ...newCountry, name: text })}
          style={styles.input}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          placeholder="Enter description"
          placeholderTextColor="gray"
          value={newCountry.description}
          onChangeText={(text) => setNewCountry({ ...newCountry, description: text })}
          style={styles.descriptionInput}
          multiline={true}
          numberOfLines={4}
        />

        <Button mode="contained" onPress={onSave} style={styles.saveButton}>
          Save
        </Button>
      </Modal>
    </Portal>
  );
};

export default AddCountryModal;
