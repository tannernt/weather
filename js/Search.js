import React from 'react';
import { connect } from 'react-redux';
import {
  TouchableHighlight,
  Text,
  View,
} from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import * as routes from './ducks/routes';
import { getCityForecast } from './ducks/weather';
import Style from './lib/style';


const { pushRoute } = actions;

class Search extends React.Component {
  render() {
    return (
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
    );
  }
}

export default Search;
