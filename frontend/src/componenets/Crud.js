import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Store } from 'react-notifications-component';



const Delete = ({id, update})  => {
 const deleteNote = () => {  
   
  axios
    .delete(`https://g-usernotes.herokuapp.com/listnotes/${id}`)
    .then((response) => {
      
      
      update();
    })
    .catch((err) => {
      console.log(err.message);
    })
    
  };
    

    return (
      <a type="submit" onClick={deleteNote}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={16} height={16} viewBox="0 0 16 16" style={{fill: '#000000'}}><path d="M 6.496094 1 C 5.675781 1 5 1.675781 5 2.496094 L 5 3 L 2 3 L 2 4 L 3 4 L 3 12.5 C 3 13.328125 3.671875 14 4.5 14 L 10.5 14 C 11.328125 14 12 13.328125 12 12.5 L 12 4 L 13 4 L 13 3 L 10 3 L 10 2.496094 C 10 1.675781 9.324219 1 8.503906 1 Z M 6.496094 2 L 8.503906 2 C 8.785156 2 9 2.214844 9 2.496094 L 9 3 L 6 3 L 6 2.496094 C 6 2.214844 6.214844 2 6.496094 2 Z M 5 5 L 6 5 L 6 12 L 5 12 Z M 7 5 L 8 5 L 8 12 L 7 12 Z M 9 5 L 10 5 L 10 12 L 9 12 Z" /></svg></a>
    )

};

const Edit = ({setupdate,notess})  => {

  const history = useNavigate();
  
  const [note, setNote] = useState({
    title: '',
    note: '',
  });
  const {id} = useParams();
  

  useEffect(() => {
      axios.get(`https://g-usernotes.herokuapp.com/singlenote/${id}`)
           .then((res)=>{
             
             setNote({title: res.data.title,
              note: res.data.note,})
           })
           .catch((err) => {
            console.log(err.message);
          });
  }, [])
  
  

  const handleChange = (e) =>{
    setNote({
        ...note,
        [e.target.name] : e.target.value,
    });
   
  };

 
  
  const addNote = (event) => {
    event.preventDefault()

    
      const noteObject = {
        title: note.title,
        note: note.note,
        }
  
    axios
        .put(`https://g-usernotes.herokuapp.com/listnotes/${id}`, noteObject)
        .then((res) =>{
          
          setNote({
            title: '',
            note:'',
          })
          setupdate();
          });
    
          Store.addNotification({
            title: "Yo!",
            message: "Your Note Edited Successfully",
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
          history('/notelist')
   };

  return(
    
    <div>
    
    <div className="container-sm">
        <div className="card border-info mb-3" style={{maxWidth:300}}>
          <div className="card-header">Note</div>
          <div className="card-body">
          
            <form className="box" onSubmit={addNote}>
            
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="name" name="title" value={note.title} onChange={handleChange} className="form-control"/>
        </div>
        <div className="mb-3">
          <label className="form-label">Note</label>
          <input type="text" name="note" value={note.note} onChange={handleChange} className="form-control"/>
        </div>
  
        <button type="submit" className="btn btn-primary">Edit</button>
      </form>
      </div>
      </div>
      </div>
 </div>

);
};
 const NoteList = ({note,setnote,welcomeuser, setwelcomeuser, update, setupdate}) =>{
  
  

  const buttonClick = () => {
    setupdate(Math.random());
  };
  const [isLoading, setIsLoading] = useState(false)
  

  useEffect(
    function () {
      setIsLoading(true)
      axios
        .get("https://g-usernotes.herokuapp.com/listnotes", { headers: {'Authorization':`Bearer ${sessionStorage.getItem('jwt')}` } })
        .then((res) => {
          setnote(res.data.notes);

          
          setwelcomeuser(res.data)
          
          setIsLoading(false)
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update]
  ); 

  // console.log(note.n)


    return(
       <>
        {isLoading?<div className="d-flex justify-content-center">
  <div className="spinner-border" style={{width: '5rem', height: '5rem'}} role="status">
    <span className="visually-hidden">Loading...</span>
  </div>
</div>:<><h2 className="text-center ">
    <small className="text-muted">{welcomeuser.name}'s Notes</small>
</h2><div className="row">
       {note.map((value,index)=>{
         return(
           
           
        <div className="card border-secondary mb-3 mx-auto" key={value._id} style={{maxWidth: '18rem'}}>
          <div className="card-header">Note {index+1}</div>
          <div className="card-body text-secondary">
            <h5 className="card-title">{value.title}</h5>
            <p className="card-text">{value.note}</p>
          </div>
          <div className="row row-cols-1 row-cols-md-2 g-6 ">
          
          
          <Delete id={value._id} update={buttonClick} />
          
          <Link className="my-2 my-sm-0" to={`/listnotes/${value._id}`}><svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width={16} height={16} viewBox="0 0 24 24" style={{fill: '#000000'}}>    <path d="M 18.414062 2 C 18.158062 2 17.902031 2.0979687 17.707031 2.2929688 L 15.707031 4.2929688 L 14.292969 5.7070312 L 3 17 L 3 21 L 7 21 L 21.707031 6.2929688 C 22.098031 5.9019687 22.098031 5.2689063 21.707031 4.8789062 L 19.121094 2.2929688 C 18.926094 2.0979687 18.670063 2 18.414062 2 z M 18.414062 4.4140625 L 19.585938 5.5859375 L 18.292969 6.8789062 L 17.121094 5.7070312 L 18.414062 4.4140625 z M 15.707031 7.1210938 L 16.878906 8.2929688 L 6.171875 19 L 5 19 L 5 17.828125 L 15.707031 7.1210938 z" /></svg></Link>
          
          
          {/* <Edit id={value._id} update={buttonClick} index={index} notess={value.note} title={value.title} /> */}
          
        </div></div>
        
        
           
         )
          
       })}
       
       
       
       
  
</div></>}

       

    </> 
    );

};

export default NoteList;
export {Edit,Delete};