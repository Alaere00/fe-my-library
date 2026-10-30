import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import UserLogin from './components/UserLogin/UserLogin';
import { Outlet, Navigate } from 'react-router-dom';

function App() {
  const ProtectedRoutes = () => {
    const isAuthenticated = !!sessionStorage.getItem('accessToken')
    return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />
  }
  return (
    <Routes>
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<SearchPage/>} />
      </Route>

      <Route path="/sign-in" element={<UserLogin />} />
    </Routes>

  
  )
}

export default App
