import React from "react";
import { Link } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { MdHome } from "react-icons/md";
import { FaBook } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

const AdminSideBar = () => {
  return (
    <>
      <div style={{ minHeight: "98vh" }} className="bg-gray-700">
        <h1 className="mt-10 text-3xl font-bold text-white text-center flex justify-center items-center gap-3">
          Admin Dashboard <RxDashboard />
        </h1>
        <div className="border rounded-xl shadow-2xs border-gray-100 mt-10 text-center p-10">
          <div>
            <Link
              to={"/admin-home"}
              className="text-white text-xl font-bold  flex justify-center items-center gap-3"
            >
              <MdHome /> Admin Home page
            </Link>
          </div>
          <div className="mt-10">
            <Link to={"/admin-books"} className="text-white text-xl font-bold  flex justify-center items-center gap-3">
              <FaBook /> Admin Book/User
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to={"/admin-careers"}
              className="text-white text-xl font-bold  flex justify-center items-center gap-3"
            >
              <FaBriefcase /> Admin careers
            </Link>
          </div>
          <div className="mt-10">
            <Link
              to={"/admin-settings"}
              className="text-white text-xl font-bold  flex justify-center items-center gap-3"
            >
              <FaGear />
              Admin Settings
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSideBar;
