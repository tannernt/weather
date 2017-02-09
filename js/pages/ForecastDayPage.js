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
import * as routes from '../ducks/routes';
import { getCityWeather } from '../ducks/weather';
import Header from '../Header';
import Style from '../lib/style';


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

class ForecastDayPage extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: data.cloneWithRows(days)
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if (!this.props.weather.selectedCity || nextProps.weather.selectedCity) {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_CITY_FORECAST
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

  renderWeather() {
    const { selectedCity } = this.props.weather;
    if (this.props.weather.selectedCity) {
      return (
        <View>
          <Text>City: {selectedCity.name}</Text>
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
            <Text style={Style.currentTemp}>45</Text>
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

export default connect(mapStateToProps)(ForecastDayPage);
