import React, { useContext, useEffect, useState } from "react";
import AdminNav from "./AdminNav";
import { Card } from "flowbite-react";
import AdminSideBar from "./AdminSideBar";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import {
  addJob,
  deleteJob,
  getAllApplication,
  getAllJobs,
} from "../../services/allAPIs";
import { toast } from "react-toastify";
import { authContext } from "../../Context/authContext";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { baseURL } from "../../services/baseURL";

const AdminCarrers = () => {
  const [showJobs, setShowJobs] = useState(true);
  const [showApplications, setShowApplications] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [jobInputData, setJobInputData] = useState({
    jobId: "",
    jobRole: "",
    jobDesc: "",
    publishedDate: "",
    lastDate: "",
    salary: "",
    experience: "",
  });
  const [jobData, setJobData] = useState([]);
  const [applyData, setApplyData] = useState({});
  const { token } = useContext(authContext);

  useEffect(() => {
    getJobData();
    getApplications();
    console.log(jobData);
  }, []);

  const onAddClick = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await addJob(jobInputData, header);
      if (apiResponse.status == 201) {
        toast.success("Successfully Added");
        getJobData();
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while adding job");
    }
  };

  const getJobData = async () => {
    try {
      let apiResponse = await getAllJobs();
      if (apiResponse.status == 200) {
        setJobData(apiResponse.data.allJobs);
      } else {
        console.log(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting job data");
    }
  };

  const onDeleteClick = async (id) => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await deleteJob(id, header);
      if (apiResponse.status == 200) {
        toast.success("Successfully deleted");
        getJobData();
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting job data");
    }
  };

  const getApplications = async () => {
    try {
      let header = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await getAllApplication(header);
      if (apiResponse.status == 200) {
        setApplyData(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while getting applications");
    }
  };

  return (
    <>
      <AdminNav />
      <div className="grid grid-cols-[3fr_9fr]">
        <AdminSideBar />
        <div>
          <h1 className="text-center mt-2">Admin careers</h1>
          <div className="text-center mt-10">
            <button
              onClick={() => {
                setShowJobs(true);
                setShowApplications(false);
              }}
              className="bg-gray-700 border rounded p-1 text-white cursor-pointer"
            >
              View Jobs
            </button>
            <button
              onClick={() => {
                setShowJobs(false);
                setShowApplications(true);
              }}
              className="bg-gray-700 border rounded p-1 text-white cursor-pointer ms-2"
            >
              View Applications
            </button>
          </div>

          <div>
            {showJobs && (
              <div className="px-6">
                <h1 className="text-center mt-7 text-2xl font-bold ">
                  All Jobs
                </h1>
                <button
                  onClick={() => setOpenModal(true)}
                  className="bg-green-700 ms-2 mt-5 border rounded-2xl p-2 text-white cursor-pointer"
                >
                  Add new Jobs
                </button>
                {jobData?.length > 0 ? (
                  <div className="grid grid-cols-1">
                    {jobData.map((eachJob, index) => (
                      <Card
                        href="#"
                        className=" mt-5 bg-gray-600 rounded text-white"
                        key={index}
                      >
                        <div className="flex justify-end">
                          <button
                            onClick={() => {
                              onDeleteClick(eachJob._id);
                            }}
                            className="w-25 rounded cursor-pointer bg-red-500 "
                          >
                            Delete
                          </button>
                        </div>
                        <h5 className="text-2xl font-bold text-sky-300">
                          Job ID: {eachJob.jobId} | Job Role:
                          {eachJob.jobRole} | Experience: {eachJob.experience}
                        </h5>
                        <p className="font-normal text-amber-200">
                          {eachJob.jobDesc}
                        </p>
                        <h1>
                          Published Date: {eachJob.publishedDate} | Last Date :
                          {eachJob.lastDate} | Salary : {eachJob.salary}
                        </h1>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div>NO JOBS WERE ADDED</div>
                )}
              </div>
            )}
            {showApplications && (
              <div className="mt-10 mx-4">
                {applyData?.length > 0 ? (
                  <div>
                    <Table>
                      <TableHead className="bg-indigo-950 text-white">
                        <TableRow>
                          <TableHeadCell>Job Id</TableHeadCell>
                          <TableHeadCell>Job Title</TableHeadCell>
                          <TableHeadCell>Full Name</TableHeadCell>
                          <TableHeadCell>Email</TableHeadCell>
                          <TableHeadCell>Phone Number</TableHeadCell>
                          <TableHeadCell>Resume</TableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="divide-y">
                        {applyData.map((eachApp, index) => (
                          <TableRow
                            key={index}
                            className="text-white dark:border-gray-700 dark:bg-gray-800"
                          >
                            <TableCell>{eachApp.jobId}</TableCell>
                            <TableCell>{eachApp.jobTitle}</TableCell>
                            <TableCell> {eachApp.fullName}</TableCell>
                            <TableCell>{eachApp.email}</TableCell>
                            <TableCell>{eachApp.phoneNo}</TableCell>

                            <TableCell>
                              <a
                                href={`${baseURL}/uploads/${eachApp.resume}`}
                                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                              >
                                Download Resume
                              </a>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                ) : (
                  <div>No Applications</div>
                )}
              </div>
            )}
          </div>
        </div>

        <Modal
          className="mx-90 p-7"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="bg-gray-300">Add new Job</ModalHeader>
          <ModalBody className="bg-gray-500">
            <div className="space-y-6 flex justify-between gap-4">
              <div className="">
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Job Id"
                  onChange={(e) =>
                    setJobInputData({ ...jobInputData, jobId: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Job Description"
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      jobDesc: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Job Role"
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      jobRole: e.target.value,
                    })
                  }
                />
              </div>
              <div className="">
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Published Date"
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      publishedDate: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Last Date"
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      lastDate: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Salary"
                  onChange={(e) =>
                    setJobInputData({ ...jobInputData, salary: e.target.value })
                  }
                />
                <input
                  type="text"
                  className="bg-white w-75 rounded-3xl p-1 mt-10"
                  name=""
                  id=""
                  placeholder="Expereience"
                  onChange={(e) =>
                    setJobInputData({
                      ...jobInputData,
                      experience: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              className="bg-black me-10  p-2 rounded-xl"
              onClick={onAddClick}
            >
              Submit
            </Button>
            <Button
              className="bg-green-700 me-10  p-2 rounded-xl"
              onClick={() => setOpenModal(false)}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </>
  );
};

export default AdminCarrers;
