import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
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
    
    this.state = { 
      search: { city: '' }
    };
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

  getForecast() {
    return () => {
      this.props.dispatch(getCityForecast(this.state.search.city));
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
  
  onSearchChange() {
    return (text) => {
      const newState = {search: { city: text }}
      this.setState(newState);
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Image 
        style={Style.backdrop} 
        source={{uri: 'https://unsplash.com/photos/W0ZYnYIhhDc/download'}}>
        
        <View style={Style.searchRow}>
          <TextInput 
              autoFocus={true}
              autoCapitalize='words'
              placeholder='City'
              onChangeText={this.onSearchChange()}
              value={this.state.search.city}
              style={Style.searchInput}
          />
          <Icon 
            name='magnify' 
            style={Style.searchIcon} 
            size={30} 
            color="#9F9F9F"
            onPress={this.getForecast()}/>
        </View>
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

export default connect(mapStateToProps)(SearchPage);
