import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage'
import Countrypage from './pages/Countrypage'


function App() {
  
  return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/:countryCode" element={<Countrypage />} />
      </Routes>
  );
}

export default App;
