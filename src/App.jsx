import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './Navbar';
import WeatherDashboard from './WeatherDashboard';
import CropRecommendation from './CropRecommendation';
import SoilDetails from './SoilDetails';
import PestDetection from './PestDetection';

import Home from './Home';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherDashboard />} />
          <Route path="/crop" element={<CropRecommendation />} />
          <Route path="/soil" element={<SoilDetails />} />
          <Route path="/pest" element={<PestDetection />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
