import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Card } from "flowbite-react";
import { applyJob, getAllJobs } from "../services/allAPIs";
import { toast } from "react-toastify";

import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";

const Carrer = () => {
  const [jobData, setJobData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [applyData, setApplyData] = useState({
    fullName: "",
    email: "",
    phoneNo: "",
    jobId: "",
    jobTitle: "",
    resume: "",
  });

  useEffect(() => {
    getJobData();
  }, []);

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

  const onApplyClick = async () => {
    try {
      let headers = {
        "Content-Type": "multipart/form-data",
      };
      let reqBody = new FormData();

      for (let key in applyData) {
        reqBody.append(key, applyData[key]);
      }

      let apiResponse = await applyJob(reqBody, headers);

      if (apiResponse.status == 201) {
        toast.success("Applied");
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while applying job");
    }
  };

  return (
    <div>
      <Header />
      <div className="px-15">
        {jobData?.length > 0 ? (
          <div className="grid grid-cols-1">
            {jobData.map((eachJob, index) => (
              <Card
                href="#"
                className=" mt-5 bg-gray-600 rounded-xl text-white "
                key={index}
              >
                <div className="flex justify-between">
                  <h5 className="text-2xl font-bold text-sky-300">
                    Job ID: {eachJob.jobId} | Job Role:
                    {eachJob.jobRole} | Experience: {eachJob.experience}
                  </h5>
                  <button
                    onClick={() => {
                      setOpenModal(true);
                      setApplyData({
                        ...applyData,
                        jobId: eachJob.jobId,
                        jobTitle: eachJob.jobRole,
                      });
                    }}
                    className=" bg-black text-white w-25 cursor-pointer p-1 rounded hover:scale-105 duration-150"
                  >
                    Apply now
                  </button>
                </div>

                <p className="font-normal text-amber-200">{eachJob.jobDesc}</p>
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
        <Modal
          className="mx-65"
          show={openModal}
          onClose={() => setOpenModal(false)}
        >
          <ModalHeader className="bg-gray-700">Apply Job</ModalHeader>
          <ModalBody className="bg-gray-500 flex">
            <div className="space-y-6 flex flex-col">
              <input
                value={applyData.fullName}
                onChange={(e) =>
                  setApplyData({ ...applyData, fullName: e.target.value })
                }
                type="text"
                placeholder="Fullname"
                className="bg-white text-black rounded-2xl p-2 w-75"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, phoneNo: e.target.value })
                }
                value={applyData.phoneNo}
                type="number"
                placeholder="Phone No"
                className="bg-white text-black rounded-2xl p-2 w-75"
              />
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, email: e.target.value })
                }
                value={applyData.email}
                type="text"
                placeholder="Email"
                className="bg-white text-black rounded-2xl p-2 w-75"
              />
            </div>
            <div className="flex justify-center items-center w-full">
              <label className="text-white" htmlFor="resume">
                Resume:-
              </label>
              <input
                onChange={(e) =>
                  setApplyData({ ...applyData, resume: e.target.files[0] })
                }
                className="text-white"
                type="file"
                name="resume"
                id="resume"
              />
            </div>
          </ModalBody>
          <ModalFooter className="bg-gray-700">
            <Button
              className="bg-green-500 rounded-xl p-2 text-black ms-10"
              onClick={onApplyClick}
            >
              Apply
            </Button>
            <Button
              className="bg-red-500 rounded-xl p-2 text-black ms-10"
              color="alternative"
              onClick={() => setOpenModal(false)}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Carrer;
