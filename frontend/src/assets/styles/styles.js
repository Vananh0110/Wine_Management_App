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
});

export default styles;
