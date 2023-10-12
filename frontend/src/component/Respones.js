import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from '../AdminContext';

function Responses() {
  const [responses, setResponses] = useState([]);
  const { token, nav, setNav } = useContext(AdminContext);


  useEffect(() => {
    // Fetch responses from your server here and update the 'responses' state.
    // You can use the 'fetch' function or any other method to get the data.

    // Example using 'fetch':
    fetch('/api/responses',{
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      })
      .then((response) => response.json())
      .then((data) => setResponses(data))
      .catch((error) => console.error('Error fetching responses:', error));
  }, []);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-20">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900">Responses</h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Showing the responses made by users</p>
        </div>
        <div className="lg:w-2/3 w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Sr.no</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Name</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Email</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Message</th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">Action</th>
              </tr>
            </thead>
            <tbody>
              {responses.map((response, index) => (
                <tr key={response._id}>
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3">{response.name}</td>
                  <td className="px-4 py-3">{response.email}</td>
                  <td className="px-4 py-3">{response.message}</td>
                  <td className="px-4 py-3 text-lg text-gray-900">
                  <Link to={`/response/${response._id}`} className="text-blue-500">
                      Response
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Responses;
