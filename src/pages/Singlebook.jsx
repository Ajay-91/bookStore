import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getSingleBook, paymentDetails } from "../services/allAPIs";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "flowbite-react";
import { baseURL } from "../services/baseURL";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";
import { authContext } from "../Context/authContext";

const Singlebook = () => {
  const [bookData, setBookData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const { token } = useContext(authContext);

  useEffect(() => {
    getData();
  }, []);

  let { id } = useParams();
  console.log(id);

  const getData = async () => {
    try {
      let Header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await getSingleBook(id, Header);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.singleBook);
        console.log(apiResponse.data.singleBook);
      } else {
        console.log(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  const onBuyClick = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51Soch0IIMdycxOYl6KD2sGWE7EAjI6J0sPjt8PP34f69ZIUWGxCrz0toESLxyhljvaHMduMgZN50FbivoZPCPIYm00Odvpc8Nv"
      );

      let reqBody = {
        bookId: bookData._id,
        bookName: bookData.title,
        bookDesc: bookData.abstract,
        bookImage: bookData.imgURL,
        sellerMail: bookData.userMail,
        price: bookData.price,
        discountPrice: bookData.discountPrice,
      };

      let header = {
        Authorization: `Bearer ${token}`,
      };

      let apiResponse = await paymentDetails(reqBody, header);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        let session = apiResponse.data.session;
        window.location.href = session.url;
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while doing payment.");
    }
  };

  return (
    <div>
      <Header />
      <div className="mx-15 border p-10 my-10 grid grid-cols-10 gap-4">
        <div className="col-span-2">
          <img src={bookData?.imgURL} alt="" className="max-w-full" />
        </div>
        <div className="col-span-6 p-10">
          <h1 className="text-center text-3xl">{bookData.title}</h1>
          <div className="p-10 grid grid-cols-10 justify-between">
            <div className="col-span-5 flex flex-col gap-4">
              <div className="flex gap-3">
                <span className="font-bold">Author:</span>:
                <span>{bookData.author}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">Publisher</span>:
                <span>{bookData.publisher}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold">Price</span>:
                <span>{bookData.price}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">Discounted Price</span>:
                <span>{bookData.discountPrice}</span>
              </div>
            </div>
            <div className="col-span-5 flex flex-col gap-4">
              <div className="flex gap-3">
                <span className="font-bold">Number of Pages</span>:
                <span>{bookData.noOfPages}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">ISBN</span>:
                <span>{bookData.ISBN}</span>
              </div>

              <div className="flex gap-3">
                <span className="font-bold">Language</span>:
                <span>{bookData.language}</span>
              </div>
              <div className="flex gap-3">
                <span className="font-bold">Category</span>:
                <span>{bookData.category}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 text-center p-10">
          <button
            onClick={() => setOpenModal(true)}
            className="bg-green-500 p-4 rounded border"
          >
            View More Images...
          </button>
          <h3 className="mt-7">
            <span className="font-bold">Abstract</span>:
            <span>{bookData.abstract}</span>
          </h3>

          <div className="mt-5 flex gap-3">
            <Link to="/books">
              <div className=" border border-blue-800 font-bold text-blue-800 rounded w-22  p-2 hover:bg-blue-300">
                Go back
              </div>
            </Link>

            <button
              onClick={onBuyClick}
              className=" border border-green-800 font-bold text-green-800 rounded w-22  p-2 hover:bg-green-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <Modal
        className="mx-60"
        show={openModal}
        onClose={() => setOpenModal(false)}
      >
        <ModalHeader className="bg-blue-950 text-cyan-50 text-xl">
          Uploaded Images
        </ModalHeader>
        <ModalBody className="bg-cyan-50 text-blue-950">
          <div className="space-y-5 flex justify-around">
            {bookData?.uploadedImages?.map((eachImg) => (
              <img className="w-50" src={`${baseURL}/uploads/${eachImg}`} />
            ))}
          </div>
        </ModalBody>
        <ModalFooter className="bg-cyan-50">
          <Button
            className="text-cyan-50 bg-blue-950 text-xl p-1 rounded border-blue-50"
            onClick={() => setOpenModal(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </Modal>

      <Footer />
    </div>
  );
};

export default Singlebook;
