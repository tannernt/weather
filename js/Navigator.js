import React from 'react';
import {
  BackAndroid,
  Dimensions,
  NavigationExperimental,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import { actions } from 'react-native-navigation-redux-helpers';
import GenericPage from './pages/GenericPage';
import * as routes from './ducks/routes';

const {
  popRoute,
} = actions;

const {
  CardStack: NavigationCardStack,
} = NavigationExperimental;

class Navigator extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.shape({
      key: React.PropTypes.string,
      routes: React.PropTypes.array,
    }),
  };

  componentDidMount() {
    BackAndroid.addEventListener('hardwareBackPress', this.onNavigateBack());
  }

  onNavigateBack() {
    return () => {
      const navigation = this.props.navigation;
      const rootRoute = navigation.routes[navigation.routes.length - 1].key;

      if (rootRoute === navigation.key) {
        return false;
      }

      this.props.dispatch(popRoute(this.props.navigation.key));
      return true;
    };
  }

  renderScene() {
    return (props) => {
      let page;
      switch (props.scene.route.key) {
        case routes.ROUTE_CITY_FORECAST:
          page = <GenericPage name="CITY"/>;
          break;
        case routes.ROUTE_CITY_DAY_FORECAST:
          page = <GenericPage name="DAY"/>;
          break;
        default:
          page = <GenericPage name="HOME"/>;
          break;
      }

      return page;
    };
  }

  render() {
    return (
      <NavigationCardStack
        navigationState={this.props.navigation}
        onNavigateBack={this.onNavigateBack()}
        renderScene={this.renderScene()}
      />
    );
  }
}

export default connect()(Navigator);