import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableHighlight,
  Text,
  TextInput,
  View,
} from 'react-native';

import { actions } from 'react-native-navigation-redux-helpers';
import * as routes from '../ducks/routes';
import { getCityForecast } from '../ducks/weather';
import Style from '../lib/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { pushRoute } = actions;

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
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

  getForecast(search = 'colorado springs') {
    console.log(search);
    return () => {
      this.props.dispatch(getCityForecast(search));
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
        <View style={Style.header}>
          <Text style={Style.title}>{this.props.name}</Text>
          <Text>Search Page</Text>
        </View>
          <TouchableHighlight
            onPress={this.gotoPage()}
          >
            <Text>GO TO ROUTE</Text>
          </TouchableHighlight>

          <TouchableHighlight
            onPress={this.getForecast()}
          >
            <Text>Get forecast</Text>
          </TouchableHighlight>
        <View style={Style.searchRow}>
          <TextInput 
              autoFocus={true}
              autoCapitalize='words'
              placeholder='City'
              onChangeText={(text) => this.setState({text})}
              value={this.state.text}
              style={Style.searchInput}
          />
          <Icon name='magnify' style={Style.searchIcon} size={30} color="#9F9F9F"/>
        </View>
        <View>
          {this.renderWeather()}
        </View>
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

export default connect(mapStateToProps)(SearchPage);
