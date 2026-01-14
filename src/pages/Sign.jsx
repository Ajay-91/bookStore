import React, { useContext, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
//Returns a function that lets you navigate programmatically in the browser in response to user interactions or effects.
import bgImg from "../assets/photo-1610072175216-df383b91b89d.jpg";
import { googleLogin, loginUser, registerUser } from "../services/allAPIs";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { authContext } from "../Context/authContext";

const SignUp = ({ insideRegister }) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    email: "",
  });

  const { saveToken } = useContext(authContext);

  const onRegisterClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.email == "" ||
        userData.password == ""
      ) {
        toast.error("Please fill the form to continue.");
      } else {
        let apiResponse = await registerUser(userData);
        if (apiResponse.status == 201) {
          toast.success("Successfully Registered.");
          navigate("/login");
        } else {
          console.log(apiResponse);
          toast.error(apiResponse.response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  const onLoginClick = async () => {
    try {
      let reqBody = {
        email: userData.email,
        password: userData.password,
      };
      let apiResponse = await loginUser(reqBody);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        toast.success("Login Successful.");

        //localStorage.setItem("token", apiResponse.data.token);

        saveToken(apiResponse.data.token);

        if (apiResponse.data.existingUser.userType == "admin") {
          navigate("/admin-home");
        } else {
          navigate("/");
        }
      } else {
        console.log(apiResponse);
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const decodeFn = async (credentials) => {
    console.log(credentials);

    let decodedData = jwtDecode(credentials.credential);
    console.log(decodedData);

    let payload = {
      userName: decodedData.name,
      email: decodedData.email,
      proPic: decodedData.picture,
    };
    let apiResponse = await googleLogin(payload);
    console.log(apiResponse);

    if (apiResponse.status == 200 || apiResponse.status == 201) {
      toast.success(apiResponse.data.message);
      //localStorage.setItem("token", apiResponse.data.token);
      saveToken( apiResponse.data.token)
      navigate("/");
    } else {
      toast.error(apiResponse.response.data.message);
    }
  };

  return (
    <>
      <div className="bg-aqua h-screen flex justify-center flex-col items-center gap-3 Img">
        <h1 className="text-4xl">BOOKSTORE</h1>
        <div className="w-[413px] h-[555px] bg-[#101828]">
          <div className="flex flex-col items-center mt-6 gap-2">
            <FaRegUser className="text-9xl text-white" />
            <h4 className="text-white text-3xl">
              {insideRegister ? "register" : "login"}
            </h4>
          </div>
          {/* input  */}
          <div className="flex flex-col gap-3 justify-center items-center mt-10">
            {insideRegister && (
              <input
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
                type="text"
                placeholder="UserName"
                className="bg-white h-7 rounded-3xl w-70"
              />
            )}
            <input
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              type="text"
              placeholder="Email Id"
              className="bg-white h-7 rounded-3xl w-70"
            />
            <input
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
              type="password"
              placeholder="Password"
              className="bg-white h-7 rounded-3xl w-70"
            />
            {insideRegister ? (
              <button
                onClick={onRegisterClick}
                className="bg-green-800 w-[333px] rounded-3xl h-12"
              >
                Register
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-green-800 w-[333px] rounded-3xl h-12"
              >
                Login
              </button>
            )}
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                decodeFn(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
            ;
            {insideRegister ? (
              <p className="text-white">
                Are you a Already a user?{" "}
                <Link to="/login" className="text-blue-500">
                  Login
                </Link>
              </p>
            ) : (
              <p className="text-white">
                Are you a new user?{" "}
                <Link to="/register" className="text-blue-500">
                  Register
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
