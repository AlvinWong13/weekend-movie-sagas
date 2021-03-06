import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    yield takeEvery('FETCH_MOVIES', fetchAllMovies);
    yield takeEvery('GET_DETAILS', getDetails);
    yield takeEvery('GET_GENRES', getGenres)
    yield takeEvery('SET_GENRE_OPTIONS', selectGenre)
}

function* fetchAllMovies() {
    // get all movies from the DB
    try {
        const movies = yield axios.get('/api/movie');
        console.log('get all:', movies.data);
        yield put({ 
          type: 'SET_MOVIES', 
          payload: movies.data });

    } catch {
        console.log('get all error');
    }     
}

function* getDetails(action) {
  try {
    const response = yield axios.get(`/api/movie/${action.payload}`)
    yield put({
      type: 'SEE_DETAILS',
      payload: response.data
    })
  }
  catch (err) {
    console.log('Error getting details', err)
  }
}

function* getGenres(action) {
  try {
    const response = yield axios.get(`/api/movie/genre/${action.payload}`)
    yield put({
      type: 'SET_GENRE',
      payload: response.data
    })
  }
  catch (err) {
    console.log('Error getting genres', err)
  }
}

function* selectGenre() {
  try {
    const response = yield axios.get('/api/genre')
    yield put({
      type:'SET_GENRE_SELECT',
      payload: response.data
    })
  }
  catch (err) {
      console.log(err)
  }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}

// Used to store the movie genres
const genres = ( state = [], action ) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Used to handle details for movies
const details = ( state = [], action ) => {
    switch (action.type) {
      case 'SEE_DETAILS':
          return action.payload;
      default:
          return state;
    }
}

// Used to handle genre select dropdown
const genreDropdown = ( state = [], action ) => {
    switch (action.type) {
      case 'SET_GENRE_SELECT':
          return action.payload;
      default:
          return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,
        genres,
        details,
        genreDropdown,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={storeInstance}>
      <App />
    </Provider>
  </React.StrictMode>,
document.getElementById('root')
);
