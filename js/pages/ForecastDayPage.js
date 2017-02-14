import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ListView,
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import * as routes from '../ducks/routes';
import { getCityWeather } from '../ducks/weather';
import Header from '../components/Header';
import Style from '../lib/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';


let data = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 != row2,
});

let styles = StyleSheet.create({
  detailsWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  forecastDetailsWrapper: {
    flex: 1
  },
  forecastDetails: {
    fontSize: 18,
    fontWeight: '400',
    padding: 5
  },
});

class ForecastDayPage extends React.Component {

  getWeather() {
    return () => {
      this.props.dispatch(getCityWeather(this.props.search.city));
    };
  }
  
  getWeatherIcon(description) {
    switch(description) {
      case 'Clear':
        return 'weather-sunny';
      case 'Clouds':
        return 'weather-cloudy';
      case 'Drizzle':
        return 'weather-pouring';
      case 'Rain':
        return 'weather-rainy';
      case 'Rhunderstorm':
        return 'weather-ligthning-rainy';
      case 'Snow':
        return 'weather-snowy';
      case 'Atmosphere':
        return 'weather-fog';
      case 'Extreme':
      case 'Additional':
        return 'weather-windy';
      default:
        return 'weather-sunny';
    }
  }
  
  getCardinal(angle) {
    //easy to customize by changing the number of directions you have 
    var directions = 8;

    var degree = 360 / directions;
    angle = angle + degree/2;

    if (angle >= 0 * degree && angle < 1 * degree)
        return "N";
    if (angle >= 1 * degree && angle < 2 * degree)
        return "NE";
    if (angle >= 2 * degree && angle < 3 * degree)
        return "E";
    if (angle >= 3 * degree && angle < 4 * degree)
        return "SE";
    if (angle >= 4 * degree && angle < 5 * degree)
        return "S";
    if (angle >= 5 * degree && angle < 6 * degree)
        return "SW";
    if (angle >= 6 * degree && angle < 7 * degree)
        return "W";
    if (angle >= 7 * degree && angle < 8 * degree)
        return "NW";
    return "N";
  };

  renderWeather() {
    const { selectedCity } = this.props.weather;
    const selectedDay = this.props.weather.selectedDay;

    if (this.props.weather.selectedCity && selectedDay) {
      return (
        <View style={Style.top}>
          <View style={Style.currentWeather}>
          <Text style={Style.city}>{selectedCity.name}, {selectedCity.country}</Text>
          <Text style={Style.weatherDescription}>{selectedDay.description}</Text>
          <Text style={Style.temp}>
            <Icon name={this.getWeatherIcon(selectedDay.mainDescription)}
                    style={styles.forecastIcon}
                    size={100}
                    color="#2D2D2D">
            </Icon>
            {selectedDay.temp}
            <Icon name='temperature-fahrenheit' 
                  size={60}
                  style={Style.tempIcon}
                  color="#2D2D2D">
            </Icon>
          </Text>
          </View>

          
        </View>
      );
    }
  }
  
  renderWeatherDetail() {
    const selectedDay = this.props.weather.selectedDay;

    if (selectedDay) {
      return (
        <View style={Style.bottom}>
          <View style={styles.detailsWrapper}>
            <View style={styles.forecastDetailsWrapper}>
              <Text style={styles.forecastDetails}>Low Temp: {selectedDay.lowTemp} <Icon name='temperature-fahrenheit' 
                    size={16}
                    color="#2D2D2D">
                </Icon>
              </Text>
              <Text style={styles.forecastDetails}>High Temp: {selectedDay.highTemp} <Icon name='temperature-fahrenheit' 
                    size={16}
                    color="#2D2D2D">
                </Icon>
              </Text>
              <Text style={styles.forecastDetails}>Humidity: {selectedDay.humidity}%</Text>
              <Text style={styles.forecastDetails}>Wind: {this.getCardinal(selectedDay.windDirection)} {selectedDay.windSpeed} mph</Text>
              <Text style={styles.forecastDetails}>Pressure: {selectedDay.pressure} hPa</Text>
            </View>
          </View>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Image 
          style={Style.backdrop}
          source={require('../img/clouds.png')}>
          <Header/>
          {this.renderWeather()}
          {this.renderWeatherDetail()}
        </Image>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    selectedCity: state.city,
    weather: state.weather,
  };
}

export default connect(mapStateToProps)(ForecastDayPage);
