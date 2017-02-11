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
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const {
  popRoute,
} = actions;


class Header extends React.Component {

  
  navigateBack() {
    return () => {
      const {
        navigation,
        dispatch,
      } = this.props;
      dispatch(popRoute(navigation.key));
    };
  }
  
  render() {
    return (
      <View style={Style.header}>
        <Text style={Style.back}>{this.props.name}</Text>
        <TouchableHighlight
          onPress={this.navigateBack()}
        >
          <View><Icon name='keyboard-return' 
                size={26}
                color="#2D2D2D"/>
          <Text>Back</Text>
            </View>
        </TouchableHighlight>
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

export default connect(mapStateToProps)(Header);
