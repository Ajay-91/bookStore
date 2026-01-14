import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { FaEdit } from "react-icons/fa";
import { toast } from "react-toastify";
import { updateProfile } from "../services/allAPIs";

const EditProfile = ({ userDetails }) => {
  const [openModal, setOpenModal] = useState(false);
  const [preview, setPreview] = useState(
    "https://media.istockphoto.com/id/2200526153/vector/simple-user-avatar-symbol-with-dark-circle-background.jpg?s=612x612&w=0&k=20&c=gTdEP9HWwE7LYSVYBFv4sE6syuvGm9hmK4lOCGQDLJI="
  );
  const [editData, setEditData] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    userBio: "",
    proPic: "",
  });

  useEffect(() => {
    setEditData(userDetails);
  }, [userDetails]);

  const onImageChange = (e) => {
    //e.target.files[0] is an array where in its 0th index we can access the file
    console.log(e.target.files[0]);

    //this is method in which js store the file in a storage mechanism and return the path to that file
    let url = URL.createObjectURL(e.target.files[0]);
    console.log(url);
    setPreview(url);
    setEditData({ ...editData, proPic: e.target.files[0] });
  };

  const onEditClick = async () => {
    try {
      if (
        editData.userName == "" ||
        editData.password == "" ||
        editData.confirmPassword == " " ||
        editData.proPic == "" ||
        editData.userBio == ""
      ) {
        toast.error("Please fill the form ");
      } else {
        console.log(editData.confirmPassword)
        console.log(editData.password)
        if (editData.confirmPassword == editData.password) {
          //proceed with api call
          let token = localStorage.getItem("token");
          let header = {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          };
          let reqBody = new FormData();

          for (let key in editData) {
            reqBody.append(key, editData[key]);
          }

          let apiResponse = await updateProfile(editData._id, header, reqBody);
          if (apiResponse.status == 200) {
            toast.success(apiResponse.data.message);
            console.log(apiResponse);
            console.log(editData);
          } else {
            toast.error(apiResponse.response.data.message);
          }
        } else {
          toast.error("Password and Confirm Password doesnt match");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong while updating");
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpenModal(true)}
        className="text-blue-500 border rounded-xl border-blue-500 p-3 flex text-lg"
      >
        <FaEdit className="m-1" /> Edit
      </button>
      <Modal
        className="mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-blue-950 text-cyan-50 text-xl p-3">
          Terms of Service
        </ModalHeader>
        <ModalBody className="text-blue-950 bg-blue-100  ">
          <div className="space-y-6 flex flex-col items-center">
            <label htmlFor="image">
              <input
                onChange={(e) => onImageChange(e)}
                type="file"
                name=""
                id="image"
                className=""
              />
              <img className="w-50" src={preview} alt="" />
            </label>
            <input
              type="text"
              placeholder="Username"
              className="bg-white text-black rounded w-100 p-2"
              value={editData.userName}
              onChange={(e) =>
                setEditData({ ...editData, userName: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-white text-black rounded w-100 p-2"
              onChange={(e) =>
                setEditData({ ...editData, password: e.target.value })
              }
              value={editData.password}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              className="bg-white text-black rounded w-100 p-2"
              onChange={(e) =>
                setEditData({ ...editData, confirmPassword: e.target.value })
              }
              value={editData.password}
            />
            <textarea
              onChange={(e) =>
                setEditData({ ...editData, userBio: e.target.value })
              }
              value={editData.userBio}
              placeholder="Bio"
              className="bg-white text-black rounded w-100 p-2"
              name=""
              id=""
            ></textarea>
          </div>
        </ModalBody>
        <ModalFooter className="bg-blue-950 text-cyan-50 flex gap-2">
          <Button
            className="p-2 bg-blue-100 text-blue-950"
            onClick={onEditClick}
          >
            Edit
          </Button>
          <Button
            className="p-2 bg-blue-100  text-blue-950"
            onClick={() => setOpenModal(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default EditProfile;
