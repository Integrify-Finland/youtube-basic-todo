import { useState, useEffect } from 'react'
import './App.css'

export type Todo = {
  id: string
  title: string
  userId: number
  completed: boolean
}

const handleConvertIdToName = (id: number) => {
  switch (id) {
    case 1:
      return 'Dashawn'
    case 2:
      return 'Holden'
    case 3:
      return 'Lillian'
    case 4:
      return 'Ari'
    case 5:
      return 'James'
    case 6:
      return 'Miley'
    case 7:
      return 'Jimena'

    default:
      return 'Unknown'
  }
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos')
      const data = await response.json()
      setTodos(data)
    }
    fetchTodos()
  }, [])

  return (
    <div>
      <h1 className="todos-title primary-gradient">Todos</h1>
      <ul className="todos">
        {todos.map((todo) => (
          <li className="todo" key={todo.id}>
            <h3 className="title">{todo.title}</h3>
            <div className="details">
              <p>
                Task by:{' '}
                <span className="primary-gradient">
                  {handleConvertIdToName(todo.userId)}
                </span>
              </p>
              {todo.completed ? (
                <span className="pill completed">Completed</span>
              ) : (
                <span className="pill incomplete">Incomplete</span>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
