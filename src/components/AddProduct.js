import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function AddProduct(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("Organic Products");
  const [img, setImg] = useState("");
  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [uploadImg, setUploadImg] = useState("");//to hold form data object from user image upload

  const { isLoggedIn, isLoading, user, authenticateUser } =
    useContext(AuthContext);

  ///////////////////////upload image ///////////////////////

  const handleFileUpload = (e) => {  
    const file = e.target.files[0];
    const uploadData = new FormData();
    uploadData.append("img", file);
    setUploadImg(uploadData);
  };
  const uploadImage = (uploadImg) => {
    setImgIsLoading(true);
    console.log("uploading.",uploadImg);
    axios
      .post(`${API_URL}/api/products/upload`, uploadImg)
      .then((response) => {
        //console.log("response is: ", response.data.fileUrl);
        // response carries "fileUrl" which we can use to update the state
        setImg(response.data.fileUrl);       
        setImgIsLoading(false);
      })
      .catch((err) => console.log("Error while uploading the file: ", err));
      
    
  };

  useEffect(() => {
    
    
    uploadImage(uploadImg);
    
    
  }, [uploadImg]);
  ///////////////////////upload image ///////////////////////

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedToken = localStorage.getItem("authToken");
    const requestBody = {
      name,
      description,
      price,
      category,
      img,
      user: user._id,
    };

    axios
      .post(`${API_URL}/api/products`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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
    <div className="container-fluid mb-5 mt-4">
      <div className="row justify-content-center">
        <div className="col-10 col-lg-10 col-md-10 col-sm-10 text-white m-3 p-5 bg-dark bg-gradient rounded-3">
          <h3>Add a Product</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name *:</label>
              <input
                className="form-control"
                type="text"
                name="name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Description *:</label>
              <textarea
                className="form-control"
                type="text"
                name="description"
                value={description}
                required 
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Price *:</label>
              <input
                className="form-control"
                type="number"
                name="price"
                min="1"
                max="10000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="mb-3">
            <label className="form-label">Category *:</label>
              <select
                className="form-control"
                name="category"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>
                <option value="Organic Products">Organic Products</option>
                <option value="Reclaimed Textiles">Reclaimed Textiles</option>
                <option value="Refurbished Electronics">Refurbished Electronics</option>
                <option value="Water Conservation">Water Conservation</option>
                <option value="Eco Fertilizers">Eco Fertilizers</option>
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Image:</label>
              <input className="form-control" type="file" name="file" onChange={(e) => handleFileUpload(e)} />
            </div>
            <button className="btn bg-success bg-gradient text-light" type="submit" disabled={imgIsLoading}>Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProduct;
