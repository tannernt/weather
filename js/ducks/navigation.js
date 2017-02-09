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
    {
      key: routes.ROUTE_CITY_FORECAST,
      index: 1,
    },
    {
      key: routes.ROUTE_CITY_DAY_FORECAST,
      index: 2,
    }
  ],
};

export default getNavigationReducer(initialState);