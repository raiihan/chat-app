import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import './style/style.scss'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useContext } from "react";
import { AuthContex } from "./context/AuthContex";

function App() {
  const { currentUser } = useContext(AuthContex)

  const ProtectRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to={'/login'} />
    }
    return children;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<ProtectRoute>
              <Home />
            </ProtectRoute>
            } />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
