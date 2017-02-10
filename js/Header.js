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

const { pushRoute } = actions;

class Header extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (!this.props.weather.selectedCity || nextProps.weather.selectedCity) {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_CITY_FORECAST
      }, this.props.navigation.key));
    }
  }
  
  gobackPage() {
    return () => {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_HOME
      }, this.props.navigation.key));
    };
  }

  gotoPage() {
    return () => {
      this.props.dispatch(pushRoute({
        key: routes.ROUTE_CITY_FORECAST
      }, this.props.navigation.key));
    };
  }

  render() {
    return (
      <View style={Style.header}>
        <Text style={Style.back}>{this.props.name}</Text>
        <TouchableHighlight
          onPress={this.gotoPage()}
        >
          <View><Icon name='home' 
                size={26}
                color="#2D2D2D"/>
          <Text>Home</Text>
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
