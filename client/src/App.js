import './App.css'
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Register';

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
          <Route exact path='/'  element={<Landing />} />
          <Route exact path='/register' element={<Register />} />
          <Route exact path='/login' element={<Login />} />
      </Routes>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
