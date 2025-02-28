import { useState } from "react"
import TodoItem from "./TodoItem";
import './Todo.css'

function Todo() {

  const [todo,setTodo] =useState<{text: string; id: string}[]>([]);
  const [input,setInput] = useState<string>("");
  
  const addTodo = () =>{
    if(!input.trim()) return

    setTodo((prev) => [...prev, {text: input, id: crypto.randomUUID() }]);
    setInput("");    
  }

  const deleteTodo = (id:string) => {
    setTodo( prev => prev.filter( todo => todo.id !== id));
  }

    return (
        <div className="todo-container">
            <input 
                type="text"     
                value={input} 
                onChange={e=>setInput(e.target.value)} 
            />
            <button onClick={addTodo}>Add</button>

            <ul>
                {todo.map(({text,id})=>(
                    <TodoItem key={id} text={text} id={id} onDelete={deleteTodo} />
                ))}
            </ul>
        </div>
    )
}

export default Todo