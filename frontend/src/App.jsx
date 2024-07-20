import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/NavigationBar';
import ShopPage from './pages/shop/ShopPage';
import AddPage from './pages/add/AddPage';
import MyPage from './pages/my/MyPage';
import HomePage from './pages/home/HomePage';
import AlarmPage from './pages/home/AlarmPage';

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
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
