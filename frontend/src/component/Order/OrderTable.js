import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../AdminContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const OrderTable = () => {
  const { user, setUser, token, setToken } = useContext(AdminContext);
  const [Orders, setOrders] = useState([]);
  const [getCount, setGetCount] = useState();
  const orderStatusOptions = [
    "confirm",
    "packing",
    "packed",
    "shipping",
    "out to deliver",
    "delivered",
    "canceled",
  ];
  const [status, setStatus] = useState(orderStatusOptions[0]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrder();
    fetchCount();
  }, [status]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `/api/orders/get/by/status/${status}`,
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

  const fetchCount = async () => {
    try {
      const response = await axios.get(
        "/api/orders/count/by/status",
        {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        }
      );
      if (response.status === 200) {
        // console.log(response.data);
        setGetCount(response.data);
      }
    } catch (error) {}
  };

  const getNextStatus = (currentStatus) => {
    const currentIndex = orderStatusOptions.indexOf(currentStatus);
    if (currentIndex !== -1 && currentIndex < orderStatusOptions.length - 1) {
      return orderStatusOptions[currentIndex + 1];
    } else {
      return "No Next Status";
    }
  };

  const handleNextStatus = async (currentStatus, orderId) => {
    const currentIndex = orderStatusOptions.indexOf(currentStatus);
    if (currentIndex !== -1 && currentIndex < orderStatusOptions.length - 1) {
      const nextStatus = orderStatusOptions[currentIndex + 1];
      try {
        // Send a PUT request to update the order status
        const response = await axios.put(
          `/api/orders/update-status/${orderId}`,
          {
            status: nextStatus,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.status === 200) {
          toast.success(response.data.message);
          // Order status updated successfully, refresh the order list
          fetchOrder();
          fetchCount();
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      toast.error("No next status");
    }
  };

  return (
    <section ame="text-gray-600 body-font">
      <div className="container px-5 py-3 mx-auto">
        <div className="flex flex-row w-full mb-5 justify-evenly group-in-range:7">
          {orderStatusOptions.map((count, index) => (
            <div
              key={index}
              className={`productCount text-center ${
                count === status ? "active" : ""
              }`}
              onClick={() => setStatus(count)}
            >
              <h1>{count}</h1>
              <p>{getCount ? getCount[count] : 0}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col text-center w-full mb-5">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-gray-900 headding-capital">
            {status}
          </h1>
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
                {status !== "delivered" && status !== "canceled" && (
                  <th className="px-4 py-3 title-font tracking-wider font-medium text-gray-900 text-sm bg-gray-100">
                    Next Status
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {Orders &&
                Orders.map((order) => (
                  <tr key={order._id} className="TableRow">
                    <td className="px-4 py-3">
                      {new Date(order.createdAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">{order.name}</td>
                    <td className="px-4 py-3">{order.street}</td>
                    <td className="px-4 py-3 text-lg text-gray-900">
                      {order.city}
                    </td>
                    <td className="w-10 text-center">{order.postalCode}</td>
                    <td className="px-4 py-3">
                      <table className="table">
                        <thead>
                          <tr>
                            <th className="px-3">Product Name</th>
                            <th className="px-3">Quantity</th>
                            <th className="px-3">Price</th>
                          </tr>
                        </thead>
                        <tbody className="productDetails">
                          {order?.line_items?.map((item, index) => (
                            <tr key={index}>
                              <td
                                className={
                                  index % 2 == 0 ? "orderProductEven" : ""
                                }
                              >
                                {item?.price_data?.product_data?.name}
                              </td>
                              <td className="orderPrice">{item.quantity}</td>
                              <td className="orderPrice">
                                {item?.price_data?.unit_amount}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                    <td
                      className={`px-4 py-3 ${
                        order.paid ? "text-green-600" : "text-red-600"
                      } font-bold`}
                    >
                      {order.paid ? "Yes" : "No"}
                    </td>
                    {status !== "delivered" && status !== "canceled" && (
                      <td className="px-4 py-3 orderButton">
                        <button
                          onClick={() =>
                            navigate(`/orders/invoice/${order._id}`, {
                              state: { orderDatas: order },
                            })
                          }
                        >
                          Print
                        </button>
                        <span>
                          once order status is changed it will not be back.
                        </span>
                        <button
                          onClick={() =>
                            handleNextStatus(order.status, order._id)
                          }
                        >
                          Next:{getNextStatus(order.status)}
                        </button>
                      </td>
                    )}
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
