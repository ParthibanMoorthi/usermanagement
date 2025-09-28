import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./pages/LoginPage";
import UserListPage from "./pages/UserListPage";
import UserDetailPage from "./pages/UserDetailPage";
import NotFoundPage from "./pages/NotFoundPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";

function App() {
  const token = useSelector(state => state.auth.token);

  return (
    <Router>
       {token && <Header userName="Elon Musk" />}
      <Routes>
        <Route path="/" element={!token ? <LoginPage /> : <Navigate to="/users" />} />
        <Route path="/users" element={token ? <UserListPage /> : <Navigate to="/" />} />
        <Route path="/users/:id" element={token ? <UserDetailPage /> : <Navigate to="/" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
        <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </Router>
  );
}

export default App;
