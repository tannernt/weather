import axios from 'axios';

export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const GET_CITY_FORECAST_ERROR = 'GET_CITY_FORECAST_ERROR';
export const getCityForecast = (city) => {
  return (dispatch) => {
    
    var url = WEATHER_URL + `forecast?q=${city}&units=imperial&type=accurate&mode=json&appid=${WEATHER_API_KEY}`;
    console.log('city', city, 'url', url);
    axios.get(url)
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_CITY_FORECAST_SUCCESS,
          payload: {
            cityName: response.data.city.name,
            forecast: [
              { temp: 1 },
              { temp: 2 },
              { temp: 3 },
              { temp: 4 },
            ],
          },
        });
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

export const GET_CITY_WEATHER_SUCCESS = 'GET_CITY_WEATHER_SUCCESS';
export const GET_CITY_WEATHER_ERROR = 'GET_CITY_WEATHER_ERROR';
export const getCityWeather = (city) => {
  return (dispatch) => {
    
    var url = WEATHER_URL + `weather?q=${city}&units=imperial&type=accurate&mode=json&appid=${WEATHER_API_KEY}`;
    console.log('city', city, 'url', url);
    axios.get(url)
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_CITY_WEATHER_SUCCESS,
          payload: {
            cityName: response.city.name,
            forecast: [
              { temp: 1 },
              { temp: 2 },
              { temp: 3 },
              { temp: 4 },
            ],
          },
        });
    })
    .catch((error) => {
      console.log()
      console.error(error);
      dispatch({
        type: GET_CITY_WEATHER_ERROR,
        payload: error,
      })
    });
  };
};

// export const getCityForecast = (city) => {
//   return (dispatch) => {
//       dispatch({
//         type: GET_CITY_FORECAST_SUCCESS,
//         payload: {
//           cityName: city,
//           forecast: [
//             { temp: 1 },
//             { temp: 2 },
//             { temp: 3 },
//             { temp: 4 },
//           ],
//         },
//       });
//     };
// };

const initialState = {
  selectedCity: false,
};

const weather = (state = initialState, action) => {
  switch(action.type) {
    case GET_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload
        };
    case GET_CITY_WEATHER_ERROR:
      return {
        ...state,
        error: action.payload
        };
    case GET_CITY_WEATHER_SUCCESS:
      return {
        ...state,
        selectedCity: action.payload
        };
    case GET_CITY_FORECAST_ERROR:
      return {
        ...state,
        error: action.payload
        };
    default:
      return state;
  }
};

export default weather;