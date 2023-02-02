import { useState, useEffect,useContext } from "react";
import {useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
 
function EditProductPage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [img, setImg] = useState("");

  const [imgIsLoading, setImgIsLoading] = useState(false);
  const [uploadImg, setUploadImg] = useState("");//to hold form data object from user image upload

  const { isLoggedIn, isLoading, user, authenticateUser } =
    useContext(AuthContext);

  const {productId} = useParams();
  const navigate = useNavigate();

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
      .post(`${process.env.REACT_APP_API_URL}/api/products/upload`, uploadImg)
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
    <div className="editproduct">
    <div className="text-white editpage">
      <div className="text-white">
        <div className="text-white m-3 p-5 bg-dark box-bg-gradient rounded-3">
      <h3>Edit the Product</h3>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name *:</label>
        <input
         className="form-control"
          type="text"
          name="name"
          value={name}
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
          onChange={(e) => setDescription(e.target.value)}
        />
   </div>
   <div className="mb-3">
        <label className="form-label">Price *:</label>
        <input
        className="form-control"
          type="number"
          name="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
 </div>
 <div className="mb-3">
        <label className="form-label">Category *: </label>
        <select
        className="form-control"
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
        </div>
        <div className="mb-3">
      <label className="form-label" style ={{marginRight:"1vw"}}> Current Image:</label>
      <img src ={img} alt = "currentpic" className="editimg"/>
        <input className="form-control"
         type="file"
          name="img"
         
          onChange={(e) => handleFileUpload(e)}
          style ={{marginTop:"1vw"}}
        />
  </div>
      <button className="btn bg-success bg-gradient text-light" type="submit">Submit</button>
      </form>
      </div>
      </div>
      <button className="btn btn-outline-danger rounded btn-sm deletebtn" onClick={deleteProduct}>Delete Product</button>
    </div>
    </div>
  );
}
 
export default EditProductPage;