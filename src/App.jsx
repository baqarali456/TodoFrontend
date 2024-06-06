
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import { TodoProvider } from './context/TodoContext'
import { useEffect, useState } from 'react'
import axios from 'axios'

function App() {

  const [todos, setTodos] = useState([]);
  const [User, setUser] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [name,setName] = useState('')
  const [subTodos,setSubTodos] = useState([])
  const [content,setContent] = useState('')

  const handleUsername = (username) => {
    setUsername(username)
  }

  const handleEmail = (email) => {
    setEmail(email)
  }

  const handlePassword = (password) => {
    setPassword(password)
  }

  // get Todos
  useEffect(()=>{
   axios.get(`http://localhost:8000/api/v1/todos/getAll-userTodos`,{
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
   })
   .then(response=>{
    setTodos(response.data.data)
  }
  )
   
  },[])

  //get Current User
  useEffect(()=>{
   if(JSON.parse(localStorage.getItem("accessToken"))){
    axios.get('http://localhost:8000/api/v1/users/get-user',{
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
   })
   .then(response=>{
    const {username} = response.data.data
    setUser(username)
   }
   )
   }
  },[])


const handleSignUp = () => {
  axios.post('http://localhost:8000/api/v1/users/register-user', {
    username,
    password,
    email,
  })
    .then(response => console.log(response))
    .catch(error => {

      let firstIndex = error.response.data.indexOf(':')
      let lastIndex = error.response.data.indexOf("&")
      let extractErrormessage = error.response.data.slice(firstIndex, lastIndex)
      let slicemessage = extractErrormessage.indexOf('<')
      let finalErrorMessage = extractErrormessage.slice(2, slicemessage)
      setErrorMessage(finalErrorMessage)
      setEmail('')
      setUsername('')
      setPassword('')
    })
}

const handleLogin = () => {
  axios.post('http://localhost:8000/api/v1/users/login-user', {
    username,
    email,
    password,
  })
    .then(response => {
      const { username } = response.data.data.user
      setUser(username)
      localStorage.setItem("accessToken",JSON.stringify(response.data.data.accessToken))
      localStorage.setItem("refreshToken",JSON.stringify(response.data.data.refreshToken))
      setEmail('')
      setUsername('')
      setPassword('')
    })
    .catch(error => console.log(error)
    )
}

const handleLogOut = () => {
  axios.post('http://localhost:8000/api/v1/users/logout-user','',{
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  }).then(response=>{
    setUser('')
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
  })
}

// functions declare on Todo

const handleName = (e) =>{
  setName(e)
}

const handleAddTodo = () =>{
axios.post('http://localhost:8000/api/v1/todos/add-todo',
  {
    name,
  },
  {
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  }
).then(response=>{
  setTodos(prev=>[...prev,response.data.data])
  setName('');
  
})
}

const handleTodoDelete = (e,todoId) =>{
  e.preventDefault()
  e.stopPropagation()
  console.log(e)
  

 axios.delete(`http://localhost:8000/api/v1/todos/delete-todo/${todoId}`,
  {
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  }
 )
 .then(response=>{
  setTodos(prev=>prev.filter(todo=>todo._id !== todoId))
 })
}

const handleGetAllSubTodoinMajorTodo = (todoId) =>{
 axios.get(`http://localhost:8000/api/v1/todos/getAll-subTodosinMajorTodo/${todoId}`,
  {
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  }
 )
 .then(response=>{
  console.log(response,"get all subTodos")
   const {subTodo} = response.data.data[0]
   setSubTodos(subTodo);
   console.log(subTodos,"subtodos")
   
 })
}


const handleaddSubTodo = async(todoId) =>{
  try {
  let addSubTodo =  await axios.post('http://localhost:8000/api/v1/sub-todos/add-subTodo',
    {
      content,
    },
    {
      headers:{
        "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
      }
    }
  )
  const subTodoId = addSubTodo.data.data._id
  console.log(subTodoId)
  
  
  await axios.post(`http://localhost:8000/api/v1/todos/addSubTodo-in-todo/${todoId}/${subTodoId}`,'',{
    headers:{
      "Authorization":`Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  })

  let getallSubTodosinMajorTodo = await axios.get(`http://localhost:8000/api/v1/todos/getAll-subTodosinMajorTodo/${todoId}`,
  {
    headers:{
      "Authorization": `Bearer ${JSON.parse(localStorage.getItem("accessToken"))}`
    }
  }
 )
 const {subTodo} = getallSubTodosinMajorTodo.data.data[0]
 setSubTodos(subTodo)
 setContent('');
 
 
  
   
  
  } catch (error) {
    console.log(error)
    
  }
  
}

const handleContent = (e) => {
  setContent(e)
}






return (
  <TodoProvider value={{ todos, User, handleSignUp, username, email, password, handleEmail, handlePassword, handleUsername, errorMessage, handleLogin ,handleLogOut,handleAddTodo,handleName,name,handleTodoDelete,handleGetAllSubTodoinMajorTodo,subTodos,handleaddSubTodo,handleContent,content}}>
    <Navbar />
    <Outlet />
  </TodoProvider>
)
}

export default App
