import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ShopPage from './pages/shop/ShopPage';
import AddPage from './pages/add/AddPage';
import MyPage from './pages/my/MyPage';
import HomePage from './pages/home/HomePage';
import AlarmPage from './pages/home/AlarmPage';
import DetailPage from './pages/detail/DetailPage';
import LoginPage from './pages/users/LoginPage';
import RegisterPage from './pages/users/RegisterPage';
import GamePage from './pages/detail/GamePage';
import VincentPage from './pages/home/VincentPage';
import CUPage from './pages/home/CUPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<NavigationBar />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/alarm" element={<AlarmPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/add" element={<AddPage />} />
            <Route path="/my" element={<MyPage />} />
          </Route>
          <Route path="/vincent" element={<VincentPage />} />
          <Route path="/cu" element={<CUPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
