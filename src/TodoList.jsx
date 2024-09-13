import React, { useEffect, useState } from 'react';

const TodoList = () => {
  const [isAdded, setIsAdded] = useState('');
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    deleteTodo();
  }, [],[todos]);

  const addTodos = () => {
    const newTodos = [...todos, { text: isAdded, completed: false }];
    setTodos(newTodos);
    localStorage.setItem('todos', JSON.stringify(newTodos));
    setIsAdded('');
  };

  const toggleComplete = (index) =>{
    const newTodo = todos.map((item,indx)=>(
        index ==indx ? {...item , completed: !item.completed}:item
    ))
    setTodos(newTodo);
    localStorage.setItem('todos', JSON.stringify(newTodo));
  }
  const deleteTodo = (index) =>{
    let deleteTodo =  todos.filter((prev)=> prev != todos[index])
    setTodos(deleteTodo);
    localStorage.setItem('todos', JSON.stringify(deleteTodo));

  }


  return (
    <div className='flex w-screen h-screen bg-gradient-to-r from-blue-500 to-indigo-600 items-center justify-center'>
      <div className='flex flex-col bg-white shadow-lg p-8 w-full max-w-md rounded-md'>
        <h1 className='text-4xl mb-12 text-center text-indigo-900 font-mono font-bold'>Todo List</h1>
        <div className='flex justify-between items-center mb-6'>
          <input
            className='w-full bg-gray-200 text-gray-800 rounded-l-lg p-3 outline-none focus:ring-2 focus:ring-indigo-400'
            type='text'
            placeholder='Add a new task...'
            onChange={(e) => setIsAdded(e.target.value)}
            value={isAdded}
          />
          <button
            className='bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 w-32 rounded-r-lg transition duration-300'
            onClick={addTodos}
          >
            + Add
          </button>
        </div>
        <div className='overflow-y-auto max-h-60'>
          {todos.map((todo, index) => (
            <div key={index} className='flex items-center justify-between bg-gray-100 p-4 mb-2 rounded-lg shadow-sm'>
              <div className='flex items-center'>
                <input
                  type='checkbox'
                  checked={todo.completed}
                  onChange={() => toggleComplete(index)}
                  className='mr-4 h-5 w-5 text-indigo-600 border-gray-300 rounded'
                />
                <span className={'text-lg font-medium ' + (todo.completed ? 'line-through text-gray-500' : 'text-gray-800')}>
                  {todo.text}
                </span>
              </div>
              <i
                onClick={() => deleteTodo(index)}
                className='text-red-500 cursor-pointer hover:text-red-700 transition duration-300'
              >
                &#x2715;
              </i>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
