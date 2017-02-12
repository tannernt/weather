import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
//   Picker,
  ScrollView,
  TouchableHighlight,
  Text,
  TextInput,
  View,
} from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import update from 'immutability-helper';
// import ScrollPicker from 'react-native-picker-scrollview';
import * as routes from '../ducks/routes';
import { setSearchHistory, getCityForecast } from '../ducks/weather';
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

  getForecast() {
    return () => {
      this.props.dispatch(setSearchHistory(this.state.search.city, this.props.weather.searchHistory));
      this.props.dispatch(getCityForecast(this.state.search.city, this.props.navigation.key));
    };
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
        source={require('../img/weather_vane.png')}>
          <View style={Style.searchTop}>
            <View style={Style.searchWrapper}>
              <View>
                <TextInput 
                    autoFocus={true}
                    autoCapitalize='words'
                    placeholder='City'
                    onChangeText={this.onSearchChange()}
                    value={this.state.search.city}
                    style={Style.searchInput}
                />
              </View>
              <View style={Style.searchButton}>
                <Icon.Button
                    name='magnify' 
                    style={Style.searchIcon} 
                    size={26}
                    color="#2D2D2D"
                    onPress={this.getForecast()}>
                  <Text style={Style.searchButtonText}>Search City</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
          <View style={Style.searchBottom}>
             
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
