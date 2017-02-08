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
    paddingTop: 60
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
  },
  top: {
    flex: 2,
  },
  bottom: {
    flex: 3
  },
  currentTemp: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 100,
    fontWeight: '200'
  },
  forcastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 55,
    paddingTop: 10,
    borderTopWidth: 1,
    borderColor: '#A9A9A9'
  },
  forcastDay: {
    fontSize: 20,
    color: '#777777'
  },
  forcastDayDetails: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000'
  }

});

export default Style;