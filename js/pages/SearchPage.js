import React from 'react';
import { connect } from 'react-redux';
import {
  Image,
  StyleSheet,
  Picker,
  TouchableHighlight,
  Text,
  TextInput,
  View,
} from 'react-native';
import { actions } from 'react-native-navigation-redux-helpers';
import update from 'immutability-helper';
import * as routes from '../ducks/routes';
import { setSearchHistory, getCityForecast } from '../ducks/weather';
import Style from '../lib/style';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { pushRoute } = actions;

let styles = StyleSheet.create({
  searchTop: {
    flex: 2,
  },
  searchBottom: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  searchWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchInput: {
    padding: 5,
    height: 40,
    width: 200,
    backgroundColor: '#FFFFFF'
  },
  searchButton: {
    paddingTop: 20,
    alignSelf: 'center'
  },
  searchButtonText: {
    fontSize: 16,
  },
  searchIcon: {
    height: 40,
    width: 200,
    borderWidth: 0.25,
    borderColor: '#7F7F7F',
    backgroundColor: '#9F9F9F',
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchHistoryWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchTitle: {
    fontSize: 18,
    fontWeight: '600'
  },
  searchHistoryItem: {
    color: '#FFF'
  }
});

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
      
      const newState = {search: { city: '' }}
      this.setState(newState);
    };
  }
  
  onSearchChange() {
    return (text) => {
      const newState = {search: { city: text }}
      this.setState(newState);
    }
  }
  
  renderSearchHistory() { 
    if (this.props.weather.searchHistory.length > 0) {
      return (
        <View>
          <Text style={styles.searchTitle}>Recent Searches</Text>
          <Picker
              selectedValue={this.state.search.city}
              onValueChange={this.onSearchChange()}>
              {this.props.weather.searchHistory.map((search, index) => (
                  <Picker.Item 
                  key={index} 
                  label={search}
                  value={search}/>
              ))}
            </Picker>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={Style.container}>
        <Image 
        style={Style.backdrop} 
        source={require('../img/weather_vane.png')}>
          <View style={styles.searchTop}>
            <View style={styles.searchWrapper}>
              <View>
                <TextInput 
                    autoFocus={true}
                    autoCapitalize='words'
                    placeholder='City'
                    onChangeText={this.onSearchChange()}
                    value={this.state.search.city}
                    style={styles.searchInput}
                />
              </View>
              <View style={styles.searchButton}>
                <Icon.Button
                    name='magnify' 
                    style={styles.searchIcon} 
                    size={26}
                    color="#2D2D2D"
                    onPress={this.getForecast()}>
                  <Text style={styles.searchButtonText}>Search City</Text>
                </Icon.Button>
              </View>
            </View>
          </View>
          <View style={styles.searchHistoryWrapper}>
            {this.renderSearchHistory()}
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
