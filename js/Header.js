import React from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
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


let styles = StyleSheet.create({
  header: {
    borderBottomWidth: 0.5,
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 5,
    opacity: 0.4,
    backgroundColor: '#F9F9F9'
  },
  navBack: {
    flexDirection: 'row',
    alignItems: 'center'
  },
});

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
      <View style={styles.header}>
        <Text>{this.props.name}</Text>
        <TouchableHighlight
          onPress={this.navigateBack()}
        >
          <View style={styles.navBack}>
            <Icon name='code-less-than' 
                size={26}
                color="#2D2D2D">
            </Icon>
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
