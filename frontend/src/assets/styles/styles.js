import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = width / 2 - 30;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
  },
  titleStyle: {
    fontSize: 18,
    color: '#00000',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: cardWidth,
    margin: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#D7FBE8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    borderWidth: 1,
    borderColor: '#C0C0C0',
  },
  image: {
    width: cardWidth,
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  wineName: {
    fontWeight: '900',
    fontSize: 14,
    marginBottom: 6,
    marginTop: 3,
  },
  infoText: {
    fontSize: 12,
    marginBottom: 4,
  },
  alcohol: {
    fontSize: 12,
  },
  list: {
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  searchbar: {
    marginTop: 10,
    marginBottom: 20,
    backgroundColor: '#D7FBE8',
  },
  searchbar2: {
    backgroundColor: '#D7FBE8',
    transform: [{ scale: 0.9 }],
  },
  animatedSearchBar: {
    flex: 1,
  },
  searchbarInput: {
    fontSize: 14,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#62D2A2',
  },
  modalContainer: {
    backgroundColor: 'white',
    paddingTop: 5,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
    margin: 20,
    borderRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 14,
  },
  descriptionInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    fontSize: 14,
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 60,
    backgroundColor: '#1FAB89',
  },
  tableContainer: {
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    backgroundColor: '#fff',
  },
  modalHeader2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalContent: {
    borderWidth: 0.5,
    padding: 10,
    borderRadius: 6,
    borderColor: '#C1C1C1',
    flexDirection: 'column',
    gap: 8,
  },
  textTitle: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 10,
    marginTop: 20,
  },
  modalDelete: {
    paddingTop: 15,
  },
  modalEditContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    paddingTop: 20,
    paddingBottom: 40,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 8,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 6,
    padding: 10,
  },
  fab: {
    position: 'absolute',
    left: 20,
    bottom: 16,
    backgroundColor: '#1FAB89',
  },
  formContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  formTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop: 10,
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  imagePickerButton: {
    padding: 10,
    backgroundColor: '#1FAB89',
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePickerText: {
    color: '#ffffff',
    fontSize: 16,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginBottom: 15,
    alignSelf: 'center',
  },
  saveFormButton: {
    marginTop: 20,
    backgroundColor: '#1FAB89',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
  },
  adjustButton: {
    marginHorizontal: 5,
    borderColor: '#1FAB89',
    borderWidth: 1,
    borderRadius: 10,
  },
  adjustButtonText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1FAB89',
  },
  inputSearch: {
    backgroundColor: 'rgb(249 249 249);'
  }
});

export default styles;
