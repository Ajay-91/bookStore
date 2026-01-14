import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Books from "./pages/Books";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Pnf from "./pages/Pnf";
import Loader from "./components/Loader";
import SignUp from "./pages/Sign";
import { Slide, ToastContainer } from "react-toastify";
import Profile from "./pages/Profile";
import Singlebook from "./pages/Singlebook";
import AdminHome from "./Admin/pages/AdminHome";
import AdminCarrers from "./Admin/components/AdminCarrers";
import AdminBooks from "./Admin/components/AdminBooks";
import AdminSettings from "./Admin/components/AdminSettings";
import Carrer from "./pages/Carrer";
import PaymentSuccess from "./components/PaymentSuccess";
import PaymentFailure from "./components/PaymentFailure";

function App() {
  const [showHome, setShowHome] = useState(false);

  setTimeout(() => {
    setShowHome(true);
  }, 3000);

  return (
    <>
      <Routes>
        <Route path="/" element={showHome ? <Home /> : <Loader />} />
        <Route path="/books" element={<Books />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/carrer" element={<Carrer />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/register" element={<SignUp insideRegister={true} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/view/:id/book" element={<Singlebook />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/admin-careers" element={<AdminCarrers />} />
        <Route path="/admin-books" element={<AdminBooks />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="/payment-success" element={<PaymentSuccess />} />
        <Route path="/payment-failure" element={<PaymentFailure />} />
        <Route path="/*" element={<Pnf />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Slide}
      />
    </>
  );
}

export default App;
