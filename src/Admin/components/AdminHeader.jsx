import React from "react";

const AdminHeader = () => {
  return (
    <div className="flex justify-between items-center bg-gray-500">
      <div className="flex items-center">
        <img
          className="w-22"
          src="https://cdn.vectorstock.com/i/500p/55/19/colorful-book-store-icon-vector-47565519.jpg"
          alt=""
        />
        <h1 >BookStore</h1>
      </div>
      <h1 className="text-3xl font-bold">Welcome Admin</h1>
      <button className=" cursor-pointer text-black font-bold p-2 rounded border hover:bg-white hover:text-black me-3">Logout</button>
    </div>
  );
};

export default AdminHeader;
