import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import AdminSideBar from "../components/AdminSideBar";
import AdminNav from "../components/AdminNav";
import { Card } from "flowbite-react";
import {
  allBooks,
  getAllApplication,
  getAllJobs,
  getAllUsers,
} from "../../services/allAPIs";
import { authContext } from "../../Context/authContext";
import { toast } from "react-toastify";

const AdminHome = () => {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);
  const [openings, setOpenings] = useState([]);
  const [applications, setApplications] = useState([]);
  const { token } = useContext(authContext);
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    totalBooks(), totalUsers(), totalOpenings(), totalApplications();
  }, [searchKey]);

  const totalBooks = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await allBooks(header, searchKey);
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setBooks(apiResponse.data.bookData);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching bookData");
    }
  };

  const totalUsers = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllUsers(header);
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setUsers(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching users");
    }
  };

  const totalOpenings = async () => {
    try {
      let apiResponse = await getAllJobs();
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setOpenings(apiResponse.data.allJobs);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching jobs");
    }
  };

  const totalApplications = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllApplication(header);
      console.log(apiResponse.data);
      if (apiResponse.status == 200) {
        setApplications(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching applications");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSideBar />
        <div className="p-15">
          <div className="grid grid-cols-3 gap-20">
            <Card
              href="#"
              className="max-w-sm bg-gray-600 rounded-xl text-center p-3"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Books
              </h5>
              <p className="text-4xl font-bold text-white dark:text-gray-400">
                {books.length}
              </p>
            </Card>

            <Card
              href="#"
              className="max-w-sm bg-gray-600 rounded-xl text-center p-3"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Users
              </h5>
              <p className=" text-4xl font-bold text-gray-700 dark:text-gray-400">
                {users.length}
              </p>
            </Card>

            <Card
              href="#"
              className="max-w-sm bg-gray-600 rounded-xl text-center p-3"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Job Openings
              </h5>
              <p className="text-4xl font-bold text-gray-700 dark:text-gray-400">
                {openings.length}
              </p>
            </Card>

            <Card
              href="#"
              className="max-w-sm bg-gray-600 rounded-xl text-center p-3"
            >
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                Total Applications
              </h5>
              <p className=" text-4xl font-bold text-gray-700 dark:text-gray-400">
                {applications.length}
              </p>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
