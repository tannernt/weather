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


let days = [
  { day: 'Monday', temp: '45'},
  { day: 'Tuesday', temp: '56'},
  { day: 'Wednesday', temp: '47'},
  { day: 'Thursday', temp: '49'},
  { day: 'Friday', temp: '52'},
]

let data = new ListView.DataSource({
  rowHasChanged: (row1, row2) => row1 != row2,
});

class ForecastPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: data.cloneWithRows(days)
    }
  }
  
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
    //Should never happen: 
    return "N";
};

  renderWeather() {
    const { selectedCity } = this.props.weather;
    if (this.props.weather.selectedCity) {
      return (
        <View>
          <Text>{selectedCity.name}, {selectedCity.country}</Text>
          <Text>{selectedCity.weatherDescription}</Text>
          <View style={Style.currentTemp}>
            <Text style={Style.temp}>{selectedCity.temp} <Icon name='temperature-fahrenheit' 
                    size={100}
                    color="#2D2D2D"></Icon></Text>
          </View>
          <Text>{selectedCity.humidity}%</Text>
          <Text>{selectedCity.windSpeed} mph {this.getCardinal(selectedCity.windDirection)}</Text>
          
          {selectedCity.forecast.map((f, index) => (
            <Text
              key={index}
            >
              {f.temp} degrees
            </Text>
          ))}
        </View>
      );
    }

    return <Text>No Weather yet</Text>;
  }

  render() {
    return (
      <View style={Style.container}>
        <Image 
          style={Style.backdrop}
//           source={{uri: 'https://unsplash.com/photos/cSe3oKQ03OQ/download'}}>
          source={{uri: 'https://unsplash.com/photos/Ez5V2THOpDo/download'}}>
          <Header/>
          <View style={Style.top}>
            
            <View>{this.renderWeather()}</View>
          </View>
          <View style={Style.bottom}>
            <ListView
              enableEmptySections={true}
              dataSource={this.state.dataSource}
              renderRow={ (rowData) => (
                <View style={Style.forcastRow}>
                  <Text style={Style.forcastDay}>{rowData.day}</Text>
                  <Text style={Style.forcastDayDetails}>{rowData.temp}</Text>
                </View>
              )}
            />
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
