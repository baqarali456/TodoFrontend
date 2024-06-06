import { createContext, useContext } from "react";

const TodoContext = createContext({
  User:"",
  username:"",
  email:"",
  password:"",
  handleUsername:()=>{},
  handleEmail:()=>{},
  handlePassword:()=>{},
  handleSignUp:()=>{},
  todos:[],
  errorMessage:"",
  handleLogin:()=>{},
  handleLogOut:()=>{},
  name:"",
  handleAddTodo:()=>{},
  handleName:()=>{},
  handleTodoDelete:()=>{},
  handleGetAllSubTodoinMajorTodo:()=>{},
  content:"",
  handleContent:()=>{},
  handleaddSubTodo:()=>{},
  subTodos:[],
  handlesubTodoDelete:()=>{},
})

export const TodoProvider = TodoContext.Provider;

export const useTodoContext = () => {
 return useContext(TodoContext)
}