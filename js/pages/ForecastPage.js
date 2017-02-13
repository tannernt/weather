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
import { getCityWeather, setSelectedDay, sortForecast } from '../ducks/weather';
import { navigateTo } from '../ducks/navigation';
import Header from '../Header';
import Style from '../lib/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import moment from 'moment';



let data = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 != row2,
});

let styles = StyleSheet.create({
  weatherUnitWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  forecastSortWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  forecastSort: {
    padding: 2
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  innerContainer: {
    borderRadius: 10,
    alignItems: 'center',
  },
});

class ForecastPage extends React.Component {

  gotoPage(day) {
    return () => {
      this.props.dispatch(setSelectedDay(day));
      this.props.dispatch(navigateTo(routes.ROUTE_CITY_DAY_FORECAST, this.props.navigation.key));
    };
  }

  getWeather() {
    return () => {
      this.props.dispatch(getCityWeather(this.props.search.city));
    };
  }
  
  sortForecast(orderBy) {
    return () => {
      this.props.dispatch(sortForecast(orderBy, this.props.weather.selectedCity));
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
    
    if (this.props.weather.selectedCity) {
      return (
        <View style={Style.top}>
          <View style={styles.weatherUnitWrapper}>
            <TouchableHighlight>
              <Icon name='temperature-fahrenheit' 
                size={24}
                color="#2D2D2D">
              </Icon>
            </TouchableHighlight>
            <Text>/</Text>
            <TouchableHighlight>
              <Icon name='temperature-celsius' 
                size={24}
                color="#2D2D2D">
              </Icon>
            </TouchableHighlight>
          </View>
          <View style={Style.currentWeather}>
          <Text style={Style.city}>{selectedCity.name}, {selectedCity.country}</Text>
          <Text style={Style.weatherDescription}>{selectedCity.currentForecast.description}</Text>
            <Text style={Style.temp}>
              {selectedCity.currentForecast.temp} <Icon name='temperature-fahrenheit' 
                    size={100}
                    color="#2D2D2D">
              </Icon>
            </Text>
          </View>
          <View style={styles.forecastSortWrapper}>
            <TouchableHighlight
              onPress={this.sortForecast('dateTime')}>
              <Text style={styles.forecastSort}>Day</Text>
            </TouchableHighlight>
            <Text>|</Text>
            <TouchableHighlight
              onPress={this.sortForecast('temp')}>
              <Text style={styles.forecastSort}>Temp</Text>
            </TouchableHighlight>
            <Text>|</Text>
            <TouchableHighlight
              onPress={this.sortForecast('humidity')}>
              <Text style={styles.forecastSort}>Hum</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    }
  }
  
  renderForecast() {
    const { selectedCity } = this.props.weather;
    
    if (this.props.weather.selectedCity) {
      return (
        <View style={Style.bottom}>
          <ListView
            enableEmptySections={true}
            dataSource={data.cloneWithRows(selectedCity.forecast)}
            renderRow={ (data) => <TouchableHighlight
            onPress={this.gotoPage(data)}>
                <View style={Style.forecastRow} >
                  <Text style={Style.forecastDay}>{moment.utc(data.dateTime).format('dddd')}</Text>
                  <Icon name={this.getWeatherIcon(data.mainDescription)}
                    style={Style.forecastIcon}
                    size={30}
                    color="#2D2D2D">
                  </Icon>
                  <Text style={Style.forecastDayDetails}>{data.temp}</Text><Icon name='temperature-fahrenheit' 
                    size={18}
                    color="#2D2D2D">
                  </Icon>
                  <Text> / </Text><Text style={Style.forecastDayDetails}>{data.humidity}%</Text>
                </View>
              </TouchableHighlight>}
          />
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
            {this.renderForecast()}
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

export default connect(mapStateToProps)(ForecastPage);
