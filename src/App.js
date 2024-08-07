import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginSignUp from './components/Login_SignUp';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginSignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
