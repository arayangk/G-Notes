

const Home = ({welcomeuser}) =>{




    
 return (<>
   
    {sessionStorage.getItem("jwt")==null?<h1>Hello, Please Login or Signup</h1>:<h1>Hello, Welcome Back {welcomeuser.name}</h1>}
    
    </>
 )
}

export default Home;