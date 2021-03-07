import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField } from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button'
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function MovieForm(props) {
    // import library from store
    const genreDropdown = useSelector(store => store.genreDropdown)
    
    const dispatch = useDispatch();
    // store data for movie form
    const [newMovie, setNewMovie] = useState({ title: '', poster: '', description: '', genre_id: '' })
    // use multi styling
    const classes = useStyles();
    // bring prop from movie list to close popup
    const { setOpenForm } = props;

    // send data to store when form is completed
    useEffect(() => {
      dispatch({
        type: 'GET_GENRE_OPTIONS'
      });
    }, []);

    // verify movie submition
    const submitMovie = (submit, event) => {
      event.preventDefault()
      if(submit) {
        dispatch({
          type: 'POST_MOVIE',
          payload: newMovie
        })
        // clear input values
        setNewMovie({ title: '', poster: '', description: '', genre_id: ''})
        // close popup and back to movie list
        setOpenForm(false)
        dispatch({
          type: 'FETCH_MOVIES' 
        });
        // let user know movie input was successful
        swal({
          title:"Thank You!",
          text: "You added a new movie!",
          icon: "success",
          button: "OK",
        })
      }
    }

    // handle event changes when typing in form
    function handleChange(key, event) {
      switch(key) {
        case 'title':
          setNewMovie({...newMovie, title: event.target.value})
          break;
        case 'poster':
          setNewMovie({...newMovie, poster: event.target.value})
          break;
        case 'description':
          setNewMovie({...newMovie, description: event.target.value})
          break;
        case 'genre':
          setNewMovie({...newMovie, genre_id: event.target.value})
          break;
        default:
          console.log('Unable to add movie')
      }
    }

    return (
      <form onSubmit={submitMovie}>
        <Grid container spacing={2}> 
          <Grid item xs={6}>
            <TextField required
              label="Title"
              id="outlined-size-small"
              defaultValue="Normal"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => handleChange('title', event)}
              value={newMovie.title}
            />
            <FormHelperText>Required</FormHelperText>
            <TextField required
              label="Poster URL"
              id="outlined-size-small"
              defaultValue="Normal"
              variant="outlined"
              fullWidth={true}
              onChange={(event) => handleChange('poster', event)}
              value={newMovie.poster}
            />
            <FormHelperText>Required</FormHelperText>
            <FormControl required className={classes.formControl}>
              <InputLabel id="Genre">Genre:</InputLabel>
              <Select
              name="genre"
              id="genre"
              value={newMovie.genre}
              onChange={(event) => handleChange('genre', event)}>
                  <MenuItem value="" disabled>Choose Genre:</MenuItem>
                    {genreDropdown.map(genre => {
                      return(
                        <MenuItem key={genre.id} value={genre.id}>{genre.name}</MenuItem>
                      )
                    })}
            </Select>
            <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField required
              maxlength="200"
              label="Movie Description"
              multiline
              rows={8}
              fullWidth={true}
              onChange={(event) => handleChange('description', event)}
              value={newMovie.description}
            />
            <FormHelperText>Required</FormHelperText>
          </Grid>
              <div style={{display: 'flex'}}>
                <Button 
                  style={{flexGrow:1}}
                  variant="contained"
                  color="primary"
                  onClick={(event) => submitMovie(true, event)}>
                  Submit
                </Button>
              </div>
        </Grid>
      </form>
    )
}

export default MovieForm;