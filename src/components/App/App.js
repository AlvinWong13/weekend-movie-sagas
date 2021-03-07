import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core';
import Header from '../Header/Header';
import MovieForm from '../MovieForm/MovieForm';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#2196f3",
      light: '#3c44b126'
    },
    secondary: {
      main: "#f83245",
      light: '#f8324526'
    },
    background: {
      default: "#f4f5fd"
    },
  },
  overrides:{
    MuiAppBar:{
      root:{
        transform:'translateZ(0)'
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})


const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})


function App() {
  const classes = useStyles();
  return (
    <Router>
      <ThemeProvider theme={theme} >
        <div className="App">

          <Header />

          <Route path="/" exact>
            <MovieList />
          </Route>
        
          <Route path="/details" >
            <Details />
          </Route>

          <Route path="/addMovie" >
            <MovieForm />
          </Route>
        </div>
      </ThemeProvider>
    </Router>
  );
}


export default App;
