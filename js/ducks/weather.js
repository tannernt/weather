import axios from 'axios';
import moment from 'moment';

import * as routes from '../ducks/routes';
import { navigateTo } from './navigation';


export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const GET_CITY_FORECAST_ERROR = 'GET_CITY_FORECAST_ERROR';

export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';

export const setSelectedDay = (day) =>{
  return (dispatch) => dispatch({type: SET_SELECTED_CITY, payload: day});
}

export const getCityForecast = (city, currentKey) => {
  return (dispatch) => {
    
    var url = WEATHER_URL + `?q=${city}&units=imperial&type=accurate&mode=json&appid=${WEATHER_API_KEY}`;
    console.log('city', city, 'url', url);
    axios.get(url)
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_CITY_FORECAST_SUCCESS,
//           searchHistory: Object.push(city),
          payload: {
            name: response.data.city.name,
            country: response.data.city.country,
            forecast: Object.keys(response.data.list).map(function(key) {
              return { 
                temp: this[key].temp.day.toFixed(0),
                humidity: this[key].humidity,
                windSpeed: this[key].speed.toFixed(0),
                windDirection: this[key].deg,
                mainDescription: this[key].weather[0].main,
                description: this[key].weather[0].description,
                dateTime: (this[key].dt * 1000)
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
  
const initialState = {
  selectedCity: false,
  selectedDay: false
};

const weather = (state = initialState, action) => {
  switch(action.type) {
    case GET_CITY_FORECAST_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload,
        };
    case GET_CITY_FORECAST_ERROR:
      return {
        ...state,
        error: action.payload
        };
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