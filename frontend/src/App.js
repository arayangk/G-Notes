import { useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import NoteList, { Edit } from './componenets/Crud';
import AddNote from './componenets/AddNote';
import SignUp from "./componenets/SignUp";
import Home from "./componenets/Home";
import Login from './componenets/Login';
import IfLogin from "./componenets/IfLogin";
import { ReactNotifications } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css'
import { Footer } from "./componenets/Footer";


function App() {

  const [welcomeUser, setwelcomeUser] = useState({})
  const [note, setNote] = useState([])
  const [update, setUpdate] = useState(1);

   
   
  return (
    <>
   
   <div className="d-flex flex-column min-vh-100">
  <BrowserRouter>
  <ReactNotifications />
  
  <IfLogin/>
    <Routes>
    
    {/* <Route path="/loginsuccess" element={<IfLogin/>} />
    <Route path="/logoutsuccess" element={<IfLogin/>} /> */}
     <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp  />} />
       <Route path="/addnotes" element={<AddNote setupdate={setUpdate}  />} />
       
      <Route path="/notelist" element={<div className="container bootstrap snippets bootdeys">
<NoteList note={note} setnote={setNote} welcomeuser={welcomeUser}  setwelcomeuser={setwelcomeUser} update = {update} setupdate = {setUpdate}  /></div>} />
      
      <Route path="/" element={<Home welcomeuser={welcomeUser}  setwelcomeuser={setwelcomeUser} update = {update} setupdate = {setUpdate}/>} />
      <Route path="/listnotes/:id" element={<Edit setupdate = {setUpdate} notess={note}/>} />
    </Routes>
    
  </BrowserRouter>
  
  
  
  <Footer/>
  </div>
  

</>
  );
};

export default App;
