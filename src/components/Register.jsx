

import { Link } from "react-router-dom"
import { useTodoContext } from "../context/TodoContext"
function Register() {
      const {username,email,password,handleUsername,handleEmail,handlePassword,handleSignUp,errorMessage} = useTodoContext();
  return (
    <div className="container w-25 d-flex flex-column  mt-5">
        <input onChange={(e)=>handleUsername(e.target.value)} value={username} className=" my-2" type="text" placeholder="Enter your username"/>
        {errorMessage && <p className=" text-danger">{!username.length && errorMessage}</p>}
        <input onChange={(e)=>handleEmail(e.target.value)} value={email} className=" my-2" type="text" placeholder="Enter your email"/>
        {errorMessage && <p className=" text-danger">{!email.length && errorMessage}</p>}
        <input onChange={(e)=>handlePassword(e.target.value)} value={password} className=" my-2" type="password" name="" id="" placeholder="Enter your Password" />
        {errorMessage && <p className=" text-danger">{!password.length && errorMessage}</p>}
        <button onClick={()=>handleSignUp()} 
            className=" my-2 btn btn-danger text-s">SignUp</button>
        <Link to="/login" className=" my-2 btn btn-primary">SignIn</Link>
    </div>
  )
}

export default Register
