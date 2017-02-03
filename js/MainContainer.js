import React from 'react';
import { connect } from 'react-redux';
import Navigator from './Navigator';

class MainContainer extends React.Component {
  static propTypes = {
    navigation: React.PropTypes.object.isRequired,
  };

  render() {
    return (
      <Navigator
        navigation={this.props.navigation}
      />
    );
  }
}

function mapStateToProps(state) {
  return {
    navigation: state.navigation,
  };
}

export default connect(mapStateToProps)(MainContainer);