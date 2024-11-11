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
    fontWeight: 'bold'
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
    fontSize: 16,
    marginBottom: 6,
    marginTop: 3,
  },
  infoText: {
    fontSize: 14,
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
    transform: [{ scale: 0.85 }]
    
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
    padding: 20,
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeIcon: {
    marginRight: -10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#333', // Màu sắc của nhãn
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingTop: 10,
    textAlignVertical: 'top',
    fontSize: 16,
    marginBottom: 15,
  },
  saveButton: {
    marginTop: 10,
    backgroundColor: '#62D2A2',
  },
  tableContainer: {   
    marginTop: 10,             
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
});

export default styles;
