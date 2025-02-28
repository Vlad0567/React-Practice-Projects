
type TodoProps = {
    text: string;
    id: string;
    onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoProps> = ({text,id,onDelete}) => {
  return (
    <li key={id}>
        <p>{text}</p>
        <button className="delete-btn" onClick={()=>onDelete(id)}>Delete</button>
    </li>
  )
}

export default TodoItem