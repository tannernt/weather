import * as routes from './routes';
import getNavigationReducer from './navigationReducer';

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