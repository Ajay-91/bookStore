import React, { useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import AdminSideBar from "./AdminSideBar";
import { getUserDetails, updateProfile } from "../../services/allAPIs";
import { toast } from "react-toastify";

const AdminSettings = () => {
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    proPic: "",
  });

  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
  );

  useEffect(() => {
    getUserData();
  }, []);

  const setImg = async (e) => {
    console.log(URL.createObjectURL(e.target.files[0]));
    setPreview(URL.createObjectURL(e.target.files[0]));
    setUserData({ ...userData, proPic: e.target.files[0] });
  };

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getUserDetails(header);
      console.log(apiResponse.data);
      setUserData(apiResponse.data);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while getting user details");
    }
  };

  const onSubmitClick = async () => {
    try {
      if (
        userData.userName == "" ||
        userData.password == "" ||
        userData.confirmPassword == "" ||
        userData.proPic == ""
      ) {
        toast.error(
          "Please fill the form to continue in to update the information"
        );
      } else {
        if (userData.password == userData.confirmPassword) {
          let reqBody = new FormData();
          for (let key in userData) {
            reqBody.append(key, userData[key]);
          }

          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };

          let apiResponse = await updateProfile(userData._id, header, reqBody);
          console.log(apiResponse);
          if (apiResponse.status == 200) {
            toast.success("Admin details successfully updated");
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Password and confirm Password must be same.");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating values");
    }
  };

  const onResetClick = async () => {
    setUserData({
      userName: "",
      password: "",
      confirmPassword: "",
      proPic: "",
    });
    setPreview(
      "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"
    );
  };

  return (
    <>
      <AdminNav />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSideBar />
        <div className="p-3">
          <h1 className="text-3xl text-center p-5">Setting</h1>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col text-justify gap-5 justify-center items-center p-5">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, ducimus? Accusantium nostrum soluta libero nesciunt,
                quisquam sapiente. Voluptates, laborum fugiat ratione ea
                repellendus ipsa temporibus beatae cupiditate reprehenderit nisi
                debitis!
              </p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                placeat cupiditate nam sed officiis fuga dicta optio eveniet
                velit quisquam natus, ducimus doloremque commodi repellat.
                Dolorem nam voluptate at obcaecati!
              </p>
            </div>
            <div className="bg-gray-400 rounded-2xl p-10 pt-15 flex flex-col items-center gap-5">
              <label htmlFor="b1">
                <img src={preview} className="w-40 h-40 rounded-full" alt="" />
              </label>
              <input
                id="b1"
                type="file"
                className="hidden"
                onChange={(e) => setImg(e)}
              />

              <input
                className="bg-white rounded p-2 w-70"
                type="text"
                placeholder="Admin Name"
                value={userData.userName}
                onChange={(e) =>
                  setUserData({ ...userData, userName: e.target.value })
                }
              />
              <input
                className="bg-white rounded p-2 w-70"
                type="password"
                placeholder="Password"
                value={userData.password}
                onChange={(e) =>
                  setUserData({ ...userData, password: e.target.value })
                }
              />
              <input
                className="bg-white rounded p-2 w-70"
                type="text"
                value={userData.confirmPassword}
                placeholder="Confirm password"
                onChange={(e) =>
                  setUserData({ ...userData, confirmPassword: e.target.value })
                }
              />
              <div className="flex gap-7">
                <button
                  onClick={onSubmitClick}
                  className="p-2 bg-green-400 rounded-2xl text-white w-20"
                >
                  Submit
                </button>
                <button
                  onClick={onResetClick}
                  className="p-2 bg-red-400 rounded-2xl text-white w-20"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
