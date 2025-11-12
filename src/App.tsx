import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CounterPage from './pages/CounterPage';
import AboutPage from './pages/AboutPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router basename="/crochetbae">
      <Routes>
        <Route path="/" element={<CounterPage />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
