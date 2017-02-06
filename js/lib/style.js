import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 20,
//     paddingBottom: 10,
    backgroundColor: '#F9F9F9'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  searchRow: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 10
  },
  searchInput: {
    height: 40,
    flex: 2,
    backgroundColor: '#FFFFFF'
  },
  searchIcon: {
    height: 40,
    flex: 1,
    justifyContent: 'flex-end'
  },
  backdrop: {
    flex: 1,
    resizeMode: 'cover'
  },
  backdropView: {
    height: 120,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  headline: {
    fontSize: 20,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    color: 'white'
  }

});

export default Style;