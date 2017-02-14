import { StyleSheet } from 'react-native';

var Style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  title: {
    alignSelf: 'center',
    fontWeight: '600',
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
    flex: 4,
  },
  bottom: {
    flex: 3,
  },
  currentWeather: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  city: {
    paddingTop: 10,
    fontSize: 40,
    fontWeight: '300'
  },
  weatherDescription: {
    fontSize: 30,
    fontWeight: '200'
  },
  temp: {
    fontSize: 100,
    fontWeight: '400'
  },
  tempIcon: {
    textAlignVertical: 'top'
  }
});

export default Style;