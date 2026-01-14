import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import { addBooks, getUserDetails } from "../services/allAPIs";
import EditProfile from "../components/EditProfile";

const Profile = () => {
  const [sellBookFlag, setSellBookFlag] = useState(true);
  const [bookStatusFlag, setBookStatusFlag] = useState(false);
  const [historyFlag, setHistoryFlag] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  const [bookData, setBookData] = useState({
    title: "",
    author: "",
    noOfPages: 0,
    imgURL: "",
    price: 0,
    discountPrice: 0,
    abstract: "",
    publisher: "",
    language: "",
    ISBN: "",
    category: "",
    uploadedImages: [],
  });

  const [preview, setPreview] = useState(
    "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_1280.png"
  );

  const [previewArray, setPreviewArray] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  const onImageClick = (e) => {
    console.log(e.target.files[0]);
    setBookData({
      ...bookData,
      uploadedImages: [...bookData.uploadedImages, e.target.files[0]],
    });

    let imgURL = URL.createObjectURL(e.target.files[0]);
    setPreview(imgURL);
    setPreviewArray([...previewArray, imgURL]);
  };

  const onAddClick = async () => {
    try {
      let token = localStorage.getItem("token");

      let headers = {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      };

      //form data is used to encode the file uploading , if the request has file uploading  we must pass the request body as FormData.
      let reqBody = new FormData();

      for (let key in bookData) {
        if (key != "uploadedImages") {
          reqBody.append(key, bookData[key]);
        } else {
          bookData.uploadedImages.forEach((eachFile) => {
            reqBody.append("uploadedImages", eachFile);
          });
        }
      }

      let apiResponse = await addBooks(reqBody, headers);
      console.log(apiResponse);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const getUserData = async () => {
    try {
      let token = localStorage.getItem("token");
      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getUserDetails(header);
      if (apiResponse.status == 200) {
        setUserDetails(apiResponse.data);
        console.log(apiResponse.data);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching the data.");
    }
  };

  return (
    <div>
      <Header />
      <div className="relative">
        <div className="h-40 bg-indigo-950"></div>
        <div className="absolute left-20 top-15 border-white border-15 rounded-full w-50 h-50">
          <img className="" src="src\assets\149071.png" alt="" />
        </div>
        <div className="p-20">
          <div className="pt-20 pb-10 flex justify-between">
            <h1 className="text-3xl flex">
              Jam <FaCheckCircle className="m-1 text-xl my-3 text-blue-500" />
            </h1>
            <EditProfile userDetails={userDetails} />
          </div>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Perferendis nesciunt nostrum temporibus vero ex repudiandae officiis
            inventore a. Itaque expedita placeat delectus esse quisquam
            repellendus ut et illo nisi consequuntur?Lorem, ipsum dolor sit amet
            consectetur adipisicing elit. Odit sapiente repellat sunt odio
            accusamus maiores veniam necessitatibus, eaque tenetur omnis. Cum,
            praesentium recusandae? Officiis odit, laboriosam eligendi placeat
            ad enim.
          </p>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <button
          onClick={() => {
            setSellBookFlag(true);
            setBookStatusFlag(false);
            setHistoryFlag(false);
          }}
          className="p-4 border m-1 rounded-2xl cursor-pointer"
        >
          Sell Book
        </button>
        <button
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(true);
            setHistoryFlag(false);
          }}
          className="p-4 border m-1 rounded-2xl cursor-pointer"
        >
          Book Status
        </button>
        <button
          onClick={() => {
            setSellBookFlag(false);
            setBookStatusFlag(false);
            setHistoryFlag(true);
          }}
          className="p-4 border m-1 rounded-2xl cursor-pointer"
        >
          Purchse History
        </button>
      </div>
      {sellBookFlag && (
        <div className="mx-25 bg-gray-500 p-10 mb-10">
          <h1 className="text-center text-4xl mb-10">Book Details</h1>

          <div className="flex justify-evenly">
            <div className=" flex flex-col col-5 gap-3">
              <input
                type="text"
                placeholder="Title"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, title: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Author"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, author: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="No of Pages"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, noOfPages: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Image URL"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, imgURL: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Price"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, price: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Discount Price"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, discountPrice: e.target.value })
                }
              />
              <textarea
                name=""
                id=""
                placeholder="Abstract"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, abstract: e.target.value })
                }
              ></textarea>
            </div>

            <div className="flex flex-col col-5 gap-3">
              <input
                type="text"
                placeholder="Publisher"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, publisher: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Language"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, language: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="ISBN"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, ISBN: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Category"
                className="w-120 p-2 bg-white text-black rounded-xl"
                onChange={(e) =>
                  setBookData({ ...bookData, category: e.target.value })
                }
              />
              <div className="flex justify-center p-8">
                <label htmlFor="imgUpload">
                  <input
                    className="hidden"
                    type="file"
                    name=""
                    id="imgUpload"
                    onChange={(e) => {
                      onImageClick(e);
                    }}
                  />
                  <img className="w-60" src={preview} alt="" />
                </label>
              </div>
              {previewArray.length > 0 && (
                <div className="flex gap-3">
                  {previewArray.map((eachImg) => (
                    <img className="w-25" src={eachImg} alt="" />
                  ))}

                  {previewArray.length < 3 && (
                    <label htmlFor="plus">
                      <input type="text" className="hidden" id="plus" />
                      <img
                        className="w-15"
                        src="https://cdn-icons-png.flaticon.com/512/7134/7134131.png"
                        alt=""
                      />
                    </label>
                  )}
                </div>
              )}
              <button onClick={onAddClick} className="bg-red-500">
                Add Book
              </button>
            </div>
          </div>
        </div>
      )}

      {bookStatusFlag && <div>Book Status</div>}

      {historyFlag && <div>Purchase History</div>}

      <Footer />
    </div>
  );
};

export default Profile;
