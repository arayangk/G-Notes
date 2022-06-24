import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Store } from 'react-notifications-component';
import { useNavigate } from "react-router-dom";

const SignUp = () => {
    const [user, setUser] = useState({
        name:'',
        username:'',
        password:'',
      });
      
      const { register, handleSubmit, formState: { errors } } = useForm();
      const [isLoading, setIsLoading] = useState(false)
      const history = useNavigate();

    const handleOnChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value,
        })};

        const handleOnClick = (e) => {
          setIsLoading(true)
            
            const noteObject = {
              name: user.name,
              username: user.username,
              password: user.password,
              }
          axios
              .post('https://g-usernotes.herokuapp.com/signup', noteObject)
              .then((res) =>{
                
                setUser({
                    name:'',
                    username:'',
                    password:'',
                })
                setIsLoading(false)
                
                Store.addNotification({
                  title: "Yo!",
                  message: "Signed Up Successfully, Please Login Now",
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
                history('/login')
                })
                .catch((err)=>{
                  
                  Store.addNotification({
                    title: "Error!",
                    message: `${err.message}`,
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
                })
            };

            return  (

                <>
              {isLoading?<div className="d-flex justify-content-center">
  <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:<div className="container-sm">
        <div className="card border-info mb-3" style={{maxWidth:300}}>
          <div className="card-header">Registration</div>
          <div className="card-body">
          
            <form className="box" onSubmit={handleSubmit(handleOnClick)}>
            <div className="mb-3">
          <label className="form-label">Name</label>
          <input {...register("name", { required: true })} type="name" name="name" value={user.name} onChange={handleOnChange} className="form-control" id="exampleInputEmail0" aria-describedby="emailHelp"/>
          {errors.name && <div className="alert alert-danger" role="alert">This field is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input {...register("username", { required: true, pattern: /^[a-z0-9_\.]+$/ })} type="name" name="username" value={user.username} onChange={handleOnChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        </div>
        {errors.username && <div className="alert alert-danger" role="alert">Only small letters allowed</div>}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input {...register("password", { required: true })} type="password" name="password" value={user.password} onChange={handleOnChange} className="form-control" id="exampleInputEmail2" aria-describedby="emailHelp"/>
        </div>
        {errors.password && <div className="alert alert-danger" role="alert">This field is required</div>}
  
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      </div>
      </div>
      </div>}


        
    </>
            )
};

export default SignUp;