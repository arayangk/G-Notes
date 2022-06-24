
import { Link } from "react-router-dom";






const Header = () => {

  
    return(<>
    


<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
        <Link className="navbar-brand" to="/">Home</Link>
        
          <Link className="navbar-brand" to="/signup">Sign Up</Link>
          <Link className="navbar-brand" to="/login">Login</Link>
          
        </li>
       
      </ul>
    
  </div>
</nav>


</>

    );

};

export default Header;