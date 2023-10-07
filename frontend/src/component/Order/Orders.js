import React, { useState } from "react";
import OrderTable from "./OrderTable";

function Orders() {
const orderStatusOptions = ['confirm', 'packing', 'packed', 'shipping', 'out to deliver', 'delivered', 'canceled'];
const [dataOf, setDataOf] = useState(orderStatusOptions[0])

  return (
    <div>
      <h1>Orders</h1>
      <div className="flex px-5">
        <label className="px-3">Status: </label>
        <select value={dataOf} onChange={(e)=>setDataOf(e.target.value)}>
          {orderStatusOptions.map(options=>(<option key={options} value={options}>{options}</option>))}
        </select>
      </div>
      {/* table */}
      <OrderTable status={dataOf}/>
    </div>
  );
}

export default Orders;
