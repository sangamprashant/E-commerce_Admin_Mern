import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminContext";
import { toast } from "react-toastify";

const OrderTable = ({ status }) => {
  const { user, setUser, token, setToken } = useContext(AdminContext);
  const [Orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOder();
  }, [status]);

  const fetchOder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/get/by/status/${status}`,
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        setOrders(response.data);
      }
    } catch (error) {
      toast.error(error.response.message);
    }
  };

  return (
    <section ame="text-gray-600 body-font">
      <div className="container px-5 py-3 mx-auto">
        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 headding-capital">{status}</h1>
        </div>
        <div className="w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100 rounded-tl rounded-bl">
                  Date
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Receiver Name
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  addresss
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  city
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  zip
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Product
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Paid
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                  Next Status
                </th>
              </tr>
            </thead>
            <tbody>
              {Orders &&
                Orders.map((order) => (
                  <tr key={order._id} className="TableRow">
                    <td className="px-4 py-3">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3">{order.street}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">{order.city}</td>
                    <td className="w-10 text-center">{order.postalCode}</td>
                    <td className="px-4 py-3">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Product Name</th>
                            <th>Quantity</th>
                            <th>Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.line_items.map((item, index) => (
                            <tr key={index}>
                              <td>{item.priceData.product_data.name}<hr /></td>
                              <td>{item.quantity}</td>
                              <td>{item.priceData.unit_amount}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td className="px-4 py-3">{order.paid ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">
                      <button>Next</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default OrderTable;
