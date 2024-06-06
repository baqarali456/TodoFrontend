import { Link} from "react-router-dom"
import { useTodoContext } from "../context/TodoContext"


function Home() {
  const {User,todos,name,handleAddTodo,handleName,handleTodoDelete,handleGetAllSubTodoinMajorTodo}= useTodoContext()
  return (
    <>
    <input value={name} onChange={(e)=>handleName(e.target.value)} type="text" placeholder='Enter Your Content' />
    <button onClick={handleAddTodo} className='btn btn-primary mx-2'>Add Todo</button>
    {
       User ? todos.map(ele=>(
            <Link to={`/subtodo/${ele._id}`} className=' text-center btn btn-success mx-3' onClick={()=>handleGetAllSubTodoinMajorTodo(ele._id)} key={ele._id}>
            {ele.name}
            <i onClick={(e)=>handleTodoDelete(e,ele._id)} className="fs-5 fa-solid fa-delete-left mx-2"></i>
            <i className="fs-5 fa-solid fa-pen mx-2"></i>
            </Link>
        )) : "Please Login "
    }    
    </>
  )
}

export default Home
