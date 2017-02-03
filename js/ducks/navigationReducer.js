import { cardStackReducer } from 'react-native-navigation-redux-helpers';

const getNavigationReducer = (initialState) => {
  return cardStackReducer(initialState);
};
export default getNavigationReducer;