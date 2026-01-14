import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { Dropdown, DropdownItem } from "flowbite-react";
import { authContext } from "../Context/authContext";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const { removeToken } = useContext(authContext);

  useEffect(() => {
    let token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const onClickLogout = () => {
    //localStorage.clear();
    removeToken();
    navigate("/");
  };

  return (
    <div>
      <div className="flex justify-between items-center text-indigo-950">
        <img
          className="w-22"
          src="https://cdn.vectorstock.com/i/500p/55/19/colorful-book-store-icon-vector-47565519.jpg"
          alt=""
        />

        <h1 className="text-4xl font-bold">BOOK STORE</h1>

        <div className="flex items-center pr-3">
          <span className="p-3 m-3">
            <FaInstagram />
          </span>

          {isLoggedIn ? (
            <Dropdown
              className="text-black"
              label={
                <div>
                  <img
                    className="w-10"
                    src="https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?semt=ais_hybrid&w=740&q=80"
                    alt=""
                  />
                </div>
              }
              dismissOnClick={false}
            >
              <div>
                <Link className="w-max text-black" to="/profile">
                  Profile
                </Link>
              </div>
              <div>
                <button
                  className="cursor-pointer text-black"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </Dropdown>
          ) : (
            <Link to="/login">
              <button className="border rounded-2xl font-bold p-3 m-3 hover:bg-indigo-400 hover:text-blue-950">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>
      <div className="bg-indigo-950 p-3 text-center">
        <Link to="/">
          <span className="text-white m-3">Home</span>
        </Link>
        <Link to="/books">
          <span className="text-white m-3">Books</span>
        </Link>
        <Link to="/carrer">
          <span className="text-white m-3">Career</span>
        </Link>
        <Link to="/contact">
          <span className="text-white m-3">Contact</span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
