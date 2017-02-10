import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  ListView,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
// import { FormattedDate } from 'react-intl';
import * as routes from '../ducks/routes';
import { getCityWeather } from '../ducks/weather';
import Header from '../Header';
import Style from '../lib/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { pushRoute } = actions;

let data = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 != row2,
});

class ForecastPage extends React.Component {
//   constructor(props) {
//     super(props);
    
//     this.state = {
//       dataSource: data.cloneWithRows(this.props.weather.selectedCity.forecast)
//     }
//   }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.weather.selectedDay || nextProps.weather.selectedDay) {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_CITY_DAY_FORECAST
      }, this.props.navigation.key));
    }
  }

  gotoPage() {
    return () => {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_CITY_FORECAST
      }, this.props.navigation.key));
    };
  }

  getWeather() {
    return () => {
      this.props.dispatch(getCityWeather(this.props.search.city));
    };
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
          <View style={Style.currentWeather}>
          <Text style={Style.city}>{selectedCity.name}, {selectedCity.country}</Text>
          <Text style={Style.weatherDescription}>{selectedCity.forecast[0].description}</Text>
            <Text style={Style.temp}>
              {selectedCity.forecast[0].temp} <Icon name='temperature-fahrenheit' 
                    size={100}
                    color="#2D2D2D">
              </Icon>
            </Text>
          </View>
          <Text>{selectedCity.forecast[0].humidity}%</Text>
          <Text>{selectedCity.forecast[0].windSpeed} mph {this.getCardinal(selectedCity.forecast[0].windDirection)}</Text>
        </View>
      );
    }
  }
  
  renderForecast() {
    const { selectedCity } = this.props.weather;
    
    if (this.props.weather.selectedCity) {
      <View>
        <ListView
          enableEmptySections={true}
          dataSource={data.cloneWithRows(selectedCity.forecast)}
          renderRow={ (data) => <View style={Style.forecastRow} >
              <Text style={Style.forecastDay}>{data.dateTime}</Text>
              <Text style={Style.forecastDayDetails}>{data.temp}</Text>
            </View>}
        />
      </View>
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Image 
          style={Style.backdrop}
//           source={{uri: 'https://unsplash.com/photos/cSe3oKQ03OQ/download'}}>
          source={{uri: 'https://unsplash.com/photos/Ez5V2THOpDo/download'}}>
          <Header/>
            {this.renderWeather()}
          <View style={Style.bottom}>
            {this.renderForecast()}
          </View>
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
