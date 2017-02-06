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

class Header extends React.Component {
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

  render() {
    return (
      <View style={Style.header}>
        <Text style={Style.title}>{this.props.name}</Text>
        <Text>Generic Page</Text>
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
