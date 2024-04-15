import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ForgetPassword from "./pages/ForgetPassword";
import Offer from "./pages/Offer";
import Profile from "./pages/Profile";
import SingIn from "./pages/SingIn";
import SingUp from "./pages/SingUp";
import Error from "./pages/Error";
import Header from "./components/Header ";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <>
      <BrowserRouter className="overflow-hidden">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ForgetPassword" element={<ForgetPassword />} />
          <Route path="/Offer" element={<Offer />} />
          <Route path="/Profile" element={<PrivateRoute />}>
          <Route path="/Profile" element={<Profile />} />
          </Route>
          <Route path="/SingIn" element={<SingIn />} />
          <Route path="/SingUp" element={<SingUp />} />
          <Route path="/*" element={<Error />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition:Bounce
      />
    </>
  );
}
