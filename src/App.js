import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Register from "./routes/Register";
import Login from "./routes/Login";
import Profile from "./routes/Profile";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { UserContextProvider } from "./context/userContext";
import PreLogin from "./routes/PreLogin";

function App() {
  return (
    <>
      <UserContextProvider>
        <ToastContainer />
        <Router>
          <Routes>
            <Route exact path="/" element={<PreLogin />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/user/:id" element={<Home />} />
            <Route exact path="/user/:id/profile" element={<Profile />} />
          </Routes>
        </Router>
      </UserContextProvider>
    </>
  );
}

export default App;
