import axios from "axios";
import { useState } from "react";
import { Store } from 'react-notifications-component';
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";




const AddNote = ({setupdate}) =>{

    
  const [user, setUser] = useState({
    name: '',
    email:'',
  });
  const [isLoading, setIsLoading] = useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const history = useNavigate();
  
  const handleChange = (e) =>{
    setUser({
        ...user,
        [e.target.name] : e.target.value,
    }
      
      );
    
  };
  const addNote = (event) => {
    setIsLoading(true)
    // event.preventDefault()
    const noteObject = {
      name: user.name,
      email: user.email,
      }
  axios
      .post('https://g-usernotes.herokuapp.com/notes', noteObject, { headers: {'Authorization':`Bearer ${sessionStorage.getItem('jwt')}` } })
      .then((res) =>{
        
        setUser({
          name: '',
          email:'',
        })

        
         
        
        setupdate();
        Store.addNotification({
          title: "Yo!",
          message: "1 Note Added",
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
        setIsLoading(false)
        history('/notelist')
        
      })
      
      
   
  };
  
  
  return(
        <>
        {isLoading?<div class="d-flex justify-content-center">
  <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:<div className="container-sm">
        <div className="card border-info mb-3" style={{maxWidth:300}}>
          <div className="card-header">Notes</div>
          <div className="card-body">
          <h1>Add Notes</h1>
            <form className="box" onSubmit={handleSubmit(addNote)}>
            <div className="mb-3">
          <label className="form-label">Title</label>
          <input {...register("name", { required: true })} type="name" name="name" value={user.name} onChange={handleChange} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
          {errors.name && <div className="alert alert-danger" role="alert">This field is required</div>}
        </div>
        <div className="mb-3">
          <label className="form-label">Note</label>
          
          <textarea {...register("email", { required: true })} type="name" name="email" value={user.email} onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          {errors.email && <div className="alert alert-danger" role="alert">This field is required</div>}
        </div>
  
        <button type="submit" className="btn btn-primary">Add notes</button>
      </form>
      </div>
      </div>
      </div>}

        
    </>
    );

};

export default AddNote;