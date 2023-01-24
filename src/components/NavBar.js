import { Link } from "react-router-dom"



function Navbar (){


return(

<nav>
<Link to="/">
        <button>Home</button>
      </Link>

      <Link to="/products">
            <button>Products</button>
          </Link> 

          <Link to="/categories">
            <button>Categories</button>
          </Link> 
              
          <button >Logout</button>
          
          <>
          <Link to="/signup"> <button>Sign Up</button> </Link>
          <Link to="/login"> <button>Login</button> </Link>
        </>

</nav>



)








}

export default Navbar