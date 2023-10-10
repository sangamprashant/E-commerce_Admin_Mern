import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AdminContext } from "../AdminContext";

function Setting() {
  const [initial, setInitial] = useState(true);
  const { user, setUser, token, setToken,setNav } = useContext(AdminContext);

  const [emailUpdate, setEmailUpdate] = useState({
    oldEmail: JSON.parse(sessionStorage.getItem("user")).email,
    newEmail: "",
    password: "",
  });

  const [passwordUpdate, setPasswordUpdate] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
  });

  useEffect(()=>{
    setNav("setting")
  })

  const handleEmailUpdate = async (e) => {
    e.preventDefault();
    if (emailUpdate.oldEmail && emailUpdate.newEmail && emailUpdate.password) {
      try {
        const response = await axios.put(
          "/api/admin/update/email",
          emailUpdate,
          {
            headers: {
              Authorization: "Bearer " + token, // Set the Authorization header
            },
          }
        );
        if (response.status === 200) {
          commonDataAction(response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  const commonDataAction = (data) => {
    toast.success(data.message);
    sessionStorage.setItem("user", JSON.stringify(data.user));
    setEmailUpdate({
      oldEmail: JSON.parse(sessionStorage.getItem("user")).email,
      newEmail: "",
      password: "",
    });
    setPasswordUpdate({
      email: "",
      oldPassword: "",
      newPassword: "",
    });
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (
      passwordUpdate.email &&
      passwordUpdate.oldPassword &&
      passwordUpdate.newPassword
    ) {
      try {
        const response = await axios.put(
          "/api/admin/update/password",
          passwordUpdate,
          {
            headers: {
              Authorization: "Bearer " + token, // Set the Authorization header
            },
          }
        );
        if (response.status === 200) {
          commonDataAction(response.data);
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("All fields are required.");
    }
  };

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Admin Setting
            </h1>
            <div className="lg:w-1/2 md:w-2/3 mx-auto">
              <div className="flex flex-wrap">
                <button
                  type="button"
                  onClick={() => setInitial(true)}
                  className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                    initial ? "bg-indigo-600" : ""
                  }`}
                >
                  Update Email
                </button>
                <button
                  type="button"
                  onClick={() => setInitial(false)}
                  className={`flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg ${
                    !initial ? "bg-indigo-600" : ""
                  }`}
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
          {initial ? (
            <div>
              <div className="flex flex-col text-center w-full">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Update Email
                </h1>
              </div>
              <form
                onSubmit={handleEmailUpdate}
                className="lg:w-1/2 md:w-2/3 mx-auto"
              >
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label className="leading-7 text-sm text-gray-600">
                        Old email
                      </label>
                      <input
                        type="email"
                        value={emailUpdate.oldEmail}
                        disabled
                        name="email"
                        required
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
                        New email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="newEmail"
                        value={emailUpdate.newEmail}
                        onChange={(e) =>
                          setEmailUpdate({
                            ...emailUpdate,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label className="leading-7 text-sm text-gray-600">
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={emailUpdate.password}
                        onChange={(e) =>
                          setEmailUpdate({
                            ...emailUpdate,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-full">
                    <button
                      type="submit"
                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Update Email
                    </button>
                  </div>
                </div>
              </form>
            </div>
          ) : (
            <div>
              <div className="flex flex-col text-center w-full">
                <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
                  Update Password
                </h1>
              </div>
              <form
                onSubmit={handlePasswordUpdate}
                className="lg:w-1/2 md:w-2/3 mx-auto"
              >
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label className="leading-7 text-sm text-gray-600">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={passwordUpdate.email}
                        onChange={(e) =>
                          setPasswordUpdate({
                            ...passwordUpdate,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label className="leading-7 text-sm text-gray-600">
                        Old password
                      </label>
                      <input
                        type="password"
                        name="oldPassword"
                        value={passwordUpdate.oldPassword}
                        onChange={(e) =>
                          setPasswordUpdate({
                            ...passwordUpdate,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="p-2 w-1/2">
                    <div className="relative">
                      <label
                        htmlFor="newPassword"
                        className="leading-7 text-sm text-gray-600"
                      >
                        New password
                      </label>
                      <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwordUpdate.newPassword}
                        onChange={(e) =>
                          setPasswordUpdate({
                            ...passwordUpdate,
                            [e.target.name]: e.target.value,
                          })
                        }
                        required
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-full">
                    <button
                      type="submit"
                      className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    >
                      Update Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Setting;
