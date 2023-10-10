import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminContext } from "../../AdminContext";

function DeleteProduct() {
  const { token, nav, setNav } = useContext(AdminContext);
  const navigate = useNavigate()
  const { productId } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    fetchProduct(productId);
  }, [productId]);

  const fetchProduct = (id) => {
    if (!id) {
      return;
    } else {
      axios
        .get(`/api/products/${id}`, {
          headers: {
            Authorization: "Bearer " + token, // Set the Authorization header
          },
        })
        .then((response) => {
          setProduct(response.data);
        });
    }
  };
  

  function goBack() {
    navigate("/products");
  }

  function deleteProduct() {
    axios.put(`/api/products/delete/${productId}`,{},{
      headers: {
        Authorization: "Bearer " + token, // Set the Authorization header
      },
    }).then(() => {
      goBack();
    });
  }

  return (
    <div>
      <h1 className="text-center">Do you want to delete "{product?.title}"</h1>
      <div className="flex justify-center gap-2 w-full">
        <button className="btn-red" onClick={deleteProduct}>
          Yes
        </button>
        <button className="btn-default" onClick={goBack}>
          No
        </button>
      </div>
    </div>
  );
}

export default DeleteProduct;
