import axios from 'axios';
import moment from 'moment';
import { sortBy } from 'lodash';

import * as routes from '../ducks/routes';
import { navigateTo } from './navigation';
import update from 'immutability-helper';

export const SET_SEARCH_HISTORY = 'SET_SEARCH_HISTORY';

export const setSearchHistory = (search, currentHistory) =>{
  const newSearch = [search];
  const newSearchHistory = update(currentHistory, {$push: newSearch});
  return (dispatch) => dispatch({
    type: SET_SEARCH_HISTORY, 
    payload: newSearchHistory,
  });
}

export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const GET_CITY_FORECAST_ERROR = 'GET_CITY_FORECAST_ERROR';

export const getCityForecast = (city, currentKey) => {
  return (dispatch) => {
    
    var url = WEATHER_URL + `?q=${city}&units=imperial&type=accurate&mode=json&appid=${WEATHER_API_KEY}`;
    axios.get(url)
      .then((response) => {
        dispatch({
          type: GET_CITY_FORECAST_SUCCESS,
          payload: {
            name: response.data.city.name,
            country: response.data.city.country,
            currentForecast: {
              dateTime: (response.data.list[0].dt * 1000),
              description: response.data.list[0].weather[0].description,
              temp: response.data.list[0].temp.day.toFixed(0),
              lowTemp: response.data.list[0].temp.min.toFixed(0),
              highTemp: response.data.list[0].temp.max.toFixed(0),
              humidity: response.data.list[0].humidity,
              mainDescription: response.data.list[0].weather[0].main,
              pressure: response.data.list[0].pressure,
              windSpeed: response.data.list[0].speed.toFixed(0),
              windDirection: response.data.list[0].deg
            },
            forecast: Object.keys(response.data.list).map(function(key) {
              return {
                dateTime: (this[key].dt * 1000),
                description: this[key].weather[0].description,
                temp: this[key].temp.day.toFixed(0),
                lowTemp: this[key].temp.min.toFixed(0),
                highTemp: this[key].temp.max.toFixed(0),
                humidity: this[key].humidity,
                mainDescription: this[key].weather[0].main,
                pressure: this[key].pressure,
                windSpeed: this[key].speed.toFixed(0),
                windDirection: this[key].deg
              }
            }, response.data.list),
          },

        });
      
        dispatch(navigateTo(routes.ROUTE_CITY_FORECAST, currentKey));
    })
    .catch((error) => {
      console.error(error);
      dispatch({
        type: GET_CITY_FORECAST_ERROR,
        payload: error,
      })
    });
  };
};

export const SORT_FORECAST = 'SORT_FORECAST';

export const sortForecast = (orderBy, currentForecast) =>{
  console.log(currentForecast);
  const newForecastOrder = sortBy(currentForecast.forecast, orderBy);
  return (dispatch) => dispatch({
    type: SORT_FORECAST, 
    payload: {
      name: currentForecast.name,
      country: currentForecast.country,
      currentForecast: currentForecast.currentForecast,
      forecast: newForecastOrder
    },
  });
}

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const setSelectedDay = (day) =>{
  return (dispatch) => dispatch({type: SET_SELECTED_CITY, payload: day});
}
  
const initialState = {
  searchHistory: [],
  selectedCity: false,
  selectedDay: false
};

const weather = (state = initialState, action) => {
  switch(action.type) {
    case SET_SEARCH_HISTORY:
      return {
        ...state,
        searchHistory: action.payload
      }
    case GET_CITY_FORECAST_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload,
      }
    case GET_CITY_FORECAST_ERROR:
      return {
        ...state,
        error: action.payload
      }
    case SORT_FORECAST:
      return {
        ...state,
        selectedCity: action.payload
      }
    case SET_SELECTED_CITY:
      return {
        ...state,
        selectedDay: action.payload
      }
    default:
      return state;
  }
};

export default weather;