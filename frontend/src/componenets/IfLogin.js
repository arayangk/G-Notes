import { useEffect, useState } from "react"
import Header from "./Header"
import LoggedInHeader from "./LoggedInHeader"



const IfLogin = () => {
    const token = "jwt"
    const [header, setHeader] = useState(null)
    

    useEffect(() => {
  
        if (sessionStorage.getItem(token)==null)
        
        setHeader(<Header/>)
        else
        setHeader(<LoggedInHeader/>)
        
    }, [sessionStorage.getItem(token)])
   
    return (
        <>
        {header}
        </>

    )

}

export default IfLogin;