import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../AdminContext";
import { toast } from "react-toastify";

function MessageUser() {
  const { token } = useContext(AdminContext);
  const [response, setResponse] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    fetch(`/api/responses/${id}`, {
      headers: {
        Authorization: "Bearer " + token, // Set the Authorization header
      },
    })
      .then((response) => response.json()) // Parse the response as JSON
      .then((data) => setResponse(data)) // Update the state with the fetched data
      .catch((error) => console.error("Error fetching response:", error));
  };

  const handleResponse = () => {
    // Make a POST request to save the response and send the email
    fetch(`/api/responses/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ responseMessage }),
    })
      .then((response) => response.json())
      .then((data) => {
        toast.success("respond send.");
        navigate("/response");
      })
      .catch((error) => console.error("Error saving response:", error));
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Response to {response.name}
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            {response.message}
          </p>
        </div>
        <div className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600"
                >
                  Sender Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  disabled
                  value={response.name}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Sender Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  disabled
                  value={response.email}
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={responseMessage}
                  onChange={(e) => setResponseMessage(e.target.value)}
                  placeholder="Write the response here.."
                  className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <button
                onClick={handleResponse}
                className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover-bg-indigo-600 rounded text-lg"
              >
                Button
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MessageUser;
