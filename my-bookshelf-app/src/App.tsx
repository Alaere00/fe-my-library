import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import UserLogin from './components/UserLogin/UserLogin';
import CreateAccount from './components/CreateAccount/CreateAccount';
import { ProtectedRoute } from "./ProtectedRoute";
import { Bookshelf } from './components/Bookshelf/Bookshelf';
import { BookshelfStatusPage } from './components/BookshelfStatusPage/BookshelfStatusPage';
import { Recommendations } from './components/Recommendations/Recommendations';

function App() {
  return (
    <Routes>
      <Route path="/sign-in" element={<UserLogin />} />
      <Route path="/create-account" element={<CreateAccount />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<SearchPage/>} />
        <Route path="/bookshelf" element={<Bookshelf/>} />
        <Route path="/bookshelf/:status" element={<BookshelfStatusPage />} />
        <Route path="/recommendations" element={<Recommendations />} />
      </Route>
    </Routes>
  )
}

export default App
