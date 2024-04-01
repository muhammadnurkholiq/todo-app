import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/auth/Login';
import ChecklistPage from './pages/checklist';
import ChecklistItemPage from './pages/checklist/ChecklistItemPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/checklist/:id/items" element={<ChecklistItemPage />} />
      </Routes>
    </Router>
  );
};

export default App;
