import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import ChecklistPage from './pages/checklist';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
      </Routes>
    </Router>
  );
};

export default App;
