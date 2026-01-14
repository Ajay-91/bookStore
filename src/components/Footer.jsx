import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" text-white">
      <div className="bg-indigo-950 grid grid-cols-3 gap-20 p-12">
        <div className="flex flex-col gap-3">
          <p>ABOUT US</p>
          <p className="text-justify">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate
            dolorem veniam deserunt quisquam eius ad hic maxime dicta ipsum nemo
            itaque necessitatibus quas nobis, illum voluptate, pariatur
            recusandae alias harum!
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <p>NEWSLETTER</p>
          <p>Stay updated with our latest trends</p>
          <div className="flex">
            <input
              className="bg-white text-black p-2 w-50"
              type="text"
              placeholder="Email ID"
            />
            <div className="bg-amber-300 w-12 "><FaArrowRightLong className="text-3xl m-2" /></div>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p>FOLLOW US</p>
          <p>Let us be social</p>
        </div>
      </div>
      <div className="bg-black">
        <p className="text-xs text-center p-3">
          Copyright © 2023 All rights reserved | This website is made with by
          Amiya kiran
        </p>
      </div>
    </div>
  );
};

export default Footer
