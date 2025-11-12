// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import AboutPage from './pages/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Ensure the paths and components are correctly linked */}
        <Route path="/" element={<CounterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
