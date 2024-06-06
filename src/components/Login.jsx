import { Link } from "react-router-dom"
import { useTodoContext } from "../context/TodoContext"


function Login() {
   const {
    username,
    email,
    password,
    handleEmail,
    handleLogin,
    handleUsername,
    handlePassword
  } = useTodoContext()
  return (
    <div className="container w-25 d-flex flex-column mt-5">
        <input value={username || email} onChange={(e)=>handleEmail(e.target.value) || handleUsername(e.target.value)} className=" my-2" type="text" placeholder="Enter your username or email"/>
        <input value={password} onChange={(e)=>handlePassword(e.target.value)} className=" my-2" type="password" name="" id="" placeholder="Enter your Password" />
        <button onClick={handleLogin} className=" my-2 btn btn-primary">SignIn</button>
        <Link to="/register" className=" my-2 btn btn-danger">SignUp</Link>
    </div>
  )
}

export default Login
