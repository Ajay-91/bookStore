import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import bg from "../assets/Homeimg.jpeg.jpg";
import Footer from "../components/Footer";
import img1 from "../assets/original-eafb1f025003330fb3d1593f66991853.gif";
import { toast } from "react-toastify";
import { SampleBook } from "../services/allAPIs";

const Home = () => {
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    getBookData();
  }, []);

  const getBookData = async () => {
    try {
      let apiResponse = await SampleBook();
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.SampleBooks);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="font-serif">
      <Header />
      <div
        className="h-125 text-white flex flex-col justify-center items text-center"
        style={{
          backgroundImage: `url(${bg})`,
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundSize: "100%",
          minHeight: "70vh",
        }}
      >
        <div>
          <h2 className="text-5xl">Wonderful Gifts</h2>
          <h3 className="text-1xl">Give your family and friends a book</h3>
        </div>
        <div>
          <input
            className="bg-white w-120 h-12 rounded-2xl mt-9 text-black ps-5"
            type="text"
            placeholder="Search Books"
          />
        </div>
      </div>

      <div className="ps-40 pe-40">
        <div className="text-center p-10 mb-20">
          <h3 className="text-1xl">NEW ARRIVALS</h3>
          <h2 className="text-3xl">Explore Our Latest Collection</h2>
          {bookData?.length > 0 && (
            <div className="grid grid-cols-4 gap-4 pt-7 container">
              {bookData?.map((book, index) => (
                <div className="h-100 shadow w-70" key={index}>
                  <img className="w-full" src={img1} alt="no image" />
                  <h4>{book.title}</h4>
                  <h4>{book.author}</h4>
                  <h4>{book.price}</h4>
                </div>
              ))}
            </div>
          )}
          <button className="btn bg-blue-900 p-3 text-1xl text-white mt-5">
            Explore More
          </button>
        </div>

        <div className="grid grid-cols-2 gap-10 mb-10">
          <div className="flex flex-col gap-5">
            <div className="text-center">
              <h3 className="text-1xl">FEATURED AUTHORS</h3>
              <h3 className="text-3xl">Captivates with every word</h3>
            </div>
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>
            <p className="text-justify">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
              fuga nostrum illum distinctio eum quidem recusandae soluta aliquam
              laboriosam odit quas, nam molestias fugiat culpa rem nulla iste?
              Modi, molestias. Lorem ipsum dolor sit amet, consectetur
              adipisicing elit. Sunt earum possimus accusantium necessitatibus
              id neque soluta quibusdam explicabo laborum? Deserunt vel quia
              voluptates dicta incidunt illo fuga pariatur sequi error.
            </p>
          </div>

          <div className="content-center">
            <img
              className="w-full"
              src="https://thumbs.dreamstime.com/b/handsome-cheerful-african-american-executive-business-man-workspace-office-strong-powerful-modern-businessman-pose-looking-86822385.jpg"
              alt=""
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-5 text-center p-10">
          <div>
            <h3 className="text-1xl">TESTIMONIALS</h3>
            <h3 className="text-3xl">See What Others Are Saying</h3>
          </div>
          <div>
            <img
              className="h-40 w-40 rounded-full"
              src="https://m.media-amazon.com/images/M/MV5BMTc2NzE4ODQzOV5BMl5BanBnXkFtZTgwNDUyNzEzNzE@._V1_QL75_UX291_.jpg"
              alt=""
            />
            <p>Erik King</p>
          </div>
          <p className="text-justify">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore
            perspiciatis porro eveniet. Optio necessitatibus provident autem,
            quam qui, dicta molestiae quis quia deleniti aliquam magnam
            temporibus mollitia ex repellendus! Dicta. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Consequuntur, deserunt optio eum
            dolorum iure consectetur quia facilis porro modi placeat ea quis
            explicabo maxime voluptatum unde animi nemo aperiam quos!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
