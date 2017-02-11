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
  


  getForecast() {
    return () => {
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
