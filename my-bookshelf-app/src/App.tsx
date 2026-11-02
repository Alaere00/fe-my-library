import { Routes, Route } from 'react-router-dom';
import SearchPage from './components/SearchPage/SearchPage';
import UserLogin from './components/UserLogin/UserLogin';
import { ProtectedRoute } from "./ProtectedRoute";
import { Bookshelf } from './components/Bookshelf/Bookshelf';
import { Header } from './components/Header/Header';
import { BookshelfStatusPage } from './components/BookshelfStatusPage/BookshelfStatusPage';

function App() {
  return (
    <div>
      <Header />
      <Routes>
      <Route path="/sign-in" element={<UserLogin />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<SearchPage/>} />
        <Route path="/bookshelf" element={<Bookshelf/>} />
        <Route path="/bookshelf/:status" element={<BookshelfStatusPage />} />
      </Route>
    </Routes>
    </div>
  )
}

export default App
