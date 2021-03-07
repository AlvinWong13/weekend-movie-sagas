import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';
import PopupDetails from '../PopupDetails/PopupDetails';
import Details from '../Details/Details';


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    const viewDetails = (id) => {
      dispatch({
        type: 'GET_DETAILS',
        payload: id
      })
      dispatch({
        type: 'GET_GENRES',
        payload: id
      })
      history.push('/details')
    }

    useEffect(() => {
        dispatch({ 
          type: 'FETCH_MOVIES' 
        });
    }, []);

    return (
        <main>
          <section className="movieListHeader">
            <h1>MovieList</h1>
          </section>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div
                          key={movie.id} 
                          onClick={() => viewDetails(movie.id)}
                          className="movieCard">
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title} className="poster"/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;