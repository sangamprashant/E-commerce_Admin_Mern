import "./App.css"
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct, Categories, Dashboard, DeleteProduct, MessageUser, Nav, OpenedProduct, OrderPrint, Orders, Product, Respones, Setting, SignIn } from "./component";
import { AdminContext } from "./AdminContext";
function App() {
  const [user ,setUser] = useState(JSON.parse(sessionStorage.getItem("user")))
  const [token, setToken] = useState(sessionStorage.getItem("token"))
  const [nav,setNav] = useState("")

  return (
    <BrowserRouter>
    <AdminContext.Provider value={{user,setUser,token, setToken,nav,setNav}}>
    <div className="bg-blue-900 min-h-screen flex">
    {user?<>
      <Nav />
      <div className="bg-white flex flex-grow mt-2 mr-2 mb-2 rounded-lg p-4"><div className="w-full">
      <Routes>
        <Route exact path="/" element={<Dashboard />}/>
        <Route exact path="/products" element={<Product />}/>
        <Route exact path="/products/new" element={<AddProduct />}/>
        <Route exact path="/products/delete/:productId" element={<DeleteProduct />}/>
        <Route exact path="/products/edit/:productId" element={<OpenedProduct />}/>
        <Route exact path="/categories" element={<Categories />}/>
        <Route exact path="/orders" element={<Orders />}/>
        <Route exact path="/orders/invoice/:id" element={<OrderPrint />}/>
        <Route exact path="response" element={<Respones />}/>
        <Route exact path="response/:id" element={<MessageUser />}/>
        <Route exact path="/settings" element={<Setting />}/>
      </Routes></div></div>
    </>:<SignIn />}
      </div>
      <ToastContainer theme="dark"/>
      </AdminContext.Provider>
    </BrowserRouter>
  );
}

export default App;
