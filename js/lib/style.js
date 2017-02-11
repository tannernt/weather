import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 10,
    backgroundColor: '#F9F9F9'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
  },
  searchTop: {
    flex: 2,
  },
  searchBottom: {
    flex: 1
  },
  searchWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    padding: 5,
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF'
  },
  searchButton: {
    paddingTop: 20,
    alignSelf: 'center'
  },
  searchButtonText: {
    fontSize: 16,
  },
  searchIcon: {
    height: 40,
    width: 200,
    borderWidth: 0.25,
    borderColor: '#7F7F7F',
    backgroundColor: '#9F9F9F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backdrop: {
    flex: 1,
    width: null,
    height: null
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
    flex: 2
  },
  currentWeather: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  city: {
    paddingTop: 30,
    fontSize: 40,
    fontWeight: '300'
  },
  weatherDescription: {
    fontSize: 30,
    fontWeight: '200'
  },
  temp: {
    fontSize: 100,
    fontWeight: '200'
  },
  forecastRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: 55,
    padding: 10,
    borderTopWidth: 1,
    borderColor: '#A9A9A9'
  },
  forecastDay: {
    flex: 1,
    fontSize: 20,
    color: '#777777',
    justifyContent: 'space-around',
  },
  forecastIcon: {
    flex: 1,
    justifyContent: 'space-around'
  },
  forecastDayDetails: {
    fontSize: 20,
    fontWeight: '300',
    color: '#000000',
    justifyContent: 'flex-end'
  }
});

export default Style;