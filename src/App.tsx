import { useState, useEffect } from 'react'
import './App.css'

export type Todo = {
  id: string
  title: string
  userId: number
  completed: boolean
}

type GroupedTodo = {
  [key: number]: Todo[]
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
const groupByUsers = (objectArray: Todo[]) => {
  return objectArray.reduce((acc: GroupedTodo, todo) => {
    const key = todo.userId
    const curGroup = acc[key] ?? []
    
    return { ...acc, [key]: [...curGroup, todo] }
  }, {})
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

  const grouped = groupByUsers(todos)
  
  return (
    <div>
      <h2>Todos:</h2>
      <ul className='todos'>
        {
          Object.values(grouped).map(todos => {
            return todos.map(todo => (
              <li className='todo'>
                <h3 className='title'>{todo.title}</h3>
                <div className='details'>
                  <p>Task by: <span className='primary-gradient'>{handleConvertIdToName(todo.userId)}</span></p>
                 {todo.completed ? <span className="pill completed">Completed</span> : <span className="pill incomplete">Incomplete</span>}
                </div>
              </li>
            ))
          })
        }
      </ul>
    </div>
  )
}

export default App
