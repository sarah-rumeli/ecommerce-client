import { useState, useEffect } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
 
function EditProductPage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");
  const {productId} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');

    axios
    .get(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        const oneProduct = response.data;
        setName(oneProduct.name);
        setDescription(oneProduct.description);
        setPrice(oneProduct.price);
        setCategory(oneProduct.category);
        setImg(oneProduct.img);
    })
    .catch((error) => console.log("There has been error retrieving Product Details: ", error));
  }, [productId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestBody = {name, description, price, category, img};
    const storedToken = localStorage.getItem('authToken');

    axios
    .put(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, requestBody, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then((response) => {
        navigate(`/products/${productId}`)
    });
  };

  const deleteProduct = () => {
    const storedToken = localStorage.getItem('authToken');

    axios
    .delete(`${process.env.REACT_APP_API_URL}/api/products/${productId}`, { headers: {Authorization: `Bearer ${storedToken}`} })
    .then(() => {
        navigate("/products");
    })
    .catch((error) => console.log("There has been error deleting this Product: ", error));
  }

  return (
    <div className="EditProductPage">
      <h3>Edit the Product</h3>

      <form onSubmit={handleSubmit}>
        <label>Name *:</label>
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
 
        <label>Description *:</label>
        <textarea
          type="text"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Price *:</label>
        <input
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Category *:
        <select
         name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">Select a category</option>
          <option value="Organic Products">Organic Products</option>
          <option value="Reclaimed Textiles">Reclaimed Textiles</option>
          <option value="Refurbished Electronics">Refurbished Electronics</option>
          <option value="Water Conservation">Water Conservation</option>
          <option value="Eco Fertilizers">Eco Fertilizers</option>
        </select>
      </label>

      <label>Image:</label>
        <input
          type="text"
          name="img"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        />
 
      <button type="submit">Submit</button>
      </form>

      <button onClick={deleteProduct}>Delete Product</button>
    </div>
  );
}
 
export default EditProductPage;