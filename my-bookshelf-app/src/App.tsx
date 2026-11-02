import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import UserLogin from './components/UserLogin/UserLogin';
import { ProtectedRoute } from "./ProtectedRoute";
import { Bookshelf } from './components/Bookshelf/Bookshelf';

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<UserLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<SearchPage/>} />
        <Route path="/bookshelf" element={<Bookshelf/>} />
      </Route>
    </Routes>
  )
}

export default App
