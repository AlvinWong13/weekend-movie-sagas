import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './MovieList.css';
import PopupDetails from '../PopupDetails/PopupDetails';
import Details from '../Details/Details';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Typography } from '@material-ui/core';
import ButtonBase from '@material-ui/core/ButtonBase';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 140,
    width: 100,
  },
  control: {
    padding: theme.spacing(2),
  },
  img: {
    maxWidth: '100%',
    maxHeight: '91%',
  },
}));


function MovieList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);
    const classes = useStyles();
    const [spacing, setSpacing] = React.useState(2);

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
            <Grid container className={classes.root} spacing={2}>
              <Grid item xs={12}>
                <Grid container justify="center" spacing={spacing}>
                  {movies.map(movie => {
                    return (
                        <Grid
                          key={movie.id} 
                          onClick={() => viewDetails(movie.id)}
                          className="movieCard">
                            <Typography variant="h6">{movie.title}</Typography>
                              <img src={movie.poster} alt={movie.title} className={classes.img}/>
                        </Grid>
                    );
                })}
                </Grid>
              </Grid>
            </Grid>
        </main>

    );
}

export default MovieList;