import axios from "axios";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { Store } from 'react-notifications-component';
import { useForm } from "react-hook-form";
// import 'animate.css/animate.min.css';



const Login = () => {
    const [user, setUser] = useState({
        username:'',
        password:'',
      });
    const [isLoading, setIsLoading] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();

      const history = useNavigate();

    const handleOnChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        })};

        const handleOnClick = (e) => {
          setIsLoading(true)
            // e.preventDefault()
            const noteObject = {
              username: user.username,
              password: user.password,
              }
          axios
              .post('https://g-usernotes.herokuapp.com/signin', noteObject)
              .then((res) =>{
                
                setUser({
                    username:'',
                    password:'',
                })
                setIsLoading(false)
                
                
                sessionStorage.setItem('jwt', res.data.token)
                Store.addNotification({
                  title: "Yo!",
                  message: "You are Successfully Logged in",
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
                // window.location.href = "/"

                window.location.href = "/"
                
                })
                .catch((err) => {
                  Store.addNotification({
                    title: "Error!",
                    message: "Please Enter Correct Details",
                    type: "danger",
                    insert: "top",
                    container: "top-right",
                    animationIn: ["animate__animated", "animate__fadeIn"],
                    animationOut: ["animate__animated", "animate__fadeOut"],
                    dismiss: {
                      duration: 5000,
                      onScreen: true
                    }
                  });
                  console.log(err.message);
                });
                
            };

            return  (

                <>
                {isLoading?<div className="d-flex justify-content-center">
  <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:<div className="container-sm">
        <div className="card border-info mb-3" style={{maxWidth:300}}>
          <div className="card-header">Login</div>
          <div className="card-body">
          
            <form className="box" onSubmit={handleSubmit(handleOnClick)}>
            
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input {...register("username", { required: true })} type="name" name="username" value={user.username} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          {errors.username && <div className="alert alert-danger" role="alert">This field is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: true })} type="password" name="password" value={user.password} onChange={handleOnChange} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"/>
          {errors.password && <div className="alert alert-danger" role="alert">This field is required</div>}
        </div>
  
        <button type="submit"  className="btn btn-primary">Signin</button>
      </form>
      </div>
      </div>
      </div>}
        
    </>
            )
};

export default Login;