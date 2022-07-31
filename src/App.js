import NavigationBar from './Components/NavigationBar';
import MovieList from './Components/MovieList';
import MovieView from './Components/MovieView';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Booking from './Components/Booking';
import Summary from './Components/Summary';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  const [mid, setMid] = useState(-1);     //movie-id
  const [sidd, setSidd] = useState(-1);   //show-id
  const [tidd, setTidd] = useState(-1);   //booking/transaction-id
  return (
    <div className="App">
      <NavigationBar />
      <Router>
        <Routes>
          <Route exact path="/" element={<MovieList setMid={setMid} />} />
          <Route path="/movieView" element={<MovieView setSidd={setSidd} mid={mid} />} />
          <Route path="/booking" element={<Booking sidd={sidd} setTidd={setTidd}/>} />
          <Route path="/summary" element={<Summary sidd={sidd} tidd={tidd}/>} />
        </Routes>
      </Router>
    </div>
    
  );
}

export default App;
