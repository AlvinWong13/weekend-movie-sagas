import {HashRouter as Router, Route} from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList';
import Details from '../Details/Details';
import MovieForm from '../MovieForm/MovieForm';

function App() {
  return (
    <div className="App">
      <Router>

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

      </Router>
    </div>
  );
}


export default App;
