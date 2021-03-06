import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css'

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
          type: 'SET_GENRE_OPTIONS' 
        });
    }, []);

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies">
                {movies.map(movie => {
                    return (
                        <div 
                          key={movie.id} 
                          onClick={() => viewDetails(movie.id)}>
                            <h3>{movie.title}</h3>
                            <img src={movie.poster} alt={movie.title}/>
                        </div>
                    );
                })}
            </section>
        </main>

    );
}

export default MovieList;