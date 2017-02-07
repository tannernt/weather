// import Request from 'superagent';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';
// export const getCityForecast = (city) => {
//   return (dispatch) => {
//     var url = WEATHER_URL + `forecast?q=${city}&appid=${WEATHER_API_KEY}`;
//     Request.get(url).then((response) => {
//       dispatch({
//         type: GET_CITY_FORECAST_SUCCESS,
//         payload: {
//           cityName: response.city.name,
//           forecast: [
//             { temp: 1 },
//             { temp: 2 },
//             { temp: 3 },
//             { temp: 4 },
//           ],
//         },
//       });
//     });
//   };
// };

export const getCityForecast = (city) => {
  return (dispatch) => {
      dispatch({
        type: GET_CITY_FORECAST_SUCCESS,
        payload: {
          cityName: city,
          forecast: [
            { temp: 1 },
            { temp: 2 },
            { temp: 3 },
            { temp: 4 },
          ],
        },
      });
    };
};

const initialState = {
  selectedCity: false,
};

const weather = (state = initialState, action) => {
  switch(action.type) {
    case GET_CITY_FORECAST_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default weather;