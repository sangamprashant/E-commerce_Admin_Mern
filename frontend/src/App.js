import "./App.css"
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AddProduct, Categories, Dashboard, DeleteProduct, Nav, OpenedProduct, Product, SignIn } from "./component";
function App() {
  const [user ,setUser] = useState(JSON.parse(localStorage.getItem("user")))
  return (
    <BrowserRouter>
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
      </Routes></div></div>
    </>:<SignIn user={user} setUser={setUser}/>}
      </div>
      <ToastContainer theme="dark"/>
    </BrowserRouter>
  );
}

export default App;
