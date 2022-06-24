
import { Link, useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { useEffect } from "react";
import IfLogin from './IfLogin'


  const LoggedInHeader = () => {

    const history = useNavigate();

   const LogOut =  ()  => {

  
    

    

    
      sessionStorage.clear();
      
      
      window.location.href = "/"
      Store.addNotification({
        title: "Done!",
        message: "Logout Successfully",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 5000,
          onScreen: true
        }
      });
    
  }
    return(
      <div>
        

<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        
        <li className="nav-item">
        <Link className="navbar-brand" to="/">Home</Link>
          <Link className="navbar-brand" to="/notelist">Notes List</Link>
        
        
          <Link className="navbar-brand" to="/addnotes">Add Notes</Link>
          
        </li>
       
      </ul>
      <button className="btn btn-outline-success my-2 my-sm-0" onClick={LogOut} type="submit">Logout</button>
    </div>
  
</nav>
</div>

    );

};

export default LoggedInHeader;