import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ProductForm from "./ProductForm";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../AdminContext";

export default function OpenedProduct() {
  const { token, nav, setNav } = useContext(AdminContext);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const id = params.productId;

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`/api/products/${id}`,{
        headers: {
          Authorization: "Bearer " + token, // Set the Authorization header
        },
      })
      .then((response) => {
        setProduct(response.data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        setError(error); // Handle errors and set the error state
        setLoading(false); // Set loading to false even in case of an error
      });
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Edit Product</h1>
      {product && <ProductForm {...product} />}
    </div>
  );
}
