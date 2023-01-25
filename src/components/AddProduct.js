import { useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5005";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Organic Products");
  const [img, setImg] = useState("");

  const handleSubmit = (e) => {
    // <== ADD
    e.preventDefault();

    const storedToken = localStorage.getItem('authToken');
    const requestBody = { name, description, price, category, img };
    console.log(requestBody);

    axios
      .post(`${API_URL}/api/products`, requestBody, { headers: {Authorization: `Bearer ${storedToken}`} })
      .then((response) => {
        // Reset the state
        setName("");
        setDescription("");
        setPrice(0);
        setCategory("Organic Products");
        setImg("");

        props.refreshProducts();
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="AddProduct">
      <h3>Add Product</h3>
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

        <label>
          Category *:
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Select a category</option>
            <option value="Organic Products">Organic Products</option>
            <option value="Reclaimed Textiles">Reclaimed Textiles</option>
            <option value="Refurbished Electronics">
              Refurbished Electronics
            </option>
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
    </div>
  );
}

export default AddProduct;
