import * as routes from './routes';
import getNavigationReducer from './navigationReducer';
import { actions } from 'react-native-navigation-redux-helpers';

const { pushRoute } = actions;

export const navigateTo = (key, currentKey) => {
  return (dispatch) => dispatch(pushRoute({key}, currentKey));
};

const initialState = {
  key: routes.ROUTE_HOME,
  index: 0,
  routes: [
    {
      key: routes.ROUTE_HOME,
      index: 0,
    },
  ],
};

export default getNavigationReducer(initialState);