import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import * as routes from '../ducks/routes';
import { getCityForecast } from '../ducks/weather';
import Header from '../Header';
import Style from '../lib/style';


const { pushRoute } = actions;

class GenericPage extends React.Component {
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

  getForecast() {
    return () => {
      this.props.dispatch(getCityForecast('colorado springs'));
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
          {this.renderWeather()}
        </Image>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
    weather: state.weather,
  };
}

export default connect(mapStateToProps)(GenericPage);
