import { useParams } from "react-router-dom"
import { useTodoContext } from "../context/TodoContext"


function SubTodo() {
  const {content,handleaddSubTodo,handleContent,handlesubTodoDelete,subTodos} = useTodoContext()
  const {todoId} = useParams()
  return (
    <>
    <input value={content} onChange={(e)=>handleContent(e.target.value)} type="text" placeholder='Enter Your Content' />
    <button onClick={()=>handleaddSubTodo(todoId)} className='btn btn-primary mx-2'>Add SubTodo</button>
    {
       subTodos.map(ele=>(
            <button key={ele._id} className=' text-center btn btn-success mx-3'>
            {ele.content}
            <i onClick={(e)=>handlesubTodoDelete(e,ele._id)} className="fs-5 fa-solid fa-delete-left mx-2"></i>
            <i className="fs-5 fa-solid fa-pen mx-2"></i>
            </button>
        )) 
    }    
    </>
  )
}

export default SubTodo
