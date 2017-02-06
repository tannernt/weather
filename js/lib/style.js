import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row'
  },
  searchInput: {
    height: 40,
    flex: 2,
    backgroundColor: '#FFFFFF'
  },
  searchIcon: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});

export default Style;