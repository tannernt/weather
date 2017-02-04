import Request from 'superagent';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';
export const getCityForecast = (city) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: GET_CITY_FORECAST_SUCCESS,
        payload: {
          name: city,
          forecast: [
            { temp: 1 },
            { temp: 2 },
            { temp: 3 },
            { temp: 4 },
          ],
        },
      });
    }, 2000);
  };
};

export const getCityForecast = (city) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch({
        type: GET_CITY_FORECAST_SUCCESS,
        payload: {
          name: city,
          forecast: [
            { temp: 1 },
            { temp: 2 },
            { temp: 3 },
            { temp: 4 },
          ],
        },
      });
    }, 2000);
  };
};

const initialState = {
  selectedCity: false,
};

const weather = (state = initialState, action) => {
  switch(action.type) {
    case GET_CITY_FORECAST_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload,
      };
    default:
      return state;
  }
};

export default weather;