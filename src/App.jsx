import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AlbumDetail from './pages/AlbumDetails';
import Home from './pages/Home';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Home />} />

        <Route path="/albums/:id" element={<AlbumDetail />} />

      </Routes>
    </Router>
  );
}

export default App;
