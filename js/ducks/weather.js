import axios from 'axios';

export const WEATHER_URL = 'http://api.openweathermap.org/data/2.5/forecast/daily';
export const WEATHER_API_KEY = '5c235b4f603679abafdad752cb2e669b';

export const GET_CITY_FORECAST_SUCCESS = 'GET_CITY_FORECAST_SUCCESS';
export const GET_CITY_FORECAST_ERROR = 'GET_CITY_FORECAST_ERROR';
export const getCityForecast = (city) => {
  return (dispatch) => {
    
    var url = WEATHER_URL + `?q=${city}&units=imperial&type=accurate&mode=json&appid=${WEATHER_API_KEY}`;
    console.log('city', city, 'url', url);
    axios.get(url)
      .then((response) => {
        console.log(response);
        dispatch({
          type: GET_CITY_FORECAST_SUCCESS,
          payload: {
            name: response.data.city.name,
            country: response.data.city.country,
            temp: response.data.list[0].temp.day.toFixed(0),
            humidity: response.data.list[0].humidity,
            windSpeed: response.data.list[0].speed.toFixed(0),
            windDirection: response.data.list[0].deg,
            description: response.data.list[0].weather.description,
            dateTime: Date.parse(response.data.list[0].dt),
            forecast: [
              {
                temp: response.data.list[0].temp.day.toFixed(0),
                humidity: response.data.list[0].humidity,
                windSpeed: response.data.list[0].speed.toFixed(0),
                windDirection: response.data.list[0].deg,
                description: response.data.list[0].weather[0].description,
                dateTime: Date.parse(response.data.list[0].dt),
              },
              {
                temp: response.data.list[1].temp.day.toFixed(0),
                humidity: response.data.list[1].humidity,
                windSpeed: response.data.list[1].speed.toFixed(0),
                windDirection: response.data.list[1].deg,
                description: response.data.list[1].weather[0].description,
                dateTime: Date.parse(response.data.list[1].dt),
              },
              {
                temp: response.data.list[2].temp.day.toFixed(0),
                humidity: response.data.list[2].humidity,
                windSpeed: response.data.list[2].speed.toFixed(0),
                windDirection: response.data.list[2].deg,
                description: response.data.list[2].weather[0].description,
                dateTime: Date.parse(response.data.list[2].dt),
              },
              {
                temp: response.data.list[3].temp.day.toFixed(0),
                humidity: response.data.list[3].humidity,
                windSpeed: response.data.list[3].speed.toFixed(0),
                windDirection: response.data.list[3].deg,
                description: response.data.list[3].weather[0].description,
                dateTime: Date.parse(response.data.list[3].dt),
              },
              {
                temp: response.data.list[4].temp.day.toFixed(0),
                humidity: response.data.list[4].humidity,
                windSpeed: response.data.list[4].speed.toFixed(0),
                windDirection: response.data.list[4].deg,
                description: response.data.list[4].weather[0].description,
                dateTime: Date.parse(response.data.list[4].dt),
              },
              {
                temp: response.data.list[5].temp.day.toFixed(0),
                humidity: response.data.list[5].humidity,
                windSpeed: response.data.list[5].speed.toFixed(0),
                windDirection: response.data.list[5].deg,
                description: response.data.list[5].weather[0].description,
                dateTime: Date.parse(response.data.list[5].dt),
              },
            ],
//             forecast: [
//               { temp: 1 },
//               { temp: 2 },
//               { temp: 3 },
//               { temp: 4 },
//             ],
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
    default:
      return state;
  }
};

export default weather;