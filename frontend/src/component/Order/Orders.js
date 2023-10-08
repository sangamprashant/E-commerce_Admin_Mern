import React, { useState } from "react";
import OrderTable from "./OrderTable";

function Orders() {

  return (
    <div>
      <h1>Orders</h1>
      {/* table */}
      <OrderTable/>
    </div>
  );
}

export default Orders;
