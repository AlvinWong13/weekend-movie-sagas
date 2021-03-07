import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import CssBaseline from "@material-ui/core/CssBaseline";
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
  },
  overrides:{
    MuiCssBaseline: {
      "@global": {
        body: {
          backgroundImage: 
            "url(https://i.pinimg.com/originals/fa/72/7a/fa727ae20b91dd1ec947822c0d0cc5e2.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover"
        }
      }
    }
  },
  props:{
    MuiIconButton:{
      disableRipple:true
    }
  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme} >
        <div className="App" >
          <CssBaseline />

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
