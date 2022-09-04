import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';

// styles
import './App.css';

// pages & components
import Navbar from './components/Navbar';
import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';

function App() {
  const { user, authIsReady } = useAuthContext();
  
  return (
    <div className="App">
      {authIsReady && (
        <BrowserRouter>
          <div className="container">
            <Navbar/>
            <Routes>
              <Route
                path='/'
                element={user ? <Home /> : <Navigate to='/login'></Navigate>}>
              </Route>
              <Route
                path='login/'
                element={!user ? <Login /> : <Navigate to='/'></Navigate>}>
              </Route>
              <Route
                path='/signup'
                element={!user ? <Signup /> : <Navigate to='/'></Navigate>}>
              </Route>
            </Routes>
          </div>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
