import React, { useContext, useEffect, useState } from "react";
import OrderTable from "./OrderTable";
import { AdminContext } from "../../AdminContext";

function Orders() {
  const { setNav } = useContext(AdminContext);
  
useEffect(()=>{
  setNav("order")
},[])

  return (
    <div>
      <h1>Orders</h1>
      {/* table */}
      <OrderTable/>
    </div>
  );
}

export default Orders;
