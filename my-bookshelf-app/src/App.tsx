import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import UserLogin from './components/UserLogin/UserLogin';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage/>} />
      <Route path="/sign-in" element={<UserLogin />} />
    </Routes>

  
  )
}

export default App
