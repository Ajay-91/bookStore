import React, { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { allBooks } from "../services/allAPIs";
import { toast } from "react-toastify";
import img1 from "../assets/original-eafb1f025003330fb3d1593f66991853.gif";
import { Link } from "react-router-dom";
import { FaRupeeSign } from "react-icons/fa";
import { authContext } from "../Context/authContext";

const Books = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [bookData, setBookData] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [dupliBookData, setDupliBookData] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const { token } = useContext(authContext);
  useEffect(() => {
    // let token = localStorage.getItem("token");

    if (token) {
      setIsLogged(true);
      getAllBooks();
    }
  }, [searchKey]);

  const getAllBooks = async () => {
    try {
      let token = localStorage.getItem("token");
      let Headers = {
        Authorization: `Bearer ${token}`,
      };
      let apiResponse = await allBooks(Headers, searchKey);
      console.log(apiResponse);
      if (apiResponse.status == 200) {
        setBookData(apiResponse.data.bookData);
        setDupliBookData(apiResponse.data.bookData);
        console.log(dupliBookData);

        let category = [];
        apiResponse.data.bookData.forEach((book) => {
          if (!category.includes(book.category)) {
            category.push(book.category);
          }
        });

        setAllCategories(category);
      } else {
        toast.error(apiResponse.response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const filterByCategory = (category) => {
    let filterBooks = bookData.filter(
      (eachBook) => eachBook.category == category
    );
    console.log(filterBooks);
    setDupliBookData(filterBooks);
  };

  return (
    <div>
      <Header />

      {isLogged ? (
        <>
          <div className="flex flex-col justify-center p-10">
            <h1 className="text-center text-4xl">Collections</h1>

            <div className="flex justify-center p-6">
              <input
                className="bg-white text-black p-2 border w-100"
                type="text"
                placeholder="Search by Title"
                onChange={(e) => setSearchKey(e.target.value)}
              />
              <div className="bg-blue-900 text-white p-3 w-18">Search</div>
            </div>
          </div>

          <div className="grid grid-cols-6 p-15">
            <div className="col-span-1">
              <h1 className=" text-4xl p-4">Filters</h1>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <input
                    type="radio"
                    name="category"
                    id="ja"
                    onClick={getAllBooks}
                  />
                  <label htmlFor="ja">All</label>
                </div>
                {allCategories.map((cat, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="radio"
                      name="category"
                      id={index}
                      onClick={() => filterByCategory(cat)}
                    />
                    <label htmlFor={index}>{cat}</label>
                  </div>
                ))}
              </div>
            </div>

            {bookData?.length > 0 ? (
              <div className="col-span-5 grid grid-cols-4 gap-5 ">
                {bookData?.map((eachBook, index) => (
                  <div className="w-full " key={index}>
                    <div className="h-140 rounded overflow-hidden shadow-lg mx-auto">
                      <div className="flex justify-center"><img
                        className="h-90"
                        src={eachBook.imgURL}
                        alt="Book Cover"
                      /></div>
                      <div className="px-3 py-4">
                        <div className="font-bold text-xl mb-2">
                          {eachBook.title}
                        </div>
                        <p className="text-gray-700 text-base">
                          {eachBook.author}
                        </p>
                      </div>
                      <div className="p-2 flex">
                        <FaRupeeSign className="text-md my-1" />
                        <span className="line-through rounded-full text-md font-semibold text-gray-700 mr-2 mb-2">
                          {eachBook.price}
                        </span>
                        <span className=" rounded-full text-lg font-semibold text-green-700 mr-2 mb-2">
                          {eachBook.discountPrice}
                        </span>
                      </div>
                      <Link
                        to={`/view/${eachBook._id}/book`}
                        className="text-blue-700 px-10 pb-10"
                      >
                        See more...
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <h1>No Books to Display</h1>
            )}
          </div>
        </>
      ) : (
        <div className="p-20 text-center">
          <img
            className="w-50 mx-145 m-10"
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt=""
          />
          <h1 className="text-3xl">
            Please{" "}
            <Link className="text-blue-600" to="/login">
              Login
            </Link>{" "}
            to access all Books
          </h1>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Books;
